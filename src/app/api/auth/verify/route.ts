import { env } from '@/lib/env'
import { fetcher } from '@/lib/fetcher'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const key = searchParams.get('key')
  if (!key) redirect('/error')

  const res = await fetcher({ url: `/auth/verify?key=${key}` })
  if (res.error) redirect('/error')

  const { token } = res.data as { token: string }
  const cookieStore = await cookies()
  cookieStore.set(env.SESSION_KEY, token)

  redirect('/')
}
