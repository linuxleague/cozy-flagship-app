import { version } from '../../package.json'

import strings from '/constants/strings.json'

export const USER_AGENT = `${strings.USER_AGENT}-${version}`

export const userAgentDefault = { applicationNameForUserAgent: USER_AGENT }
