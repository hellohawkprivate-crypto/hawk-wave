import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import createIntlMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

const intlMiddleware = createIntlMiddleware(routing)

// ロケールプレフィックスを除いたパスを取得
function stripLocale(pathname: string): string {
  const locales = routing.locales.join('|')
  return pathname.replace(new RegExp(`^/(${locales})`), '') || '/'
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const pathWithoutLocale = stripLocale(pathname)

  // /members/* はパスワード Cookie で保護
  if (pathWithoutLocale.startsWith('/members')) {
    const cookie = request.cookies.get('members-auth')
    if (cookie?.value !== process.env.MEMBERS_PASSWORD) {
      // ロケールを保持してログインページへリダイレクト
      const locale = pathname.match(/^\/(ja|en|ko|zh-TW|zh-CN|ar)/)?.[1] ?? 'ja'
      return NextResponse.redirect(new URL(`/${locale}/login`, request.url))
    }
    return NextResponse.next()
  }

  // /staff/* は Discord OAuth セッションで保護
  if (pathWithoutLocale.startsWith('/staff')) {
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
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)',],
}
