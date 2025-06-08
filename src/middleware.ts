import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { env } from './lib/env'
import { actions } from './actions'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get(env.SESSION_KEY)

  const ignoredRoutes = [
    '/error',
    '/_next',
    '/api',
    '/favicon.ico',
    '/robots.txt',
  ]
  if (ignoredRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  const publicRoutes = ['/auth', '/error']
  const isValidToken = await actions.auth.verifyToken(token?.value)

  if (isValidToken && publicRoutes.includes(pathname)) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  if (!isValidToken && !publicRoutes.includes(pathname)) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = { matcher: '/:path*' }
