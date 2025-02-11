import { parseOnboardLink } from '/app/domain/deeplinks/services/DeeplinksParserService'
import { routes } from '/constants/routes'

describe('DeeplinksParserService', () => {
  describe('parseOnboardLink', () => {
    it('should handle InstanceCreation deeplinks', () => {
      const deeplink =
        'https://links.mycozy.cloud/flagship/onboarding?flagship=true&onboard_url=SOME_ONBOARD_URL'

      const result = parseOnboardLink(deeplink)

      expect(result).toStrictEqual({
        route: routes.instanceCreation,
        params: {
          onboardUrl: 'SOME_ONBOARD_URL'
        },
        onboardedRedirection: null
      })
    })

    it('should handle Login deeplinks', () => {
      const deeplink = 'http://localhost:8080/onboarding-url?fqdn=SOME_FQDN'

      const result = parseOnboardLink(deeplink)

      expect(result).toStrictEqual({
        route: routes.authenticate,
        params: {
          fqdn: 'SOME_FQDN'
        },
        onboardedRedirection: null
      })
    })

    it('should handle MagicLink deeplinks', () => {
      const deeplink =
        'https://links.mycozy.cloud/flagship/onboarding?flagship=true&fqdn=SOME_FQDN&magic_code=SOME_MAGIC_CODE'

      const result = parseOnboardLink(deeplink)

      expect(result).toStrictEqual({
        route: routes.authenticate,
        params: {
          fqdn: 'SOME_FQDN',
          magicCode: 'SOME_MAGIC_CODE'
        }
      })
    })

    it('should return null if no deeplink detected', () => {
      const deeplink = 'https://SOME_UNHANDLED_DEEPLINK'

      const result = parseOnboardLink(deeplink)

      expect(result).toBeNull()
    })

    it('should handle Manager deeplinks', () => {
      const deeplink =
        'https://links.mycozy.cloud/flagship/manager?fallback=SOME_FALLBACK'

      const result = parseOnboardLink(deeplink)

      expect(result).toStrictEqual({
        route: routes.manager,
        params: {
          managerUrl: 'SOME_FALLBACK'
        }
      })
    })
  })
})
