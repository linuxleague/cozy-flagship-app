# Cozy Flagship App

The flagship app is meant to get all your Cozy in a single mobile app. 
This notably includes the possiblity to run client-side konnectors, to get your data without any server-side scraping.

## Setup / Requirements
- [RN Environnement setup](https://reactnative.dev/docs/environment-setup)
  - Please follow the React Native CLI part and make sure all the requirements are met with the correct versions.
- install XCode and Android Studio (or Android SDK)
- Node 16

## Sentry configuration (REQUIRED, DO NOT SKIP)

This application will not run without a Sentry configuration, even in development mode.

### Getting the configuration

If you are a Cozy developer, please get the actual Sentry configuration. For this, you need to decrypt the `cozy-react-native/sentry.properties` file in the `password-store-team` repository.

If you are not a Cozy developer and you do not care about Sentry, you can just take the following example: https://github.com/getsentry/examples/blob/master/react-native/sentry.properties

Either way, you should now have a file similar to `android/sentry.properties.example`.

### Installing the configuration

Put the Sentry configuration into the following files:

- `android/sentry.properties`
- `ios/sentry.properties`

## Run the Cozy Flagship App

### First time

Note: Before running the app, please copy `cozy-home` files locally first. See [How to install cozy-home in local assets](docs/how-to-install-home.md)

```bash
# Download Dependencies
$ yarn

#install konnectors (for now)
$ cd connectors/sncf
$ yarn install && yarn build
$ cd ../blablacar
$ yarn install && yarn build

# Run native server
$ yarn start # (must be started for the following commands)

# Run on Android Device
$ yarn android

# Run on iOS Device
$ cd ios && pod install # Only the first time
$ yarn ios

```

### Working with locally hosted webviews

#### On Android
* Create a cozy instance with the following format : `foobar.10-0-2-2.nip.io:8080`, so the webview browser has access to cozy-stack instances thanks to the redirection done by https://nip.io (10.0.2.2 is the local IP address of your emulator)
* Launch your cozy app with `DEV_HOST=(some accessible local IP)` preceding the actual start command, so the webview browser has access to webpack dev server assets. See some examples below:
    * `DEV_HOST="$(ip -4 address show eth0| grep -Po 'inet [^/]+' | cut -d' ' -f2)" yarn start`
    * `DEV_HOST="$(hostname -I | xargs)" yarn start`
* Disable the local httpServer by setting to `true` disableGetIndex in `src/constants/dev-config.ts`
* Your webview browser should now be able to use a locally hosted cozy-app in development/hot-reload mode

You can then connect to your local stack using the following URL : `http://foobar.10-0-2-2.nip.io:8080`

#### On iOS simulator 
* Create a cozy instance with the *.cozy.tools:8080 format
* Disable the local httpServer by setting to `true` disableGetIndex in `dev.js`
* Your webview browser should now be able to use a locally hosted cozy-app in development/hot-reload mode
### Run App tests
```bash
$ yarn test
```

### Debugging

Android: To get native log on Android:
```bash
adb logcat --pid=$(adb shell pidof -s io.cozy.flagship.mobile)
```

Use [flipper](https://fbflipper.com/docs/features/react-native/) to
have access to a React Native Debuguer.

To have access to the AsyncStorage content you can install those
2 plugins:
async-storage and async-storage-advanced (see https://github.com/cozy/cozy-react-native/pull/270
for more information)

A guide for debugging in release mode can be found here: [How to retrieve logs in release mode](docs/how-to-retrieve-logs-in-release.md)

## How to run SNCF Connector

1. Sncf connector
    1. `cd connectors/sncf`
    2. Download all dependencies and build the connector : `yarn install && yarn build`
2. The mobile app
    1. Download all dependencies with `yarn install`
    2. **Only iOS**: `cd ios && pod install`
    3. Run on iOS (`yarn ios`) or Android (`yarn android`)
    4. Fill config.json file with your cozy instance and destination folder
    5. Generate token : (`yarn token`)
    6. yarn react-native start

## [Debugging the webview in chrome](https://github.com/react-native-webview/react-native-webview/blob/master/docs/Debugging.md)



## Build an offline apk

* First, you must have `yarn start` running in another terminal
* Then run ./scripts/build-debug-offline-apk.sh
* The output will give you the path to the apk


## How to enable Flagship certification

Flagship certification is the process of verifying that the current running app is a genuine Cozy application.

This verification requires the `cozy-stack` to be configured with the app information.

To enable Flagship certification:
- Retrieve the project's Safetynet Api Key on the pass manager
  - Or generate a new one following Google documentation: https://developer.android.com/training/safetynet/attestation#add-api-key
- Put the token in the `ANDROID_SAFETY_NET_API_KEY` variable in your local `.env` file
- On `src/libs/client.js` set `shouldRequireFlagshipPermissions` to `true`
- Read `cozy-client` instruction in [flagship-certification/README.md](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/flagship-certification/README.md)

If you want to disable Flagship certification:
- On `src/libs/client.js` set `shouldRequireFlagshipPermissions` to `false`

## patch-package

After installation of every npm packages, yarn applies patches to react-native-webview.
[Patch-package](https://www.npmjs.com/package/patch-package) is a utility is used to apply the patches located in the patches folder.

## TROUBLESHOOTING

When installation has already succeeded, and a rebase happens, sometimes, it is hard to well update the App.
Here is the full list of instructions you can follow to avoid most of the issues:

1. Start Mailhog by running `mailhog` in the terminal (see [howTos/dev/sendmail](https://docs.cozy.io/en/howTos/dev/sendmail/))
2. Install and start `cozy-stack` with `cozy-home` project correctly

<details>
    <summary>More details how to start cozy-stack correctly with cozy-home</summary>

a. For more details on how to create a dev environment read [cozy-stack documentation](https://docs.cozy.io/en/cozy-stack/cli/cozy-stack_serve/) and [cozy-home documentation](https://github.com/cozy/cozy-home/blob/master/docs/develop.md)

b. For `cozy-react-native` important parameters to run `cozy-stack` are:
  * `--appdir home:/PATH_TO/cozy/cozy-home/build` - configure your local `cozy-home` project
  * `--host 0.0.0.0` - allow access from local network
  * `--mail-port 1025 --mail-disable-tls` - configure email server (see [howTos/dev/sendmail](https://docs.cozy.io/en/howTos/dev/sendmail/))
</details>

3. Start `cozy-home` (later you can start with [locally hosted webviews](https://github.com/cozy/cozy-react-native/blob/master/README.md#working-with-locally-hosted-webviews))
`cd cozy/cozy-home` && `git checkout origin/master && git fetch && yarn && yarn start`
4. Install and Start React Native
`cd cozy/cozy-react-native/` && `git checkout origin/master && git fetch && yarn && yarn start`
5. Start the emulator

<details>
    <summary>Starting iOS emulator</summary>

a. Install iOS dependencies
`cd cozy/cozy-react-native/ios` && `pod install`

b. Start Xcode

c. Choose a simulator model in the devices menu

d. Click on `Play` button to build app, that start simulator

</details>

<details>
    <summary>Starting Android emulator</summary>
<p>
a. Run Android app on emulator
   `yarn android`

</p>
</details>

6. To connect, use `http://cozy.192-168-1-102.nip.io:8080` if `192.168.1.102` is your ifconfig and after creating a nip.io URL from it.
   a. When using a nip.io URL, you must create a `cozy-stack` instance with the same FQDN (ex: `cozy.192-168-1-102.nip.io:8080`)

### Common errors

1. XCode: `error: An organization slug is required`

Read the Sentry configuration paragraph above.

2. Application blocked on the Splashscreen

Verify that the Cozy you are login into is using the last version of `cozy-home`, and try again

3. Error on app `Tried to register two views with the same name RCTIndexInjectionWebView`

This may happen after development's HotReload occurs. When encountered just restart the app. This should not happen on production.

4. Cozy-app `cozy-notes` is not working when served locally

`cozy-notes` bundle relies on a specific `tar_prefix`. When served from local `--appDir` then no `tar_prefix` is applied. However the Cozy's registry sends info from production app which has a defined `tar_prefix`.
This would break the app as ReactNative will try to serve local assets using a non-existing directory.
To prevent conflict on this, please increase your local `cozy-notes`'s version in the built `manifest.webapp` for a version that does not exist in production (i.e: `"version": "0.0.X.notexisting"`)

5. Java-related errors. 

Please make sure that Java 11 is installed and used.

6. Command PhaseScriptExecution failed with a nonzero exit code

When compiling the app from XCode, if you encounter a `Command PhaseScriptExecution failed with a nonzero exit code` error, then your NodeJS configuration may be invalid
If using NVM, then ensure that `/usr/local/bin/node` is correctly linked to your NVM default NodeJS location
More info: https://github.com/facebook/react-native/issues/32984#issuecomment-1165385007
