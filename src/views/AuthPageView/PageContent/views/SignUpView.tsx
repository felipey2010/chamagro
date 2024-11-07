'use client'
import { useAuthView } from '@/components/AuthComponent/Context'
import SEO from '@/components/SEO'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { roleDescriptions, UserRoles } from '@/data/roles'
import { useToast } from '@/hooks/use-toast'
import { fadeIn } from '@/lib/Animations'
import { saveCredentials } from '@/lib/queries/auth.action'
import { signUpSchema, SignUpSchema } from '@/schemas/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { Eye, EyeOff, LoaderCircle } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineInfoCircle } from 'react-icons/ai'

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
      first_name: '',
      last_name: '',
      role: 'DEFAULT',
      password: '',
      confirmPassword: '',
    },
  })

  const { control, handleSubmit } = form

  const onSubmit = async (values: SignUpSchema) => {
    setLoading(true)
    try {
      await saveCredentials(values)
      toast({
        title: 'Perfil',
        description: 'Perfil criado com sucesso. Efetue login para continuar',
      })
      handleView('sign-in-view')
    } catch (error: unknown) {
      setLoading(false)
      toast({
        title: 'Erro ao salvar perfil',
        description:
          error instanceof Error
            ? error.message
            : 'Erro salvando perfil do usuário',
        variant: 'destructive',
      })
    }
  }

  return (
    <>
      <SEO title="Cadastro" />
      <motion.div
        variants={fadeIn}
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
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={control}
                disabled={loading}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name_">Primeiro nome</FormLabel>
                    <FormControl>
                      <Input
                        id="first_name_"
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
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name_">Sobrenome</FormLabel>
                    <FormControl>
                      <Input
                        id="last_name_"
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

            <FormField
              control={control}
              disabled={loading}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="role_">
                    Como pretende usar a plataforma?
                  </FormLabel>
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
                        {/* TO DO: Load roles from database */}
                        {UserRoles.map((role, index) => (
                          <SelectItem key={'role-' + index} value={role.value}>
                            {role.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription className="flex items-center gap-1">
                    Saiba mais sobre os tipos de usuários,
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger
                          type="button"
                          className="flex items-center gap-1"
                        >
                          clique aqui <AiOutlineInfoCircle />
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="w-fit flex flex-col">
                            {roleDescriptions.map((role) => (
                              <div key={role.name}>
                                <p>{role.name}</p>
                                <ul className="pl-4 list-disc">
                                  {role.description.map((func, index) => (
                                    <li key={'description-' + index}>{func}</li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                          showConfirmPassword
                            ? 'Esconder senha'
                            : 'Mostrar senha'
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
              {loading && (
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              )}
              Enviar
            </Button>
          </form>
        </Form>
      </motion.div>
    </>
  )
}

export default SignUpView
