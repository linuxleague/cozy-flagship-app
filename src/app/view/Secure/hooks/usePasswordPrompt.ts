import { navigate } from '/libs/RootNavigation'
import { routes } from '/constants/routes'
import { devlog } from '/core/tools/env'

export const usePasswordPrompt = (onSuccess: () => void): (() => void) => {
  const handleSetPassword = (): void => {
    try {
      // It should be impossible according to the typings for onSuccess to be undefined,
      // but it feels safer with a strict check at runtime too. If it is undefined at this point,
      // it will cause critical errors at a later point which can not be allowed.
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (!onSuccess)
        throw new Error('No onSuccess callback given to PinPrompt')

      // User acknowledged the prompt, so we can navigate to the password setting screen
      // We pass the onSuccess callback to the password setting screen so that it can be called when the password is set
      navigate(routes.setPassword, { onSuccess })
    } catch (error) {
      devlog(error)

      // If there is any kind of error, we fallback to the home screen as a last resort to avoid the user being stuck
      navigate(routes.setPassword, { onSuccess: () => navigate(routes.home) })
    }
  }

  return handleSetPassword
}
