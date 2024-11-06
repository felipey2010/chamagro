'use client'
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
import { fadeInRight } from '@/lib/Animations'
import { passwordResetSchema, PasswordResetSchema } from '@/schema/AuthSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useAuthView } from '../Context'

function ResetPasswordView() {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)
  const { registeredEmail, handleCancel, handleView, verificationCode } =
    useAuthView()

  const dataForm = useForm<PasswordResetSchema>({
    resolver: zodResolver(passwordResetSchema),
    defaultValues: {
      email: '',
      code: '',
      password: '',
      confirmPassword: '',
    },
  })
  const { handleSubmit, control, setValue } = dataForm
  const { toast } = useToast()

  useEffect(() => {
    if (registeredEmail) {
      setValue('email', registeredEmail)
    }
    if (verificationCode) {
      setValue('code', verificationCode)
    }
  }, [registeredEmail, setValue, verificationCode])

  const onSubmit = async (data: PasswordResetSchema) => {
    setLoading(true)
    try {
      //   const response = await resetPassword(data)
      //   if (response.success) {
      //     toast({
      //       title: 'Redefinição de senha',
      //       description: 'Senha redefinida com sucesso',
      //     })
      handleView('sign-in-view')
      //   }
    } catch (error: any) {
      setLoading(false)
      toast({
        title: 'Erro - Redefinição de senha',
        description: error.message || 'Erro ao redefinir senha',
        variant: 'destructive',
      })
    }
  }

  return (
    <motion.div
      variants={fadeInRight}
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
          className="w-full flex flex-col items-center gap-3"
        >
          <h1 className="text-2xl font-bold text-foreground">
            Redefina sua senha
          </h1>
          <FormField
            control={control}
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
                    className="h-12"
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
                <FormLabel htmlFor="password_">Nova Senha</FormLabel>
                <FormControl autoFocus>
                  <div className="relative">
                    <Input
                      id="password_"
                      placeholder="Digite sua nova senha"
                      autoComplete="off"
                      required
                      autoFocus
                      disabled={loading}
                      className="h-12"
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

          <FormField
            control={control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor="confirmPassword_">
                  Confirmar sua nova senha
                </FormLabel>
                <FormControl autoFocus>
                  <div className="relative">
                    <Input
                      id="confirmPassword_"
                      placeholder="Confirme a nova senha"
                      autoComplete="off"
                      required
                      autoFocus
                      disabled={loading}
                      className="h-12"
                      type={showPassword2 ? 'text' : 'password'}
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      disabled={loading}
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword2(!showPassword2)}
                      aria-label={
                        showPassword2 ? 'Esconder senha' : 'Mostrar senha'
                      }
                    >
                      {showPassword2 ? (
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

          <Button
            type="submit"
            name="Redefinir"
            disabled={loading}
            size="lg"
            className="w-full mb-4"
          >
            {loading && (
              <AiOutlineLoading3Quarters className="h-5 w-5 mr-2 animate-spin" />
            )}
            Redefinir
          </Button>
          <Button
            type="button"
            onClick={handleCancel}
            disabled={loading}
            variant="outline"
            className="w-full mb-2"
          >
            Cancelar
          </Button>
        </form>
      </Form>
    </motion.div>
  )
}

export default ResetPasswordView
