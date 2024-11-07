'use client'
import { signIn } from '@/auth'
import { useAuthView } from '@/components/AuthComponent/Context'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { verifyEmailExistence } from '@/lib/queries/auth.action'
import { authSchema, AuthSchema } from '@/schemas/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FcGoogle } from 'react-icons/fc'

function LoginView() {
  const { handleView, setRegisteredEmail } = useAuthView()
  const [loading, setLoading] = useState(false)
  const dataForm = useForm<AuthSchema>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      user_email: '',
    },
  })
  const { handleSubmit, control } = dataForm

  const { toast } = useToast()

  const onSubmit = async (values: AuthSchema) => {
    setLoading(true)
    try {
      const lowerCaseEmail = values.user_email.toLocaleLowerCase()
      setRegisteredEmail(lowerCaseEmail)
      const { success, data } = await verifyEmailExistence(lowerCaseEmail)

      if (success && data) {
        handleView('sign-in-view')
      }

      if (success && !data) {
        handleView('verification-view')
      }
    } catch (error: unknown) {
      setLoading(false)
      toast({
        title: 'Autenticação',
        description:
          error instanceof Error ? error.message : 'Erro verificando email',
        variant: 'destructive',
      })
    }
  }

  async function handleSignIn(provider: string) {
    await signIn(provider, { callbackUrl: '/' })
  }

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold mb-2">Bem-vindo(a)</h1>
        <p>
          Use seu e-mail ou outra plataforma de identificação para entrar no
          ChamAgro
        </p>
      </div>
      <Form {...dataForm} key="auth-form">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <FormField
            control={control}
            name="user_email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor="user_email_">Seu email</FormLabel>
                <FormControl autoFocus>
                  <Input
                    id="user_email_"
                    placeholder="Digite seu email"
                    autoComplete="off"
                    required
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            name="Entrar com e-mail"
            disabled={loading}
            size="lg"
            className="w-full mb-4"
          >
            {loading && <Loader className="h-5 w-5 mr-2 animate-spin" />}
            Entrar com e-mail
          </Button>
        </form>
      </Form>
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
        type="button"
        name="entrar com google"
        size="lg"
        variant="outline"
        onClick={() => handleSignIn('google')}
        className="w-full"
      >
        <FcGoogle size={24} className="mr-2" />
        Entrar com Google
      </Button>
    </div>
  )
}

export default LoginView
