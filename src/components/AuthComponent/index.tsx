'use client'

import { ReactNode, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import Image from 'next/image'

type Props = {
  children: ReactNode
}

function AuthComponent({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Login with email:', email)
  }

  const handleGoogleLogin = () => {
    console.log('Login with Google')
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 h-[600px]">
          <div className="p-6 flex flex-col justify-center md:border-r border-border">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold mb-2">
                Bem-vindo(a)
              </DialogTitle>
              <DialogDescription>
                Use seu e-mail ou outra plataforma de identificação para entrar
                no ChamAgro
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleEmailSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Continue com Email
              </Button>
            </form>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Ou acessar com
                </span>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={handleGoogleLogin}
              className="w-full"
            >
              Continue com Google
            </Button>
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
