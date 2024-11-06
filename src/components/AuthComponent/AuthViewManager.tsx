import { useAuthView } from './Context'
import LoginView from './views/LoginView'
import PasswordCodeVerificationView from './views/PasswordCodeVerificationView'
import ResetPasswordView from './views/ResetPasswordView'
import SignInView from './views/SignInView'
import SignUpView from './views/SignUpView'
import VerificationCode from './views/VerificationCode'

function AuthViewManager() {
  const { view } = useAuthView()

  const views: Record<
    | 'auth-view'
    | 'sign-in-view'
    | 'sign-up-view'
    | 'verification-code'
    | 'reset-password-view'
    | 'password-reset-code-view',
    JSX.Element
  > = {
    'auth-view': <LoginView />,
    'sign-in-view': <SignInView />,
    'sign-up-view': <SignUpView />,
    'verification-code': <VerificationCode />,
    'reset-password-view': <ResetPasswordView />,
    'password-reset-code-view': <PasswordCodeVerificationView />,
  }
  return views[view as keyof typeof views] || null
}

export default AuthViewManager
