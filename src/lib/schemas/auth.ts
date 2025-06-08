import { z } from 'zod'

export const LoginFormSchema = z.object({
  email: z.string().min(1, 'E-mail é obrigatório').email('E-mail inválido'),
  password: z
    .string()
    .min(1, 'Senha é obrigatória')
    .min(6, 'Senha deve ter pelo menos 6 caracteres'),
})

export const RegisterFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Nome é obrigatório')
    .transform((val) => {
      const splited = val.split(' ')
      return splited
        .map((spl) =>
          spl.charAt(0).toUpperCase().concat(spl.slice(1).toLowerCase()),
        )
        .join(' ')
        .trim()
    }),
  email: z.string().min(1, 'E-mail é obrigatório').email('E-mail inválido'),
  password: z
    .string()
    .min(1, 'Senha é obrigatória')
    .min(6, 'Senha deve ter pelo menos 6 caracteres'),
  confirmPassword: z
    .string()
    .min(1, 'Confirmação de senha é obrigatória')
    .min(6, 'Confirmação de senha deve ter pelo menos 6 caracteres'),
})
