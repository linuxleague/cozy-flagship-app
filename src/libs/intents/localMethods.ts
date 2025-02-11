import { Linking } from 'react-native'
import { BrowserResult } from 'react-native-inappbrowser-reborn'

import CozyClient from 'cozy-client'
import { FlagshipUI, NativeMethodsRegister } from 'cozy-intent'

import * as RootNavigation from '/libs/RootNavigation'
import {
  scanDocument,
  isScannerAvailable
} from '/app/domain/scanner/services/scanner'

import { setHomeThemeIntent } from './setHomeThemeIntent'

import strings from '/constants/strings.json'
import { EnvService } from '/core/tools/env'
import { clearClient } from '/libs/client'
import { clearCookies } from '/libs/httpserver/httpCookieManager'
import { clearData } from '/libs/localStore/storage'
import { deleteKeychain } from '/libs/keychain'
import { hideSplashScreen } from '/app/theme/SplashScreenService'
import { openApp } from '/libs/functions/openApp'
import { resetSessionToken } from '/libs/functions/session'
import { routes } from '/constants/routes'
import { sendKonnectorsLogs } from '/libs/konnectors/sendKonnectorsLogs'
import { setDefaultRedirection } from '/libs/defaultRedirection/defaultRedirection'
import { setFlagshipUI } from '/libs/intents/setFlagshipUI'
import { showInAppBrowser, closeInAppBrowser } from '/libs/intents/InAppBrowser'
import { isBiometryDenied } from '/app/domain/authentication/services/BiometryService'
import { toggleSetting } from '/app/domain/settings/services/SettingsService'
import { HomeThemeType } from '/app/theme/models'
import {
  prepareBackup,
  startBackup,
  stopBackup,
  checkBackupPermissions,
  requestBackupPermissions
} from '/app/domain/backup/services/manageBackup'
import { sendProgressToWebview } from '/app/domain/backup/services/manageProgress'
import { BackupInfo, ProgressCallback } from '/app/domain/backup/models'
import { changeLanguage } from '/locales/i18n'

export const asyncLogout = async (client?: CozyClient): Promise<null> => {
  if (!client) {
    throw new Error('Logout should not be called with undefined client')
  }

  await sendKonnectorsLogs(client)
  await client.logout()
  await clearClient()
  await resetSessionToken()
  await deleteKeychain()
  await clearCookies()
  await clearData()
  RootNavigation.reset(routes.welcome, { screen: 'welcome' })
  return Promise.resolve(null)
}

const backToHome = (): Promise<null> => {
  RootNavigation.navigate('home')
  return Promise.resolve(null)
}

/**
 * Get the fetchSessionCode function to be called with current CozyClient instance
 * fetchSessionCode gets a session code from the current cozy-client instance
 */
const fetchSessionCodeWithClient = (
  client?: CozyClient
): (() => Promise<string | null>) => {
  return async function fetchSessionCode() {
    if (!client) {
      return null
    }

    const sessionCodeResult = await client.getStackClient().fetchSessionCode()

    if (sessionCodeResult.session_code) {
      return sessionCodeResult.session_code
    }

    throw new Error(
      'session code result should contain a session_code ' +
        JSON.stringify(sessionCodeResult)
    )
  }
}

const openAppOSSettings = async (): Promise<null> => {
  await Linking.openSettings()
  return null
}

const setDefaultRedirectionWithClient = async (
  defaultRedirection: string,
  client?: CozyClient
): Promise<null> => {
  if (!client) {
    return null
  }

  await setDefaultRedirection(defaultRedirection, client)

  return null
}

export const internalMethods = {
  setFlagshipUI: (intent: FlagshipUI): Promise<null> => {
    const caller = (): string => {
      if (!EnvService.nameIs(strings.environments.test)) return 'unknown'

      try {
        return internalMethods.setFlagshipUI.caller.name
      } catch (error) {
        return 'unknown'
      }
    }

    return setFlagshipUI(intent, caller())
  }
}

export const setLang = async (lng: string): Promise<void> => {
  return await changeLanguage(lng)
}

const isNativePassInstalledOnDevice = async (): Promise<boolean> => {
  return await Linking.canOpenURL('cozypass://')
}

interface CustomMethods {
  fetchSessionCode: () => Promise<string | null>
  showInAppBrowser: (args: { url: string }) => Promise<BrowserResult>
  setTheme: (theme: HomeThemeType) => Promise<boolean>
  prepareBackup: (onProgress: ProgressCallback) => Promise<BackupInfo>
  startBackup: (onProgress: ProgressCallback) => Promise<BackupInfo>
  stopBackup: () => Promise<BackupInfo>
  checkBackupPermissions: typeof checkBackupPermissions
  requestBackupPermissions: typeof requestBackupPermissions
  setLang: typeof setLang
}

const prepareBackupWithClient = (
  client: CozyClient | undefined
): Promise<BackupInfo> => {
  if (!client) {
    throw new Error('You must be logged in to use backup feature')
  }

  const onProgress = (backupInfo: BackupInfo): Promise<void> =>
    sendProgressToWebview(client, backupInfo)

  return prepareBackup(client, onProgress)
}

const startBackupWithClient = (
  client: CozyClient | undefined
): Promise<BackupInfo> => {
  if (!client) {
    throw new Error('You must be logged in to use backup feature')
  }

  const onProgress = (backupInfo: BackupInfo): Promise<void> =>
    sendProgressToWebview(client, backupInfo)

  return startBackup(client, onProgress)
}

const stopBackupWithClient = (
  client: CozyClient | undefined
): Promise<BackupInfo> => {
  if (!client) {
    throw new Error('You must be logged in to use backup feature')
  }

  return stopBackup(client)
}

/**
 * For now cozy-intent doesn't accept methods resolving to void.
 * We can use this wrapper to still execute an async method an resolve to null no matter what.
 */
const nativeMethodWrapper =
  <T extends () => Promise<void>>(method: T) =>
  async (): Promise<null> => {
    await method()

    return null
  }

export const localMethods = (
  client: CozyClient | undefined
): NativeMethodsRegister | CustomMethods => {
  return {
    backToHome,
    closeInAppBrowser,
    fetchSessionCode: fetchSessionCodeWithClient(client),
    hideSplashScreen: nativeMethodWrapper(hideSplashScreen),
    logout: () => asyncLogout(client),
    openApp: (href, app, iconParams) =>
      openApp(client, RootNavigation, href, app, iconParams),
    toggleSetting,
    setDefaultRedirection: defaultRedirection =>
      setDefaultRedirectionWithClient(defaultRedirection, client),
    setFlagshipUI,
    showInAppBrowser,
    isBiometryDenied,
    openAppOSSettings,
    isNativePassInstalledOnDevice,
    scanDocument,
    isScannerAvailable: () => Promise.resolve(isScannerAvailable()),
    // For now setTheme is only used for the home theme
    setTheme: setHomeThemeIntent,
    prepareBackup: () => prepareBackupWithClient(client),
    startBackup: () => startBackupWithClient(client),
    stopBackup: () => stopBackupWithClient(client),
    checkBackupPermissions,
    requestBackupPermissions,
    setLang
  }
}
