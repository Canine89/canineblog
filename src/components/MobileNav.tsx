'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { withLocale } from '@/lib/locale-path'
import type { Locale } from '@/i18n/config'

interface Category {
  name: string
  path: string
  description: string
  icon: string
  count: number
}

interface MobileNavProps {
  categories?: Category[]
  isHome?: boolean
  locale: Locale
}

const CAT_COLORS: Record<string, string> = {
  dev: '#E8734A',
  study: '#74A892',
  book: '#C4956A',
  think: '#A3677E',
  'eng-dev': '#4B7BA6',
}

export function MobileNav({
  categories = [],
  isHome = false,
  locale,
}: MobileNavProps) {
  const { t } = useTranslation('common')
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        closeMenu()
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        closeMenu()
        buttonRef.current?.focus()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const homeHref = withLocale(locale, '/')

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        className={`z-50 p-2 transition-colors duration-150 focus:outline-none ${
          isOpen
            ? 'text-white'
            : isHome
              ? 'text-white/70 hover:text-white'
              : 'text-gray-500 hover:text-pantone-ink dark:text-[#9A8E82] dark:hover:text-[#E8E0D6]'
        }`}
        aria-label={isOpen ? t('a11y.closeMenu') : t('a11y.openMenu')}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className="absolute right-0 top-full z-50 mt-2 w-64 border border-pantone-border bg-white shadow-xl dark:border-[#3D3228] dark:bg-[#2E2820]"
          role="menu"
        >
          <div className="h-1.5 bg-pantone-blue" />

          <div className="px-4 pb-1 pt-3">
            <p className="pantone-label">PANTONE</p>
            <p className="text-[10px] text-gray-400 dark:text-[#9A8E82]">{t('nav.navigation')}</p>
          </div>

          <Link
            href={homeHref}
            onClick={closeMenu}
            className="block px-4 py-2.5 text-sm font-medium text-pantone-ink transition-colors hover:bg-pantone-snow dark:text-[#E8E0D6] dark:hover:bg-[#252019]"
            role="menuitem"
          >
            {t('nav.home')}
          </Link>

          {categories.length > 0 && (
            <div className="border-t border-pantone-border dark:border-[#3D3228]">
              <div className="px-4 pb-1 pt-3">
                <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-gray-400 dark:text-[#9A8E82]">
                  {t('nav.categoriesLabel')}
                </p>
              </div>
              {categories.map((category) => {
                const slug = category.path.split('/').pop() || ''
                const color = CAT_COLORS[slug] || '#94A3B8'
                return (
                  <Link
                    key={category.path}
                    href={withLocale(locale, category.path)}
                    onClick={closeMenu}
                    className="flex items-center gap-3 px-4 py-2 transition-colors hover:bg-pantone-snow dark:hover:bg-[#252019]"
                    role="menuitem"
                  >
                    <div className="h-4 w-4 flex-shrink-0" style={{ backgroundColor: color }} />
                    <span className="text-sm text-pantone-ink dark:text-[#E8E0D6]">{category.name}</span>
                    <span className="ml-auto text-[10px] text-gray-400 dark:text-[#9A8E82]">
                      {category.count}
                    </span>
                  </Link>
                )
              })}
            </div>
          )}

          <div className="border-t border-pantone-border dark:border-[#3D3228]">
            <Link
              href={withLocale(locale, '/tags')}
              onClick={closeMenu}
              className="block px-4 py-2.5 text-sm text-pantone-ink transition-colors hover:bg-pantone-snow dark:text-[#E8E0D6] dark:hover:bg-[#252019]"
              role="menuitem"
            >
              {t('nav.tags')}
            </Link>
            <Link
              href={withLocale(locale, '/books')}
              onClick={closeMenu}
              className="block px-4 py-2.5 text-sm text-pantone-ink transition-colors hover:bg-pantone-snow dark:text-[#E8E0D6] dark:hover:bg-[#252019]"
              role="menuitem"
            >
              {t('nav.books')}
            </Link>
          </div>

          <div className="h-1.5 bg-pantone-blue" />
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-x-0 bottom-0 top-16 z-30 bg-black/20"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </div>
  )
}
