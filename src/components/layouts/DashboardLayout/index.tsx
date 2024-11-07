import NotificationComponent from '@/components/NotificationComponent'
import ThemeSwitch from '@/components/ThemeSwitch'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { ReactNode } from 'react'
import AppSidebar from './AppSidebar'

type Props = {
  children: ReactNode
}

function DashboardLayout({ children }: Props) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full flex flex-col">
        <div className="w-full h-12 flex items-center justify-between gap-4 border-b border-border p-2">
          <SidebarTrigger />
          <div className="flex items-center gap-2">
            <NotificationComponent />
            <ThemeSwitch />
          </div>
        </div>
        <div className="w-full h-full flex flex-1 p-2">{children}</div>
      </main>
    </SidebarProvider>
  )
}

export default DashboardLayout
