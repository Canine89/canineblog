'use client'

import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { MobileNav } from '@/components/MobileNav'
import { LocaleSwitcher } from '@/components/LocaleSwitcher'
import { withLocale } from '@/lib/locale-path'
import type { Locale } from '@/i18n/config'

interface Category {
  name: string
  path: string
  description: string
  icon: string
  count: number
}

export function Header({
  categories,
  locale,
}: {
  categories: Category[]
  locale: Locale
}) {
  const { t } = useTranslation('common')
  const homePath = withLocale(locale, '/')

  return (
    <header
      suppressHydrationWarning
      className="liquid-chrome sticky top-0 z-50 border-b border-white/18 text-white shadow-[0_12px_36px_rgba(0,0,0,0.24)]"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div
          suppressHydrationWarning
          className="flex h-16 items-center justify-end"
        >
          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href={homePath}
              className="text-sm font-medium text-white/78 drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)] transition-colors hover:text-white"
            >
              {t('nav.home')}
            </Link>
            <Link
              href={withLocale(locale, '/books')}
              className="text-sm font-medium text-white/78 drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)] transition-colors hover:text-white"
            >
              {t('nav.books')}
            </Link>
            <LocaleSwitcher locale={locale} variant="coral" />
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <LocaleSwitcher locale={locale} variant="coral" />
            <MobileNav categories={categories} isHome locale={locale} />
          </div>
        </div>
      </div>
    </header>
  )
}
