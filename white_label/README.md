# Brand configuration

Brand configuration allows to build multiple versions of the app with customization on:
- Package id and app name
- Icons
- Splashscreens
- Notifications channels
- Universal links
- etc

## Nomenclature

- `Brand`: Identifier that represent one of the app's version (i.e. `cozy` or  `mabulle`)
- `App name`: The name of the application as it appears on the OS' home screen
- `Bundle id`: The unique identifier of the application that is used by the OS and by the store
  - `Application id`: Android's nomenclature for `Bundle id`
  - `package_name`: `google-services.json` nomenclature for `Bundle id`

## Worfklow

Brand configurations are stored in the `white_label` folder. This folder contains one subfolder for each brands we want to configure

A brand subfolder should contain up to 3 folders:
- `android`: every files in this folder will be copied in the root `android` folder
- `ios`: every files in this folder will be copied in the root `ios` folder
- `javascript`: every files in this folder will be copied in the root `src` folder

## Android customizations

### App name and bundle id

- App name is specified in `white_label/<brand_name>/android/app/src/main/res/values/strings.xml`
- Bundle id is specified in `white_label/<brand_name>/android/app/brand.gradle`
  - :warning: `applicationId` should be synchronized whith `package_name` in `google-services.json` files

## iOS customizations

## Javascript customizations