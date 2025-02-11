import { UploadError } from '/app/domain/upload/models'

export class BackupError extends Error {
  textMessage: string
  statusCode: number | undefined

  constructor(message: string, statusCode?: number) {
    const stringifiedMessage = JSON.stringify({
      message,
      statusCode
    })

    super(stringifiedMessage)
    this.name = 'BackupError'
    this.textMessage = message
    this.statusCode = statusCode
  }
}

export const isUploadError = (error: unknown): error is UploadError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'statusCode' in error &&
    'errors' in error &&
    Array.isArray(error.errors)
  )
}

export const isMetadataExpiredError = (error: UploadError): boolean => {
  return (
    error.statusCode === 422 &&
    error.errors[0]?.detail === 'Invalid or expired MetadataID'
  )
}

export const isQuotaExceededError = (error: UploadError): boolean => {
  return (
    error.statusCode === 413 &&
    error.errors[0]?.detail === 'The file is too big and exceeds the disk quota'
  )
}

export const isFileTooBigError = (error: UploadError): boolean => {
  return (
    error.statusCode === 413 &&
    error.errors[0]?.detail ===
      'The file is too big and exceeds the filesystem maximum file size'
  )
}

export const isCancellationError = (error: UploadError): boolean => {
  return (
    error.statusCode === -1 &&
    error.errors[0]?.detail === 'User cancelled upload'
  )
}

export const shouldRetryCallbackBackup = (error: Error): boolean => {
  const notRetryableError =
    isUploadError(error) &&
    (isMetadataExpiredError(error) ||
      isQuotaExceededError(error) ||
      isFileTooBigError(error) ||
      isCancellationError(error))

  return !notRetryableError
}
