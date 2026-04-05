'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { siteConfig } from '@/lib/config'
import { CategoryDropdown } from '@/components/CategoryDropdown'
import { MobileNav } from '@/components/MobileNav'
import { ThemeToggle } from '@/components/ThemeToggle'
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

const HERO_HEIGHT = 320

export function Header({
  categories,
  locale,
}: {
  categories: Category[]
  locale: Locale
}) {
  const { t } = useTranslation('common')
  const pathname = usePathname()
  const homePath = withLocale(locale, '/')
  const isHomePage =
    pathname === homePath || pathname === `${homePath}/` || pathname === `/${locale}`

  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (!isHomePage) return

    const onScroll = () => setScrolled(window.scrollY > HERO_HEIGHT)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHomePage])

  const coral = isHomePage && !scrolled

  return (
    <header
      suppressHydrationWarning
      className={`sticky top-0 z-50 transition-all duration-300 motion-reduce:transition-colors ${
        coral
          ? 'bg-pantone-blue'
          : 'border-b border-pantone-border bg-pantone-snow/95 backdrop-blur-sm dark:border-[#3D3228] dark:bg-[#1A1410]/95'
      }`}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div
          suppressHydrationWarning
          className={`flex items-center justify-between ${coral ? 'h-14' : 'h-16'}`}
        >
          <div className="flex items-center gap-3">
            <Link
              href={homePath}
              suppressHydrationWarning
              className={`text-lg font-extrabold tracking-tight transition-colors sm:text-xl ${
                coral
                  ? 'text-white hover:text-white/80'
                  : 'text-pantone-ink hover:text-pantone-blue dark:text-[#E8E0D6]'
              }`}
            >
              {t('site.title')}
            </Link>
            <span
              suppressHydrationWarning
              className={`hidden text-xs uppercase tracking-widest transition-colors sm:inline ${
                coral ? 'text-white/40' : 'text-gray-400 dark:text-[#9A8E82]'
              }`}
            >
              {t('site.byAuthor', { name: siteConfig.author.name })}
            </span>
          </div>

          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href={homePath}
              className={`text-sm font-medium transition-colors ${
                coral
                  ? 'text-white/70 hover:text-white'
                  : 'text-gray-500 hover:text-pantone-ink dark:text-[#9A8E82] dark:hover:text-[#E8E0D6]'
              }`}
            >
              {t('nav.home')}
            </Link>
            <CategoryDropdown categories={categories} isHome={coral} locale={locale} />
            <Link
              href={withLocale(locale, '/tags')}
              className={`text-sm font-medium transition-colors ${
                coral
                  ? 'text-white/70 hover:text-white'
                  : 'text-gray-500 hover:text-pantone-ink dark:text-[#9A8E82] dark:hover:text-[#E8E0D6]'
              }`}
            >
              {t('nav.tags')}
            </Link>
            <Link
              href={withLocale(locale, '/books')}
              className={`text-sm font-medium transition-colors ${
                coral
                  ? 'text-white/70 hover:text-white'
                  : 'text-gray-500 hover:text-pantone-ink dark:text-[#9A8E82] dark:hover:text-[#E8E0D6]'
              }`}
            >
              {t('nav.books')}
            </Link>
            <Link
              href={withLocale(locale, '/about')}
              className={`text-sm font-medium transition-colors ${
                coral
                  ? 'text-white/70 hover:text-white'
                  : 'text-gray-500 hover:text-pantone-ink dark:text-[#9A8E82] dark:hover:text-[#E8E0D6]'
              }`}
            >
              {t('nav.about')}
            </Link>
            <LocaleSwitcher locale={locale} variant={coral ? 'coral' : 'default'} />
            <ThemeToggle
              className={coral ? 'text-white/70' : 'text-gray-500 dark:text-[#9A8E82]'}
            />
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <LocaleSwitcher locale={locale} variant={coral ? 'coral' : 'default'} />
            <ThemeToggle
              className={coral ? 'text-white/70' : 'text-gray-500 dark:text-[#9A8E82]'}
            />
            <MobileNav categories={categories} isHome={coral} locale={locale} />
          </div>
        </div>
      </div>
    </header>
  )
}
