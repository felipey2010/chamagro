import { auth } from '@/auth'
import { APP_ROUTES } from '@/data/AppRoutes'
import AuthPageLayout from '@/views/AuthPageView/AuthPageLayout'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

async function AuthLayout({ children }: Props) {
  const session = await auth()

  if (session) return redirect(APP_ROUTES.HOME)

  return <AuthPageLayout>{children}</AuthPageLayout>
}

export default AuthLayout
