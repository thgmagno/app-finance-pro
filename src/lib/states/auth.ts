export interface LoginFormState {
  prevState?: Record<string, string | undefined>
  errors: {
    email?: string[]
    password?: string[]
    _form?: string
  }
}

export interface RegisterFormState {
  prevState?: Record<string, string | undefined>
  errors: {
    name?: string[]
    email?: string[]
    password?: string[]
    confirmPassword?: string[]
    _form?: string
  }
}
