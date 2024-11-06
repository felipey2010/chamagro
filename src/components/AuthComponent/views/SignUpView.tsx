'use client'
import { fadeInLeft } from '@/lib/Animations'
import { motion } from 'framer-motion'

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { signUpSchema, SignUpSchema } from '@/schema/AuthSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, LoaderCircle } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuthView } from '../Context'

function SignUpView() {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { registeredEmail, handleView } = useAuthView()

  const { toast } = useToast()

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: registeredEmail,
      firstName: '',
      lastName: '',
      role: 'DEFAULT',
      password: '',
      confirmPassword: '',
    },
  })

  const { control, handleSubmit } = form

  const onSubmit = async (values: SignUpSchema) => {
    setLoading(true)
    try {
      //   await saveCredentials(values)
      toast({
        title: 'Perfil',
        description: 'Perfil criado com sucesso. Efetue login para continuar',
      })
      handleView('sign-in-view')
    } catch (error: any) {
      setLoading(false)
      toast({
        title: 'Erro ao salvar perfil',
        description: error.message || 'Erro salvando perfil do usuário',
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
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
          <h1 className="text-2xl font-bold text-foreground">
            Complete seu perfil
          </h1>
          <div className="w-full grid grid-cols-1 md:grid-cols-2">
            <FormField
              control={control}
              disabled={loading}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name_">Primeiro nome</FormLabel>
                  <FormControl>
                    <Input
                      id="name_"
                      placeholder="Informe o seu primeiro nome"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              disabled={loading}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name_">Sobrenome</FormLabel>
                  <FormControl>
                    <Input
                      id="name_"
                      placeholder="Informe o seu sobrenome"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
            <FormField
              control={control}
              disabled={loading}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="role_">Tipo de usuário</FormLabel>
                  <FormControl>
                    <Select
                      name="role"
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={loading}
                    >
                      <SelectTrigger id="role_">
                        <SelectValue placeholder="--selecione--" />
                      </SelectTrigger>
                      <SelectContent ref={field.ref}>
                        <SelectItem value="PRODUTOR">Produtor</SelectItem>
                        <SelectItem value="TECHNICIAN">Técnico</SelectItem>
                        <SelectItem value="MERCHANT">Comerciante</SelectItem>
                        <SelectItem value="DEFAULT">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={control}
            disabled={loading}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="password_">Senha</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      id="password_"
                      placeholder="Senha"
                      autoComplete="off"
                      type={showPassword ? 'text' : 'password'}
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
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
            disabled={loading}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="confirmPassword_">
                  Confirmar a senha
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      id="confirmPassword_"
                      placeholder="Confirmar a senha"
                      autoComplete="off"
                      type={showConfirmPassword ? 'text' : 'password'}
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      aria-label={
                        showConfirmPassword ? 'Esconder senha' : 'Mostrar senha'
                      }
                    >
                      {showConfirmPassword ? (
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
          <Button type="submit" disabled={loading} className="w-full">
            {loading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
            Enviar
          </Button>
        </form>
      </Form>
    </motion.div>
  )
}

export default SignUpView
