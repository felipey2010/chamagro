'use client'
import { Button } from '@/components/ui/button'
import AuthComponent from '../AuthComponent'

const LINK_TITLE = 'Acessar conta'

function LoginButton() {
  return (
    <AuthComponent>
      <Button
        variant="outline"
        size="default"
        className="bg-transparent border border-primary focus:outline-none hover:bg-primary focus:ring-2 focus:ring-white focus:bg-primary text-white transition-colors duration-100 ease-in-out"
      >
        {LINK_TITLE}
      </Button>
    </AuthComponent>
  )
}

export default LoginButton
