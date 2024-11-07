'use client'
import { useAuthView } from '@/components/AuthComponent/Context'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { useToast } from '@/hooks/use-toast'
import { fadeIn } from '@/lib/Animations'
import { checkVerificationCode } from '@/lib/queries/auth.action'
import {
  verificationCodeSchema,
  VerificationCodeSchema,
} from '@/schemas/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp'
import { Loader } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

function VerificationCode() {
  const [loading, setLoading] = useState(false)
  const { registeredEmail, handleView, handleCancel } = useAuthView()
  const dataForm = useForm<VerificationCodeSchema>({
    resolver: zodResolver(verificationCodeSchema),
    defaultValues: {
      email: registeredEmail || '',
      code: '',
    },
  })
  const { handleSubmit, control } = dataForm
  const { toast } = useToast()

  const onSubmit = async (values: VerificationCodeSchema) => {
    setLoading(true)
    try {
      const response = await checkVerificationCode(values)
      if (response.success) {
        handleView('sign-up-view')
      }
    } catch (error: unknown) {
      setLoading(false)
      toast({
        title: 'Verificação de código',
        description:
          error instanceof Error ? error.message : 'Erro verificando código',
        variant: 'destructive',
      })
    }
  }

  return (
    <motion.div
      variants={fadeIn}
      initial="initial"
      whileInView="animate"
      viewport={{
        amount: 'all',
        once: true,
      }}
    >
      <div className="w-full flex flex-col gap-2 mb-2">
        <h1 className="text-2xl font-bold text-foreground">
          Código de Verificação
        </h1>
        <div className="w-full flex flex-col text-muted-foreground text-base">
          <p className="w-full text-pretty">
            Acabamos de enviar um e-mail para <strong>{registeredEmail}</strong>{' '}
            com um código de 6 dígitos.
          </p>
          <p className="w-full">
            Caso não tenha visto, verifique sua caixa de spam
          </p>
        </div>
      </div>
      <Form {...dataForm} key="code-verification-form">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col items-center gap-2"
        >
          <FormField
            control={control}
            name="code"
            render={({ field }) => (
              <FormItem className="w-full text-center flex flex-col items-center">
                <FormControl>
                  <InputOTP
                    maxLength={6}
                    {...field}
                    pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                  >
                    <InputOTPGroup className="h-14">
                      <InputOTPSlot
                        index={0}
                        className="h-full text-base font-bold"
                      />
                      <InputOTPSlot
                        index={1}
                        className="h-full text-base font-bold"
                      />
                      <InputOTPSlot
                        index={2}
                        className="h-full text-base font-bold"
                      />
                      <InputOTPSlot
                        index={3}
                        className="h-full text-base font-bold"
                      />
                      <InputOTPSlot
                        index={4}
                        className="h-full text-base font-bold"
                      />
                      <InputOTPSlot
                        index={5}
                        className="h-full text-base font-bold"
                      />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription className="text-md">
                  Por favor, digite o código de verificação enviado para o seu
                  email
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={loading}
            size="lg"
            className="w-full py-2 mt-2"
          >
            {loading && <Loader className="h-5 w-5 animate-spin mr-2" />}
            Enviar
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

export default VerificationCode
