import AuthViewProvider from '@/components/AuthComponent/Context'
import { Card, CardContent } from '@/components/ui/card'
import { AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

function AuthPageLayout({ children }: Props) {
  return (
    <Card>
      <CardContent className="sm:max-w-[800px] p-0 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 h-[600px]">
          <div className="p-6 flex flex-col justify-center md:border-r border-border overflow-hidden">
            <AuthViewProvider>
              <AnimatePresence>{children}</AnimatePresence>
            </AuthViewProvider>
          </div>
          <div className="hidden md:flex relative">
            <Image
              src="/assets/auth.svg"
              alt="auth"
              width={200}
              height={200}
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default AuthPageLayout
