export interface LoginFormState {
  prevState?: Record<string, string | undefined>
  response?: string
  errors: {
    email?: string[]
    password?: string[]
    _form?: string
  }
}

export interface RegisterFormState {
  prevState?: Record<string, string | undefined>
  response?: string
  errors: {
    name?: string[]
    email?: string[]
    password?: string[]
    confirmPassword?: string[]
    _form?: string
  }
}
