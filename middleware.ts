import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { defaultLocale, locales } from '@/i18n/config'

const LOCALE_HEADER = 'x-locale'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon') ||
    pathname === '/manifest.json' ||
    pathname === '/robots.txt'
  ) {
    return NextResponse.next()
  }

  if (pathname.includes('.') && pathname !== '/') {
    const last = pathname.split('/').pop() ?? ''
    if (last.includes('.')) {
      return NextResponse.next()
    }
  }

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  )

  if (hasLocale) {
    const locale = pathname.split('/')[1] ?? defaultLocale
    const res = NextResponse.next()
    res.headers.set(LOCALE_HEADER, locale)
    return res
  }

  const url = request.nextUrl.clone()
  url.pathname =
    pathname === '/' ? `/${defaultLocale}` : `/${defaultLocale}${pathname}`
  return NextResponse.redirect(url)
}

// 루트 `/` 는 단일 패턴만 쓰면 Edge에서 빠지는 사례가 있어 `'/` 를 명시한다.
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|_next/webpack-hmr).*)',
    '/',
  ],
}
