import { z } from 'zod'

const schema = z.object({
  API_URL: z.string().url(),
  SESSION_KEY: z.string(),
  JWT_SECRET: z.string(),
  APP_NAME: z.string(),
})

export const env = schema.parse(process.env)
