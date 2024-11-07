'use client'
import { Button } from '@/components/ui/button'
import AuthComponent from '../AuthComponent'

const LINK_TITLE = 'Acessar conta'

function LoginButton() {
  return (
    <AuthComponent>
      <Button variant="outline" size="default">
        {LINK_TITLE}
      </Button>
    </AuthComponent>
  )
}

export default LoginButton
