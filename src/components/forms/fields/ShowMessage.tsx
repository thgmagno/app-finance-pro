type MessageType = 'error' | 'success'

interface ShowMessageProps {
  message?: string | string[]
  type?: MessageType
}

export function ShowMessage({ message, type = 'error' }: ShowMessageProps) {
  if (!message) return null

  const classNameMap: Record<MessageType, string> = {
    error: 'text-sm text-amber-600 px-1',
    success: 'text-sm text-emerald-600 px-1',
  }

  const text = Array.isArray(message) ? message[0] : message

  return <p className={classNameMap[type]}>{text}</p>
}
