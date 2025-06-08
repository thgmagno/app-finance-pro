import { env } from './env'

interface Props {
  url: string
  options?: RequestInit
  tags?: string[]
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
}

interface FethcerResponse {
  error: boolean
  message: string
  data?: unknown
}

export async function fetcher({
  url,
  options,
  tags,
  method,
}: Props): Promise<FethcerResponse> {
  const apiUrl = `${env.API_URL}${url}`
  const res = await fetch(apiUrl, {
    headers: { 'Content-Type': 'application/json' },
    method,
    next: { tags },
    ...options,
  })

  const json = await res.json()

  if (!res.ok) {
    return {
      error: true,
      message: json.message ?? 'Erro ao processar requisição.',
    }
  }

  const contentType = res.headers.get('content-type')
  if (contentType && contentType.includes('application/json')) {
    return { error: false, message: json.message, data: json.data }
  }

  return { error: false, message: await res.text() }
}
