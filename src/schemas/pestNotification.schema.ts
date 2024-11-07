import { z } from 'zod'

export const pestNotificationSchema = z.object({
  name: z.string(),
  tags: z.string(),
  description: z.string(),
  host: z.string(),
  damages: z.string(),
  prevention: z.string(),
  reference: z.string(),
})

export type PestNotificationSchema = z.infer<typeof pestNotificationSchema>
