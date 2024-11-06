import { z } from 'zod'

export const profileSetupSchema = z.object({
  username: z
    .string({ required_error: 'O nome de usuário é obrigatório' })
    .trim()
    .min(5, { message: 'O nome de usuário deve ter pelo menos 5 caracteres' })
    .max(15, { message: 'O nome de usuário deve ter no máximo 15 caracteres' })
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      'O nome de usuário deve conter apenas letras, números, hífen e underscore'
    )
    .toLowerCase(),
  name: z
    .string()
    .trim()
    .min(3, {
      message: 'O nome deve ter pelo menos 3 caracteres',
    })
    .max(100, {
      message: 'O nome deve ter no máximo 100 caracteres',
    }),
  bio: z
    .string()
    .min(12, { message: 'O bio não pode ser menor que 12 caracteres' })
    .max(500, { message: 'O bio não pode ser maior que 500 caracteres' })
    .optional()
    .or(z.literal('')),
  role: z.enum(['MENTEE', 'MENTOR', 'ADMIN'], {
    message: 'Tipo de função do usuário é inválido',
  }),
  available_for_mentoring: z.enum(['true', 'false'], {
    message: 'Disponibilidade para mentoria é inválida',
  }),
})

export const interestSetupSchema = z.object({
  profession_id: z
    .string()
    .min(1, { message: 'É necessário selecionar uma área de atuação' }),
  areas: z.array(z.number()),
  // .min(1, { message: 'Deve selecionar no mínimo 1 sub-área' }),
})

export const notificationConfigSchema = z.object({
  connection_request: z.boolean().default(true).optional(),
  received_message: z.boolean().default(true).optional(),
  meeting_reminder: z.boolean().default(true).optional(),
  feedback_notification: z.boolean().default(true).optional(),
  connection_suggestion: z.boolean().default(false).optional(),
})

export type ProfileSetupSchema = z.infer<typeof profileSetupSchema>
export type InterestSetupSchema = z.infer<typeof interestSetupSchema>
export type NotificationConfigSchema = z.infer<typeof notificationConfigSchema>
