import React from 'react'
import { View } from 'react-native'

import ProgressBar from '/components/Bar'
import { getColors } from '/ui/colors'
import { palette } from '/ui/palette'

import { styles } from '/components/ProgressContainer.styles'

const colors = getColors()

const progressBarConfig = {
  width: null,
  indeterminate: false,
  unfilledColor: palette.Grey[200],
  color: colors.primaryColor,
  borderWidth: 0,
  height: 8,
  borderRadius: 0,
  indeterminateAnimationDuration: 1500
}

interface Props {
  children: JSX.Element
  progress: number
}

export const ProgressContainer: React.FC<Props> = ({
  children,
  progress
}: Props) => {
  return (
    <>
      {children}
      {progress > 0 && (
        <View style={styles.downloadProgressContainer}>
          <ProgressBar
            {...progressBarConfig}
            progress={progress}
            style={styles.downloadProgress}
          />
        </View>
      )}
    </>
  )
}
