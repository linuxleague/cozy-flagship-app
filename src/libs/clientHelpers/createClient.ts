import CozyClient from 'cozy-client'
import flag from 'cozy-flags'

import { androidSafetyNetApiKey } from '/constants/api-keys'
import strings from '/constants/strings.json'
import {
  listenTokenRefresh,
  saveClient
} from '/libs/clientHelpers/persistClient'
import { SOFTWARE_ID } from '/libs/constants'
import { getClientName } from '/app/domain/authentication/services/SynchronizeService'

import packageJSON from '../../../package.json'

import { startListening } from '/app/domain/authentication/services/AuthService'

/**
 * Create a CozyClient for the given Cozy instance and register it
 *
 * @param {string} instance - the Cozy instance used to create the client
 * @returns {CozyClient} - The created and registered CozyClient
 */
export const createClient = async (instance: string): Promise<CozyClient> => {
  const options = {
    scope: ['*'],
    oauth: {
      redirectURI: strings.COZY_SCHEME,
      softwareID: SOFTWARE_ID,
      clientKind: 'mobile',
      clientName: await getClientName(),
      shouldRequireFlagshipPermissions: true,
      certificationConfig: { androidSafetyNetApiKey }
    },
    appMetadata: {
      slug: 'flagship',
      version: packageJSON.version
    }
  }

  const client = new CozyClient(options)
  await registerPlugins(client)

  const stackClient = client.getStackClient()
  stackClient.setUri(instance)
  await stackClient.register(instance)
  startListening(client)
  return client
}

export const finalizeClientCreation = async (
  client: CozyClient
): Promise<void> => {
  await client.login()
  await saveClient(client)
  listenTokenRefresh(client)
  await initializePlugins(client)
}

const registerPlugins = async (client: CozyClient): Promise<void> => {
  // @ts-expect-error Plugins are not typed yet
  await client.registerPlugin(flag.plugin, null)
}

const initializePlugins = async (client: CozyClient): Promise<void> => {
  // @ts-expect-error Plugins are not typed yet
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  await client.plugins.flags.initializing
}
