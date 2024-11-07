import { z } from 'zod'

export const callSchema = z.object({
  descricao: z
    .string({ required_error: 'Descrição do chamado é obrigatória' })
    .trim()
    .min(5, { message: 'A descrição deve ter pelo menos 5 caracteres' })
    .max(500, { message: 'A descrição deve ter no máximo 500 caracteres' }),
  localizacao: z.string({ required_error: 'Localizão é obrigatória' }),
  central: z.string(),
  outrosInteressados: z.string().optional(),
})

export type CallSchema = z.infer<typeof callSchema>
