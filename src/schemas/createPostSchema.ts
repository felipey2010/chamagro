import { z } from 'zod'

export const createPostSchema = z.object({
  content: z.string().min(2).max(500),
  status: z.enum(['PUBLIC', 'PRIVATE']),
})

export type CreatePostSchema = z.infer<typeof createPostSchema>
