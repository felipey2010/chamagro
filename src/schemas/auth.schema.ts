import { z } from 'zod'

export const signUpSchema = z
  .object({
    email: z.string().email({ message: 'O email é inválido' }),
    password: z
      .string()
      .min(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
      .max(12, { message: 'A senha deve ter no máximo 12 caracteres' })
      .regex(/[A-Z]/, {
        message: 'A senha deve conter pelo menos uma letra maiúscula',
      })
      .regex(/[a-z]/, {
        message: 'A senha deve conter pelo menos uma letra minúscula',
      })
      .regex(/\d/, { message: 'A senha deve conter pelo menos um número' }),
    confirmPassword: z
      .string()
      .min(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
      .max(12, { message: 'A senha deve ter no máximo 12 caracteres' }),
    first_name: z
      .string()
      .trim()
      .min(3, {
        message: 'O nome deve ter pelo menos 3 caracteres',
      })
      .max(100, {
        message: 'O nome deve ter no máximo 100 caracteres',
      }),
    last_name: z
      .string()
      .trim()
      .min(3, {
        message: 'O nome deve ter pelo menos 3 caracteres',
      })
      .max(100, {
        message: 'O nome deve ter no máximo 100 caracteres',
      }),
    role: z.enum(['DEFAULT', 'PRODUTOR', 'MERCHANT', 'TECHNICIAN'], {
      message: 'Tipo de função do usuário é inválido',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })

export const signInSchema = z.object({
  email: z.string(),
  password: z.string({ message: 'A senha é obrigatória' }),
})

export const authSchema = z.object({
  user_email: z.string().email({ message: 'Deve informar um email válido' }),
})

export const verificationCodeSchema = z.object({
  email: z.string().email({ message: 'Deve informar um email válido' }),
  code: z
    .string()
    .min(6, { message: 'O código deve ter no mínimo 6 caracteres' }),
})

export const passwordResetSchema = z
  .object({
    email: z.string().email({ message: 'Deve informar um email válido' }),
    code: z
      .string()
      .min(6, { message: 'O código deve ter no mínimo 6 caracteres' }),
    password: z
      .string()
      .min(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
      .max(12, { message: 'A senha deve ter no máximo 12 caracteres' }),
    confirmPassword: z
      .string()
      .min(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
      .max(12, { message: 'A senha deve ter no máximo 12 caracteres' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })

export type SignInSchema = z.infer<typeof signInSchema>
export type SignUpSchema = z.infer<typeof signUpSchema>
export type VerificationCodeSchema = z.infer<typeof verificationCodeSchema>
export type AuthSchema = z.infer<typeof authSchema>
export type PasswordResetSchema = z.infer<typeof passwordResetSchema>
