'use client'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react'

interface AuthViewContextType {
  view: string
  registeredEmail: string
  verificationCode: string
  setRegisteredEmail: Dispatch<SetStateAction<string>>
  setVerificationCode: Dispatch<SetStateAction<string>>
  handleCancel: () => void
  handleView: (view: string) => void
}

const AuthViewContext = createContext<AuthViewContextType | undefined>(
  undefined
)

interface AuthViewProviderProps {
  children: ReactNode
}

export default function AuthViewProvider({ children }: AuthViewProviderProps) {
  const [view, setView] = useState<string>('auth-view')
  const [registeredEmail, setRegisteredEmail] = useState<string>('')
  const [verificationCode, setVerificationCode] = useState<string>('')

  const handleView = (currentView: string) => {
    setView(currentView)
  }

  const handleCancel = () => {
    setView('auth-view')
  }

  const authenticationViewValues = {
    view,
    handleView,
    handleCancel,
    registeredEmail,
    verificationCode,
    setVerificationCode,
    setRegisteredEmail,
  }

  return (
    <AuthViewContext.Provider value={authenticationViewValues}>
      {children}
    </AuthViewContext.Provider>
  )
}

export const useAuthView = (): AuthViewContextType => {
  const context = useContext(AuthViewContext)
  if (!context) {
    throw new Error('useAuthView must be used within an AuthViewProvider')
  }
  return context
}
