'use client'

import { useEffect } from 'react'
import { I18nextProvider } from 'react-i18next'
import i18next from '@/i18n/client'
import type { Locale } from '@/i18n/config'

export function I18nProvider({
  locale,
  children,
}: {
  locale: Locale
  children: React.ReactNode
}) {
  useEffect(() => {
    void i18next.changeLanguage(locale)
  }, [locale])

  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>
}
