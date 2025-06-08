import { z } from 'zod'

export const SearchGroupSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Digite o nome do grupo' })
    .max(50, { message: 'O campo nome excedeu o limite de 50 caracteres' }),
})
