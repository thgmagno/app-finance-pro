export function ShowError({
  errorMessage,
}: {
  errorMessage?: string | string[]
}) {
  const className = 'text-sm text-amber-600 px-1'
  if (!errorMessage) return null
  if (Array.isArray(errorMessage)) {
    return <p className={className}>{errorMessage[0]}.</p>
  }
  return <p className={className}>{errorMessage}.</p>
}
