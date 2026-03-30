'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { stripLocale, withLocale } from '@/lib/locale-path'
import type { Locale } from '@/i18n/config'

export function LocaleSwitcher({
  locale,
  variant = 'default',
}: {
  locale: Locale
  variant?: 'default' | 'coral'
}) {
  const { t } = useTranslation('common')
  const pathname = usePathname()
  const pathWithoutLocale = stripLocale(pathname || '/')
  const koHref = withLocale('ko', pathWithoutLocale)
  const enHref = withLocale('en', pathWithoutLocale)

  const isCoral = variant === 'coral'
  const active = isCoral
    ? 'text-white font-semibold underline underline-offset-2'
    : 'font-semibold text-pantone-ink dark:text-[#E8E0D6]'
  const inactive = isCoral
    ? 'text-white/70 hover:text-white'
    : 'text-gray-500 dark:text-[#9A8E82] hover:text-pantone-ink dark:hover:text-[#E8E0D6]'

  return (
    <div className="flex items-center gap-1.5 text-xs" role="navigation" aria-label={t('locale.switch')}>
      <Link
        href={koHref}
        hrefLang="ko"
        lang="ko"
        className={`rounded px-1.5 py-0.5 font-medium transition-colors ${locale === 'ko' ? active : inactive}`}
      >
        KO
      </Link>
      <span className={isCoral ? 'text-white/40' : 'opacity-40'}>|</span>
      <Link
        href={enHref}
        hrefLang="en"
        lang="en"
        className={`rounded px-1.5 py-0.5 font-medium transition-colors ${locale === 'en' ? active : inactive}`}
      >
        EN
      </Link>
    </div>
  )
}
