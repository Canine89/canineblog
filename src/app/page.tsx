import { redirect } from 'next/navigation'
import { defaultLocale } from '@/i18n/config'

/** `/` 전용 — 미들웨어가 루트를 놓치는 환경(Vercel 등)에서도 404 방지 */
export default function RootPage() {
  redirect(`/${defaultLocale}`)
}
