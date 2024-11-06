'use client'

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import Image from 'next/image'
import { ReactNode, useState } from 'react'
import AuthViewManager from './AuthViewManager'
import AuthViewProvider from './Context'
import { AnimatePresence } from 'framer-motion'

type Props = {
  children: ReactNode
}

function AuthComponent({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 h-[600px]">
          <div className="p-6 flex flex-col justify-center md:border-r border-border overflow-hidden">
            <AuthViewProvider>
              <AnimatePresence>
                <AuthViewManager />
              </AnimatePresence>
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
      </DialogContent>
    </Dialog>
  )
}

export default AuthComponent
