import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { env } from './lib/env'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/auth') ||
    pathname === '/favicon.ico' ||
    pathname === '/robots.txt'
  ) {
    return NextResponse.next()
  }

  const token = request.cookies.get(env.SESSION_KEY)

  if (!token) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth'
    return NextResponse.redirect(url)
  }

  NextResponse.next()
}

export const config = { matcher: '/:path*' }
