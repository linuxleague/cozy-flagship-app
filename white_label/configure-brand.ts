import { exec } from 'child_process'
import path from 'path'

import fs from 'fs-extra'

import Minilog from 'cozy-minilog'

import configs from './config.json'

export const logger = Minilog('Configure Brand')

export const checkGitStatus = async (): Promise<boolean> => {
  logger.info('Check git status')
  const result = await executeCommand('git status --porcelain -z')

  return result.length === 0
}

export const checkCozyBrandIso = (): boolean => {
  let isISO = true

  const basePath = 'white_label/brands/cozy/android'

  // @ts-ignore
  for (const file of readAllFiles('./white_label/brands/cozy/android')) {
    if (typeof file !== 'string') {
      continue
    }
    const relativePath = file.replace(basePath, '')
    const originalFile = path.join('./android', relativePath)

    if (!fs.existsSync(originalFile)) {
      logger.error(`${relativePath} does not exist`)
      isISO = false
      continue
    }

    const areEqual = areFilesEqual(file, originalFile)
    if (!areEqual) {
      logger.error(`${relativePath} is different`)
      isISO = false
      continue
    }
  }

  return isISO
}

export const configureBrand = async (brand: string): Promise<void> => {
  try {
    if (!Object.keys(configs).includes(brand)) {
      logger.error(
        `Brand "${brand}" does not exist in available configurations`
      )
      return
    }

    await configureAndroid(brand)
    await configureIOS(brand)
    await configureJS(brand)
  } catch (error) {
    logger.error('Could not apply changes:', error)
  }
}

const configureAndroid = async (brand: string): Promise<void> => {
  logger.info('Copy Android files')
  await fs.copy(`./white_label/brands/${brand}/android`, './android', {
    overwrite: true
  })
}

const configureIOS = async (brand: string): Promise<void> => {
  const config = configs[brand as keyof typeof configs]

  logger.info('Set iOS Bundle ID')
  await executeCommand(
    `/usr/libexec/PlistBuddy -c "Set :CFBundleIdentifier ${config.bundleId}" ios/CozyReactNative/Info.plist`
  )

  logger.info('Set iOS App Name')
  await executeCommand(
    `/usr/libexec/PlistBuddy -c "Set :CFBundleDisplayName ${config.appName}" ios/CozyReactNative/Info.plist`
  )

  logger.info('Set iOS App Scheme')
  await executeCommand(
    `/usr/libexec/PlistBuddy -c "Set :CFBundleURLTypes:0:CFBundleURLSchemes:0 ${config.scheme}" ios/CozyReactNative/Info.plist`
  )

  logger.info('Copy iOS files')
  await fs.copy(`./white_label/brands/${brand}/ios`, './ios', {
    overwrite: true
  })
}

const configureJS = async (brand: string): Promise<void> => {
  logger.info('Copy JS files')
  await fs.copy(`./white_label/brands/${brand}/js`, './src', {
    overwrite: true
  })
}

const executeCommand = async (command: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error)
        return
      }
      if (stderr) {
        reject(stderr)
        return
      }
      resolve(stdout)
    })
  })
}

function* readAllFiles(dir: string): Generator<string> {
  const files = fs.readdirSync(dir, { withFileTypes: true })

  for (const file of files) {
    if (file.isDirectory()) {
      // @ts-ignore
      yield* readAllFiles(path.join(dir, file.name))
    } else {
      yield path.join(dir, file.name)
    }
  }
}

const areFilesEqual = (file1: string, file2: string): boolean => {
  const file1Buffer = fs.readFileSync(file1)
  const file2Buffer = fs.readFileSync(file2)

  return file1Buffer.equals(file2Buffer)
}
