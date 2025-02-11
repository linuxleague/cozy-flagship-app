import type CozyClient from 'cozy-client'
import Minilog from 'cozy-minilog'

import {
  getLocalBackupConfig,
  initiazeLocalBackupConfig,
  setBackupAsInitializing,
  setBackupAsReady,
  setBackupAsRunning,
  setBackupAsDone,
  setLastBackup,
  saveAlbums,
  updateRemoteBackupConfigLocally
} from '/app/domain/backup/services/manageLocalBackupConfig'
import {
  areAlbumsEnabled,
  getAlbums,
  createRemoteAlbums,
  fetchBackupedAlbums
} from '/app/domain/backup/services/manageAlbums'
import { getMediasToBackup } from '/app/domain/backup/services/getMedias'
import {
  uploadMedias,
  setShouldStopBackup
} from '/app/domain/backup/services/uploadMedias'
import {
  cancelUpload,
  getCurrentUploadId
} from '/app/domain/upload/services/upload'
import {
  fetchDeviceRemoteBackupConfig,
  fetchBackupedMedias,
  createRemoteBackupFolder
} from '/app/domain/backup/services/manageRemoteBackupConfig'
import {
  activateKeepAwake,
  deactivateKeepAwake
} from '/app/domain/sleep/services/sleep'
import {
  BackupInfo,
  ProgressCallback,
  BackupedMedia,
  BackupedAlbum,
  LocalBackupConfig,
  LastBackup
} from '/app/domain/backup/models'
import { showLocalNotification } from '/libs/notifications/notifications'
import { BackupError } from '/app/domain/backup/helpers'
import { t } from '/locales/i18n'

const log = Minilog('💿 Backup')

export {
  checkBackupPermissions,
  requestBackupPermissions
} from '/app/domain/backup/services/managePermissions'

export const prepareBackup = async (
  client: CozyClient,
  onProgress: ProgressCallback
): Promise<BackupInfo> => {
  log.debug('Backup preparation started')

  const backupConfig = await initializeBackup(client)

  if (backupConfig.currentBackup.status === 'running') {
    return await getBackupInfo(client)
  }

  await setBackupAsInitializing(client)

  void onProgress(await getBackupInfo(client))

  if (areAlbumsEnabled()) {
    const albums = await getAlbums()

    const createdAlbums = await createRemoteAlbums(client, albums)

    await saveAlbums(client, createdAlbums)
  }

  const mediasToBackup = await getMediasToBackup(client, onProgress)

  await setBackupAsReady(client, mediasToBackup)

  void onProgress(await getBackupInfo(client))

  log.debug('Backup preparation done')

  return await getBackupInfo(client)
}

export const startBackup = async (
  client: CozyClient,
  onProgress: ProgressCallback
): Promise<BackupInfo> => {
  log.debug('Backup started')

  await updateRemoteBackupConfigLocally(client)

  const localBackupConfig = await getLocalBackupConfig(client)

  await setBackupAsRunning(client)

  void onProgress(await getBackupInfo(client))

  activateKeepAwake('backup')

  try {
    const partialSuccessMessage = await uploadMedias(
      client,
      localBackupConfig,
      onProgress
    )

    const postUploadLocalBackupConfig = await getLocalBackupConfig(client)

    let status: LastBackup['status'] = 'success'
    let titleKey = 'services.backup.notifications.backupSuccessTitle'
    let bodyKey = 'services.backup.notifications.backupSuccessBody'

    if (partialSuccessMessage) {
      status = 'partial_success'
      titleKey = 'services.backup.notifications.backupPartialSuccessTitle'
      bodyKey = 'services.backup.notifications.backupPartialSuccessBody'
    }

    await setLastBackup(client, {
      status,
      backedUpMediaCount:
        postUploadLocalBackupConfig.currentBackup.totalMediasToBackupCount -
        postUploadLocalBackupConfig.currentBackup.mediasToBackup.length,
      totalMediasToBackupCount:
        postUploadLocalBackupConfig.currentBackup.totalMediasToBackupCount
    })

    await showLocalNotification({
      title: t(titleKey),
      body: t(bodyKey, {
        backedUpMediaCount:
          postUploadLocalBackupConfig.currentBackup.totalMediasToBackupCount -
          postUploadLocalBackupConfig.currentBackup.mediasToBackup.length,
        totalMediasToBackupCount:
          postUploadLocalBackupConfig.currentBackup.totalMediasToBackupCount
      }),
      data: {
        redirectLink: 'photos/#/backup'
      }
    })
  } catch (e) {
    const postUploadLocalBackupConfig = await getLocalBackupConfig(client)
    if (e instanceof BackupError) {
      await setLastBackup(client, {
        status: 'error',
        code: e.statusCode,
        backedUpMediaCount:
          postUploadLocalBackupConfig.currentBackup.totalMediasToBackupCount -
          postUploadLocalBackupConfig.currentBackup.mediasToBackup.length,
        totalMediasToBackupCount:
          postUploadLocalBackupConfig.currentBackup.totalMediasToBackupCount,
        message: e.textMessage
      })
    } else {
      await setLastBackup(client, {
        status: 'error',
        backedUpMediaCount:
          postUploadLocalBackupConfig.currentBackup.totalMediasToBackupCount -
          postUploadLocalBackupConfig.currentBackup.mediasToBackup.length,
        totalMediasToBackupCount:
          postUploadLocalBackupConfig.currentBackup.totalMediasToBackupCount,
        message: t('services.backup.errors.unknownIssue')
      })
    }

    await showLocalNotification({
      title: t('services.backup.notifications.backupErrorTitle'),
      body: t('services.backup.notifications.backupErrorBody'),
      data: {
        redirectLink: 'photos/#/backup'
      }
    })
  }

  deactivateKeepAwake('backup')

  const localBackupConfigAfterUpload = await getLocalBackupConfig(client)

  if (localBackupConfigAfterUpload.currentBackup.status === 'running') {
    await setBackupAsDone(client)

    log.debug('Backup done')
  } else {
    log.debug('Backup stopped')
  }

  void onProgress(await getBackupInfo(client))

  return await getBackupInfo(client)
}

export const stopBackup = async (client: CozyClient): Promise<BackupInfo> => {
  setShouldStopBackup(true)

  const uploadId = getCurrentUploadId()

  if (uploadId) {
    await cancelUpload(uploadId)
  }

  return await getBackupInfo(client)
}

export const getBackupInfo = async (
  client: CozyClient
): Promise<BackupInfo> => {
  const backupConfig = await getLocalBackupConfig(client)

  return {
    remoteBackupConfig: backupConfig.remoteBackupConfig,
    lastBackupDate: backupConfig.lastBackupDate,
    backupedMediasCount: backupConfig.backupedMedias.length,
    currentBackup: {
      status: backupConfig.currentBackup.status,
      mediasToBackupCount: backupConfig.currentBackup.mediasToBackup.length,
      totalMediasToBackupCount:
        backupConfig.currentBackup.totalMediasToBackupCount
    },
    lastBackup: backupConfig.lastBackup
  }
}

const initializeBackup = async (
  client: CozyClient
): Promise<LocalBackupConfig> => {
  try {
    const backupConfig = await getLocalBackupConfig(client)

    log.debug('Backup found')

    return backupConfig
  } catch {
    // if there is no local backup config
    let deviceRemoteBackupConfig = await fetchDeviceRemoteBackupConfig(client)
    let backupedMedias
    let backupedAlbums

    if (deviceRemoteBackupConfig) {
      log.debug('Backup will be restored')

      backupedMedias = await fetchBackupedMedias(
        client,
        deviceRemoteBackupConfig
      )
      backupedAlbums = await fetchBackupedAlbums(client)
    } else {
      log.debug('Backup will be created')

      deviceRemoteBackupConfig = await createRemoteBackupFolder(client)
      backupedMedias = [] as BackupedMedia[]
      backupedAlbums = [] as BackupedAlbum[]
    }

    const backupConfig = await initiazeLocalBackupConfig(
      client,
      deviceRemoteBackupConfig,
      backupedMedias,
      backupedAlbums
    )

    return backupConfig
  }
}
