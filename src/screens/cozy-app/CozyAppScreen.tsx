import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { StatusBar, View } from 'react-native'

import { CozyProxyWebView } from '/components/webviews/CozyProxyWebView'
import { flagshipUI, NormalisedFlagshipUI } from '/libs/intents/setFlagshipUI'
import { useDimensions } from '/libs/dimensions'
import { useHomeStateContext } from '/screens/home/HomeStateProvider'

import { Animation } from './CozyAppScreen.Animation'
import { firstHalfUI, handleError } from './CozyAppScreen.functions'
import { styles } from './CozyAppScreen.styles'
import { CozyAppScreenProps } from './CozyAppScreen.types'

export const CozyAppScreen = ({
  route,
  navigation
}: CozyAppScreenProps): JSX.Element => {
  const [UIState, setUIState] = useState<NormalisedFlagshipUI>({})
  const {
    bottomBackground,
    bottomOverlay,
    topBackground,
    topTheme,
    topOverlay
  } = UIState
  const [isReady, setReady] = useState(false)
  const [isFirstHalf, setFirstHalf] = useState(false)
  const [shouldExitAnimation, setShouldExitAnimation] = useState(false)
  const { setShouldWaitCozyApp } = useHomeStateContext()

  useEffect(() => {
    flagshipUI.on('change', (state: NormalisedFlagshipUI) => {
      setUIState({ ...UIState, ...state })
    })

    return () => {
      flagshipUI.removeAllListeners()
    }
  }, [UIState, route])

  useEffect(() => {
    if (isReady) return // We don't want to trigger the animation UI changes twice (in case of app unlock for instance)

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    !route.params.iconParams && setReady(true)

    isFirstHalf && void firstHalfUI()
  }, [isFirstHalf, isReady, route.params.iconParams])
  const dimensions = useDimensions()

  const onLoadEnd = useCallback(() => {
    setShouldExitAnimation(true)
    setShouldWaitCozyApp(false)
  }, [setShouldWaitCozyApp])

  const webViewStyle = useMemo(
    () => ({ ...styles[isFirstHalf ? 'ready' : 'notReady'] }),
    [isFirstHalf]
  )

  return (
    <>
      <StatusBar translucent barStyle={topTheme} />

      <View
        style={{
          height: isFirstHalf
            ? dimensions.statusBarHeight
            : styles.immersiveHeight.height,
          backgroundColor: topBackground
        }}
      >
        <View
          style={{
            backgroundColor: topOverlay,
            ...styles.innerOverlay
          }}
        />
      </View>

      <View style={styles.mainView}>
        {
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          route.params.iconParams && !isReady && (
            <Animation
              onFirstHalf={setFirstHalf}
              onFinished={setReady}
              shouldExit={shouldExitAnimation}
              params={route.params.iconParams}
              slug={route.params.slug}
            />
          )
        }

        <CozyProxyWebView
          style={webViewStyle}
          slug={route.params.slug}
          href={route.params.href}
          navigation={navigation}
          route={route}
          logId="AppScreen"
          onLoadEnd={onLoadEnd}
          onError={handleError}
        />
      </View>

      <View
        style={{
          height: isFirstHalf
            ? dimensions.navbarHeight
            : styles.immersiveHeight.height,
          backgroundColor: bottomBackground
        }}
      >
        <View
          style={{
            backgroundColor: bottomOverlay,
            ...styles.innerOverlay
          }}
        />
      </View>
    </>
  )
}
