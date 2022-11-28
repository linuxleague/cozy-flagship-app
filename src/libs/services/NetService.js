import NetInfo from '@react-native-community/netinfo'

import Minilog from '@cozy/minilog'

import strings from '/strings.json'
import { devConfig } from '/config/dev'
import { reset } from '/libs/RootNavigation'
import { routes } from '/constants/routes'
import { showSplashScreen } from '/libs/services/SplashScreenService'

const log = Minilog('NetService')

export const _netInfoChangeHandler = (state, callbackRoute = routes.stack) => {
  try {
    state.isConnected && reset(callbackRoute)
  } catch (error) {
    log.error(error)
  }
}

const makeNetWatcher = () => {
  let unsubscribe

  return ({ shouldUnsub, callbackRoute } = {}) => {
    if (!unsubscribe) {
      log.debug('Adding NetInfo listener')
      unsubscribe = NetInfo.addEventListener(state => {
        callbackRoute === routes.stack && showSplashScreen()
        _netInfoChangeHandler(state, callbackRoute)
      })
    }

    if (shouldUnsub) {
      log.debug('Removing NetInfo listener')
      unsubscribe()
      unsubscribe = undefined
    }
  }
}

const isConnected = async () => (await NetInfo.fetch()).isConnected

const isOffline = async () => !(await NetInfo.fetch()).isConnected

const handleOffline = () =>
  reset(routes.error, { type: strings.errorScreens.offline })

const toggleNetWatcher = makeNetWatcher()

const NetService = {
  handleOffline,
  isConnected: devConfig.forceOffline ? Promise.resolve(false) : isConnected,
  isOffline: devConfig.forceOffline ? Promise.resolve(true) : isOffline,
  toggleNetWatcher: devConfig.forceOffline ? () => {} : toggleNetWatcher
}

export { NetService }
