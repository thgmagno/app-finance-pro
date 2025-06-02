'use server'

import { LoginFormSchema, RegisterFormSchema } from '@/lib/schemas/auth'
import { LoginFormState, RegisterFormState } from '@/lib/states/auth'
import { redirect } from 'next/navigation'

export async function login(
  formState: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  const data = Object.fromEntries(formData.entries())
  const parsed = LoginFormSchema.safeParse(data)

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
      prevState: data as Partial<LoginFormState['prevState']>,
    }
  }

  try {
    const response = await fetch('http://localhost:3001/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parsed.data),
    })
    if (!response.ok) {
      const errorData = await response.json()
      return {
        errors: { _form: errorData.message || 'Erro ao processar o login.' },
        prevState: parsed.data,
      }
    }
    const result = await response.json()
    const token = String(result.token)
    // criar cookies para armazenar a sessão do usuário
  } catch {
    return {
      errors: {
        _form: 'Erro ao processar o login. Tente novamente mais tarde.',
      },
      prevState: parsed.data,
    }
  }

  redirect('/')
}

export async function logout() {
  // Placeholder for logout logic
  // This function should handle user logout
  // For example, it could clear user session or token
  console.log('Logout function called')
}

export async function register(
  formState: RegisterFormState,
  formData: FormData,
): Promise<RegisterFormState> {
  const data = Object.fromEntries(formData.entries())
  const parsed = RegisterFormSchema.safeParse(data)

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
      prevState: data as Partial<RegisterFormState['prevState']>,
    }
  }

  if (parsed.data.password !== parsed.data.confirmPassword) {
    return {
      errors: { confirmPassword: ['As senhas não coincidem'] },
      prevState: parsed.data,
    }
  }

  console.log('Registration successful with data:', parsed.data)

  return { errors: {} }
}
