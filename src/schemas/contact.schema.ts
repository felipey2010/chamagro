import { z } from 'zod'

export const ContactFormSchema = z.object({
  email: z.string().email(),
  subject: z.string().min(2).max(50),
  message: z.string().min(2).max(500),
})

export type ContactFormSchemaType = z.infer<typeof ContactFormSchema>
