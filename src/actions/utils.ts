export function getPrevState(formData: FormData) {
  return Object.fromEntries(formData.entries()) as Record<
    string,
    string | undefined
  >
}
