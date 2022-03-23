import {Alert, Linking, Platform} from 'react-native'

/**
 * App's mobile information. Used to describe the app scheme and its store urls
 * @typedef {object} AppManifestMobileInfo
 * @property {string} schema - The app's URL scheme
 * @property {string} id_playstore - The app's id on Google PlayStore
 * @property {string} id_appstore - The app's id on Apple AppStore
 */

/**
 * App's description resulting of its manifest.webapp file
 * @typedef {object} AppManifest
 * @property {string} slug - The app's slug
 * @property {AppManifestMobileInfo} mobile - The app's mobile information
 */

/**
 * Apps mobile information that can be used as a fallback if the Cozy
 * still has an old version of the app which doesn't describe its mobile
 * info on the manifest.webapp
 *
 * This object is used for retro-compatibility support and may be deleted
 * in the future
 *
 * If a new schema is inserted into this array or if a new app describe its
 * schema in its manifest.webapp, then AndroidManifest.xml and Info.plist
 * should be updated with the scheme permission
 *
 * @type {Array.<AppManifestMobileInfo>}
 */
const slugFallbacks = {
  passwords: {
    schema: 'cozypass://',
    id_playstore: 'io.cozy.pass',
    id_appstore: 'cozy-pass/id1502262449',
  },
}

/**
 * Open the native mobile app using app scheme passed in arguments
 * If app is not installed, redirect the user to the mobile store
 * @param {AppManifestMobileInfo} appNativeData - The app's mobile information
 * @returns {Promise}
 */
const openAppNative = async appNativeData => {
  const schema = appNativeData.schema

  const canOpenApp = await Linking.canOpenURL(schema)

  if (canOpenApp) {
    return Linking.openURL(schema)
  } else {
    return new Promise(resolve => {
      const idPlayStore = appNativeData.id_playstore
      const idAppStore = appNativeData.id_appstore

      const storeUrl =
        Platform.OS === 'ios'
          ? `itms-apps://apps.apple.com/id/app/${idAppStore}?l=id`
          : `https://play.google.com/store/apps/details?id=${idPlayStore}`

      const storeName = Platform.OS === 'ios' ? 'AppStore' : 'PlayStore'

      Alert.alert(
        'Open Store', // TODO: Translate
        `You will be redirected to the ${storeName}. Do you want to continue?`, // TODO: Translate
        [
          {
            text: 'Cancel', // TODO: Translate
            onPress: resolve,
            style: 'cancel',
          },
          {
            text: `Open the ${storeName}`, // TODO: Translate
            onPress: () => Linking.openURL(storeUrl).then(resolve),
          },
        ],
        {
          cancelable: true,
          onDismiss: resolve,
        },
      )
    })
  }
}

/**
 * Open the connector pane in the Home view
 * @param {any} navigation - The React navigation context
 * @param {AppManifest} connector - The connector information
 */
const openConnectorInHome = (navigation, connector) => {
  const {slug} = connector

  navigation.navigate({
    name: 'home',
    params: {
      konnector: slug,
    },
  })
}

/**
 * Open the native mobile app if the app has a mobile version
 * Otherwise open the app on a webview using href
 * @param {any} navigation - The React navigation context
 * @param {string} href - The app web url
 * @param {AppManifest} app - The app information
 * @returns {Promise}
 */
export const openApp = (navigation, href, app, iconParams) => {
  if (app?.type === 'konnector') {
    openConnectorInHome(navigation, app)
    return
  }

  if (app?.mobile) {
    return openAppNative(app.mobile)
  }

  if (app?.slug) {
    const slugFallback = slugFallbacks[app.slug]

    if (slugFallback) {
      return openAppNative(slugFallback)
    }
  }

  return navigation.navigate('cozyapp', {
    href,
    iconParams: JSON.parse(iconParams),
  })
}
