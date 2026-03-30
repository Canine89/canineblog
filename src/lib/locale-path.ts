import { defaultLocale, isLocale } from '@/i18n/config'

/** `/ko`, `/ko/posts/foo` 형태로 접두 locale 붙이기 */
export function withLocale(locale: string, path: string): string {
  const loc = isLocale(locale) ? locale : defaultLocale
  if (!path || path === '/') return `/${loc}`
  const p = path.startsWith('/') ? path : `/${path}`
  return `/${loc}${p}`
}

/** pathname에서 locale 제거 → `/posts/foo` 또는 `/` */
export function stripLocale(pathname: string): string {
  const m = pathname.match(/^\/(ko|en)(\/.*)?$/)
  if (!m) return pathname || '/'
  const rest = m[2]
  if (!rest) return '/'
  return rest
}
