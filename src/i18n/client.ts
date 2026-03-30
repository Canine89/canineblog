'use client'

import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import koCommon from '@/locales/ko/common.json'
import enCommon from '@/locales/en/common.json'
import { defaultLocale } from '@/i18n/config'

const resources = {
  ko: { common: koCommon },
  en: { common: enCommon },
}

if (!i18next.isInitialized) {
  void i18next.use(initReactI18next).init({
    lng: defaultLocale,
    fallbackLng: defaultLocale,
    resources,
    defaultNS: 'common',
    ns: ['common'],
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  })
}

export default i18next
