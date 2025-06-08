'use server'

import { env } from '@/lib/env'
import { fetcher } from '@/lib/fetcher'
import { LoginFormSchema, RegisterFormSchema } from '@/lib/schemas/auth'
import { LoginFormState, RegisterFormState } from '@/lib/states/auth'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import * as jose from 'jose'
import { getPrevState } from '../utils'

export async function login(
  formState: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  const data = Object.fromEntries(formData.entries())
  const parsed = LoginFormSchema.safeParse(data)
  const prevState = getPrevState(formData)

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors, prevState }
  }

  try {
    const res = await fetcher({
      url: '/auth/register',
      method: 'POST',
      options: { body: JSON.stringify(parsed.data) },
    })
    if (res.error) {
      return { errors: { _form: res.message }, prevState }
    }

    const { token } = res.data as { token: string }
    createSessionAndRedirect(token)

    return { response: 'Login efetuado com sucesso', errors: {} }
  } catch {
    return {
      errors: {
        _form: 'Erro ao processar o login. Tente novamente mais tarde.',
      },
      prevState,
    }
  }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete(env.SESSION_KEY)
  redirect('/auth')
}

export async function register(
  formState: RegisterFormState,
  formData: FormData,
): Promise<RegisterFormState> {
  const data = Object.fromEntries(formData.entries())
  const parsed = RegisterFormSchema.safeParse(data)
  const prevState = getPrevState(formData)

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
      prevState: getPrevState(formData),
    }
  }

  if (parsed.data.password !== parsed.data.confirmPassword) {
    return {
      errors: { confirmPassword: ['As senhas não coincidem'] },
      prevState,
    }
  }

  try {
    const res = await fetcher({
      url: '/auth/register',
      method: 'POST',
      options: { body: JSON.stringify(parsed.data) },
    })
    if (res.error) {
      return { errors: { _form: res.message }, prevState }
    }

    return { response: res.message, errors: {} }
  } catch {
    return {
      prevState,
      errors: {
        _form:
          'Não foi possível estabelecer uma conexão segura com o servidor. Tente novamente',
      },
    }
  }
}

export async function createSessionAndRedirect(token: string) {
  if (await verifyToken(token)) {
    const cookieStore = await cookies()
    cookieStore.set(env.SESSION_KEY, token)
    redirect('/')
  }
  redirect('/auth')
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jose.jwtVerify(
      token,
      new TextEncoder().encode(env.JWT_SECRET),
      { issuer: env.APP_NAME },
    )

    return payload
  } catch {
    return null
  }
}
