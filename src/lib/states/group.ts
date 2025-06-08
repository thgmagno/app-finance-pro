export interface SearchGroupFormState {
  result?: string[]
  prevState?: Record<string, string | undefined>
  errors: {
    name?: string[]
    _form?: string
  }
}
