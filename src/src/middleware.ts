import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import createIntlMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

// next-intl のロケール処理ミドルウェア
const intlMiddleware = createIntlMiddleware(routing)

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // /members/* はパスワード Cookie で保護
  if (pathname.startsWith('/members')) {
    const cookie = request.cookies.get('members-auth')
    if (cookie?.value !== process.env.MEMBERS_PASSWORD) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    return NextResponse.next()
  }

  // /staff/* は Discord OAuth セッションで保護
  if (pathname.startsWith('/staff')) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    })
    if (!token) {
      return NextResponse.redirect(new URL('/api/auth/signin', request.url))
    }
    return NextResponse.next()
  }

  // それ以外はロケール処理
  return intlMiddleware(request)
}

export const config = {
  matcher: [
    '/members/:path*',
    '/staff/:path*',
    // next-intl が必要なルート（APIとstaticを除く）
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
}
