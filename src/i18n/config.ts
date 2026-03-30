export const locales = ['ko', 'en'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'ko'

export function isLocale(s: string): s is Locale {
  return locales.includes(s as Locale)
}
