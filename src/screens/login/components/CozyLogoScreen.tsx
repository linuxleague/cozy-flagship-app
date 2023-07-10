import Minilog from 'cozy-minilog'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { SvgXml } from 'react-native-svg'

import { getErrorMessage } from '/libs/functions/getErrorMessage'
import { isLightBackground } from '/screens/login/components/functions/clouderyBackgroundFetcher'
import { getColors } from '/ui/colors'

const log = Minilog('CozyLogoScreen')

const colors = getColors()

interface CozyLogoScreenProps {
  backgroundColor: string
}

export const CozyLogoScreen = ({
  backgroundColor
}: CozyLogoScreenProps): JSX.Element => {
  const [foregroundColor, setForegroundColor] = useState(
    colors.paperBackgroundColor
  )

  useEffect(() => {
    try {
      const shouldUsePrimaryColor = isLightBackground(backgroundColor)

      const color = shouldUsePrimaryColor
        ? colors.primaryColor
        : colors.paperBackgroundColor

      setForegroundColor(color)
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      log.error(
        `Something went wrong while trying to check if isLightBackground: ${errorMessage}`
      )
    }
  }, [backgroundColor])

  return (
    <View
      style={[
        styles.view,
        {
          backgroundColor: backgroundColor
        }
      ]}
    >
      <CozyLogo
        foregroundColor={foregroundColor}
        backgroundColor={backgroundColor}
      />
    </View>
  )
}

interface CozyLogoProps {
  backgroundColor: string
  foregroundColor: string
}

const CozyLogo = ({
  backgroundColor,
  foregroundColor
}: CozyLogoProps): JSX.Element => (
  <SvgXml
    xml={`
      <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill="${foregroundColor}"
          d="M0 38.4C0 24.9587 0 18.2381 2.61584 13.1042C4.9168 8.58834 8.58834 4.9168 13.1042 2.61584C18.2381 0 24.9587 0 38.4 0H57.6C71.0413 0 77.7619 0 82.8958 2.61584C87.4117 4.9168 91.0832 8.58834 93.3842 13.1042C96 18.2381 96 24.9587 96 38.4V57.6C96 71.0413 96 77.7619 93.3842 82.8958C91.0832 87.4117 87.4117 91.0832 82.8958 93.3842C77.7619 96 71.0413 96 57.6 96H38.4C24.9587 96 18.2381 96 13.1042 93.3842C8.58834 91.0832 4.9168 87.4117 2.61584 82.8958C0 77.7619 0 71.0413 0 57.6V38.4Z" />
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M58.5253 57.7242C58.0177 58.5147 56.8923 58.7523 56.1169 58.2339C56.0499 58.1929 55.9851 58.1475 55.9246 58.1022C53.6631 59.8755 50.8789 60.8432 47.9845 60.8432C45.0965 60.8432 42.3188 59.8799 40.0616 58.113C40.0033 58.154 39.9449 58.1972 39.8845 58.2339C39.0853 58.7545 37.9772 58.5061 37.4739 57.7307C36.9641 56.9444 37.1866 55.8795 37.9685 55.3547C38.6468 54.9075 38.6943 54.0155 38.6943 54.0068C38.7116 53.5403 38.9146 53.0953 39.2537 52.7821C39.5907 52.4689 40.0141 52.2875 40.4806 52.3242C41.4159 52.3458 42.1762 53.132 42.1589 54.0781C42.1589 54.0911 42.1568 54.5641 41.9861 55.2207C45.4745 58.1173 50.5311 58.1065 54.0065 55.197C53.8791 54.6937 53.8467 54.2919 53.8381 54.1062C53.8294 53.6202 54.0022 53.1795 54.3284 52.8447C54.6481 52.5164 55.0801 52.3307 55.5401 52.322H55.5704C56.5057 52.322 57.2811 53.0759 57.3027 54.0133C57.3027 54.0133 57.3524 54.9097 58.0241 55.3525C58.8104 55.8709 59.035 56.9315 58.5253 57.7242ZM65.902 37.4938C65.4031 33.2731 63.5347 29.3722 60.5344 26.3568C57.0935 22.8986 52.5467 21 47.7343 21C42.9218 21 38.3771 22.8986 34.9363 26.359C31.9231 29.3851 30.0503 33.3077 29.5622 37.5521C25.4301 38.0532 21.6091 39.9778 18.6585 43.0687C15.2932 46.6003 13.4399 51.2681 13.4399 56.2102C13.4399 66.5717 21.6479 75 31.7416 75H64.2561C74.3455 75 82.5599 66.5717 82.5599 56.2102C82.5599 46.4189 75.2246 38.3513 65.902 37.4938Z"
          fill="${backgroundColor}" />
      </svg>
    `}
  />
)

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
