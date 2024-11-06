import AuthComponent from '@/components/AuthComponent'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <AuthComponent>
        <Button variant="outline">Login</Button>
      </AuthComponent>
    </div>
  )
}
