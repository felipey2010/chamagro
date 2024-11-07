import { auth } from '@/auth'
import { ReactNode } from 'react'
import DashboardLayout from './DashboardLayout'

type Props = {
  children: ReactNode
}

async function LayoutManager({ children }: Props) {
  const session = await auth()

  if (!session) return <div>{children}</div>
  // if (session?.user.needsSetup) redirect(APP_ROUTES.PROFILE_SETUP)

  return <DashboardLayout>{children}</DashboardLayout>
}

export default LayoutManager
