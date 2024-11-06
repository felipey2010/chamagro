'use client'
import { Button } from '@/components/ui/button'
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
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
import { fadeInLeft } from '@/lib/Animations'
import { requestPasswordReset } from '@/lib/queries/auth.action'
import { signInSchema, SignInSchema } from '@/schemas/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useAuthView } from '../Context'

type Props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function SignInView({ setIsOpen }: Props) {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { registeredEmail, handleView } = useAuthView()
  const dataForm = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const { handleSubmit, control, setValue, setFocus } = dataForm
  const { toast } = useToast()

  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || ''
  const error = searchParams.get('error') || ''

  useEffect(() => {
    if (registeredEmail) {
      setValue('email', registeredEmail)
    }
  }, [registeredEmail, setValue])

  const onSubmit = async (data: SignInSchema) => {
    setLoading(true)
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      })

      if (res?.error) {
        setLoading(false)
        setFocus('password')
        toast({
          title: 'Login',
          description:
            'Erro de login. Verifique que seus dados estejam corretos',
          variant: 'destructive',
        })
        return
      }

      if (res?.ok) {
        setIsOpen(false)
        toast({
          title: 'Login',
          description: 'Login realizado com sucesso',
        })
        router.push(callbackUrl || '/')
      }
    } catch (error: unknown) {
      setLoading(false)
      toast({
        title: 'Erro Login',
        description:
          error instanceof Error ? error.message : 'Erro ao fazer login',
        variant: 'destructive',
      })
    }
  }

  useEffect(() => {
    if (error)
      router.replace(`/auth${callbackUrl ? `?callbackUrl=${callbackUrl}` : ''}`)
  }, [error, router, callbackUrl])

  const sendPasswordResetRequest = async () => {
    try {
      await requestPasswordReset(registeredEmail)
      handleView('password-reset-code-view')
    } catch (error: unknown) {
      toast({
        title: 'Redefinição de senha',
        description:
          error instanceof Error
            ? error.message
            : 'Erro solicitando redefinição de senha',
        variant: 'destructive',
      })
    }
  }

  return (
    <motion.div
      variants={fadeInLeft}
      initial="initial"
      whileInView="animate"
      viewport={{
        amount: 'all',
        once: true,
      }}
    >
      <Form {...dataForm}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-3"
        >
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold mb-2">Login</DialogTitle>
            <DialogDescription>Acesse com suas credenciais</DialogDescription>
          </DialogHeader>
          <FormField
            control={control}
            // disabled={true}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor="email_">Email</FormLabel>
                <FormControl>
                  <Input
                    id="email_"
                    placeholder="Digite seu email"
                    autoComplete="off"
                    required
                    disabled
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor="password_">Senha</FormLabel>
                <FormControl autoFocus>
                  <div className="relative">
                    <Input
                      id="password_"
                      placeholder="Digite sua senha"
                      autoComplete="off"
                      required
                      autoFocus
                      disabled={loading}
                      type={showPassword ? 'text' : 'password'}
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      disabled={loading}
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={
                        showPassword ? 'Esconder senha' : 'Mostrar senha'
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="w-full flex items-center justify-end">
            <Button
              type="button"
              variant="link"
              onClick={sendPasswordResetRequest}
            >
              Esqueci minha senha
            </Button>
          </div>

          <Button
            type="submit"
            name="Entrar"
            disabled={loading}
            size="lg"
            className="w-full mb-4"
          >
            {loading && (
              <AiOutlineLoading3Quarters className="h-5 w-5 mr-2 animate-spin" />
            )}
            Entrar
          </Button>
          <span className="text-muted-foreground text-center my-4 text-sm italic">
            Ao fazer login, você concorda com nossa{' '}
            <Link
              href="/politica-de-privacidade"
              className="link hover:text-primary"
            >
              política de privacidade,{' '}
            </Link>
            <Link href="/termo-de-servico" className="link hover:text-primary">
              termos de uso e código de conduta
            </Link>
            .
          </span>
        </form>
      </Form>
    </motion.div>
  )
}

export default SignInView
