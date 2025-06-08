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
  method = 'GET',
}: Props): Promise<FethcerResponse> {
  const apiUrl = `${env.API_URL}${url}`

  const { headers: optHeaders, ...restOptionsOriginal } = options ?? {}
  const restOptions = { ...restOptionsOriginal }

  if ((method === 'GET' || method === 'DELETE') && restOptions.body) {
    delete restOptions.body
  }

  if (restOptions.body && typeof restOptions.body !== 'string') {
    restOptions.body = JSON.stringify(restOptions.body)
  }

  const headers = {
    'Content-Type': 'application/json',
    ...optHeaders,
  }

  const fetchOptions: RequestInit = {
    method,
    headers,
    next: { tags },
    ...restOptions,
  }

  const res = await fetch(apiUrl, fetchOptions)

  let json
  try {
    json = await res.json()
  } catch {
    json = null
  }

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
