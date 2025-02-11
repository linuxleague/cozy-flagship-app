import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationContainer } from '@react-navigation/native'
import { decode, encode } from 'base-64'
import React, { useEffect, useState } from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import RNAsyncStorageFlipper from 'rn-async-storage-flipper'
import FlipperAsyncStorage from 'rn-flipper-async-storage-advanced'

import { CozyProvider, useClient } from 'cozy-client'
import { NativeIntentProvider } from 'cozy-intent'

import { RootNavigator } from '/AppRouter'
import * as RootNavigation from '/libs/RootNavigation'
import NetStatusBoundary from '/libs/services/NetStatusBoundary'
import { IconChangedModal } from '/libs/icon/IconChangedModal'
import { CryptoWebView } from '/components/webviews/CryptoWebView/CryptoWebView'
import { HomeStateProvider } from '/screens/home/HomeStateProvider'
import { HttpServerProvider } from '/libs/httpserver/httpServerProvider'
import { SplashScreenProvider } from '/components/providers/SplashScreenProvider'
import { cleanKonnectorsOnBootInBackground } from '/libs/konnectors/cleanKonnectorsOnBoot'
import { getClient } from '/libs/client'
import { getColors } from '/ui/colors'
import { localMethods } from '/libs/intents/localMethods'
import { persistor, store } from '/redux/store'
import { useAppBootstrap } from '/hooks/useAppBootstrap.js'
import { useGlobalAppState } from '/hooks/useGlobalAppState'
import { useCookieResyncOnResume } from '/hooks/useCookieResyncOnResume'
import { useCozyEnvironmentOverride } from '/hooks/useCozyEnvironmentOverride'
import { useNotifications } from '/hooks/useNotifications'
import { useSynchronizeOnInit } from '/hooks/useSynchronizeOnInit'
import { useInitBackup } from '/app/domain/backup/hooks'
import { useNetService } from '/libs/services/NetService'
import { withSentry } from '/libs/monitoring/Sentry'
import { ThemeProvider } from '/app/theme/ThemeProvider'
import { useInitI18n } from '/locales/useInitI18n'
import { SecureBackgroundSplashScreenWrapper } from '/app/theme/SecureBackgroundSplashScreenWrapper'
import { PermissionsChecker } from '/app/domain/nativePermissions/components/PermissionsChecker'

// Polyfill needed for cozy-client connection
if (!global.btoa) {
  global.btoa = encode
}

if (!global.atob) {
  global.atob = decode
}

const App = ({ setClient }) => {
  const client = useClient()

  useSynchronizeOnInit()
  useNetService(client)
  useInitI18n(client)
  useInitBackup(client)

  const { initialRoute, isLoading } = useAppBootstrap(client)

  useGlobalAppState()
  useCookieResyncOnResume()
  useNotifications()
  useCozyEnvironmentOverride()

  if (isLoading) {
    return null
  }

  return <RootNavigator initialRoute={initialRoute} setClient={setClient} />
}

const Nav = ({ client, setClient }) => {
  const colors = getColors()

  return (
    <NavigationContainer ref={RootNavigation.navigationRef}>
      <NativeIntentProvider localMethods={localMethods(client)}>
        <View
          style={[
            styles.view,
            {
              backgroundColor: colors.primaryColor
            }
          ]}
        >
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
          />
          <IconChangedModal />
          <App setClient={setClient} />
        </View>
      </NativeIntentProvider>
    </NavigationContainer>
  )
}

const WrappedApp = () => {
  const [client, setClient] = useState(undefined)

  useEffect(() => {
    const handleClientInit = async () => {
      try {
        const existingClient = await getClient()
        if (existingClient) {
          cleanKonnectorsOnBootInBackground(existingClient)
        }
        setClient(existingClient || null)
      } catch {
        setClient(null)
      }
    }

    handleClientInit()
  }, [])

  useEffect(
    function clearClientOnLogout() {
      const resetRoute = () => setClient(null)

      client?.on('logout', resetRoute)

      return () => client?.removeListener('logout', resetRoute)
    },
    [client]
  )

  if (client === null) return <Nav client={client} setClient={setClient} />

  if (client)
    return (
      <CozyProvider client={client}>
        <Nav client={client} setClient={setClient} />
      </CozyProvider>
    )

  return null
}

const Wrapper = () => {
  const [hasCrypto, setHasCrypto] = useState(false)
  useEffect(() => {
    if (__DEV__) {
      RNAsyncStorageFlipper(AsyncStorage)
    }
  }, [])

  return (
    <>
      {__DEV__ && <FlipperAsyncStorage />}
      <CryptoWebView setHasCrypto={setHasCrypto} />
      {hasCrypto && (
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <HttpServerProvider>
              <HomeStateProvider>
                <SplashScreenProvider>
                  <SecureBackgroundSplashScreenWrapper>
                    <NetStatusBoundary>
                      <ThemeProvider>
                        <PermissionsChecker>
                          <WrappedApp />
                        </PermissionsChecker>
                      </ThemeProvider>
                    </NetStatusBoundary>
                  </SecureBackgroundSplashScreenWrapper>
                </SplashScreenProvider>
              </HomeStateProvider>
            </HttpServerProvider>
          </PersistGate>
        </Provider>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  view: {
    flex: 1
  }
})

export default withSentry(Wrapper)
