import { createInstance } from 'i18next'
import koCommon from '@/locales/ko/common.json'
import enCommon from '@/locales/en/common.json'
import type { Locale } from '@/i18n/config'
import { defaultLocale } from '@/i18n/config'

const resources = {
  ko: { common: koCommon },
  en: { common: enCommon },
} as const

export async function getServerT(locale: string) {
  const lng: Locale = locale === 'en' ? 'en' : defaultLocale
  const i18n = createInstance()
  await i18n.init({
    lng,
    fallbackLng: defaultLocale,
    resources: {
      ko: resources.ko,
      en: resources.en,
    },
    defaultNS: 'common',
    ns: ['common'],
    interpolation: { escapeValue: false },
  })
  return i18n.getFixedT(lng, 'common')
}
