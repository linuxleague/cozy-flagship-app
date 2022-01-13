import React, {useState, useEffect} from 'react'
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native'
import DocumentScanner from 'react-native-document-scanner'
//import DocumentScanner from '@woonivers/react-native-document-scanner'
import {CropView} from './CropView'
import {ImagePreview} from './ImagePreview'

export const Scanner = () => {
  const [scanned, setScanned] = useState({})
  const [isValidatingImageCropping, setIsValidatingImageCropping] =
    useState(false)
  const [scanParams, setScanParams] = useState({})
  const [imageSize, setImageSize] = useState(null)

  console.log('document scanner start')

  useEffect(() => {
    if (scanned.initialImage) {
      Image.getSize(scanned.initialImage, (width, height) => {
        setImageSize({width, height})
      })
    }
  }, [scanned])

  const handleImageScanner = (data) => {
    setScanned({
      croppedImage: data.croppedImage,
      initialImage: data.initialImage,
      rectangleCoordinates: data.rectangleCoordinates,
    })
  }

  const onRectangleDetect = ({stableCounter, lastDetectionType}) => {
    setScanParams({stableCounter, lastDetectionType})
  }

  const retry = () => {
    setScanned({})
  }

  if (scanned.croppedImage && imageSize) {
    if (!scanned.rectangleCoordinates) {
      // This is a safeguard, but should never happen
      setScanned({})
    }
    console.log('received coordinates : ', scanned.rectangleCoordinates)

    return (
      <CropView
        initialImage={scanned.initialImage}
        rectangleCoordinates={scanned.rectangleCoordinates}
        imageSize={imageSize}
        onRetry={retry}
      />
    )
  }

  return (
    <View style={{flex: 1}}>
      <DocumentScanner
        style={styles.scanner}
        saveInAppDocument={false}
        onPictureTaken={handleImageScanner}
        overlayColor="rgba(33, 172, 51, 0.8)"
        enableTorch={false}
        brightness={0.3}
        saturation={1}
        contrast={1.1}
        quality={0.5}
        onRectangleDetect={onRectangleDetect}
        detectionCountBeforeCapture={5}
        detectionRefreshRateInMS={50}
        onPermissionsDenied={() => console.log('Permissions Denied')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  scanner: {
    flex: 1,
    aspectRatio: undefined,
  },
  button: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 32,
  },
  buttonText: {
    backgroundColor: 'rgba(245, 252, 255, 0.7)',
    fontSize: 32,
  },
  preview: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
  },
  permissions: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
