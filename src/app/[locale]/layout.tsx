import { notFound } from 'next/navigation'
import Script from 'next/script'
import Link from 'next/link'
import { getCategoriesFromFolders } from '@/lib/markdown'
import { OrganizationStructuredData } from '@/components/StructuredData'
import { Header } from '@/components/Header'
import { ThemeProvider } from '@/components/ThemeProvider'
import { I18nProvider } from '@/components/I18nProvider'
import { getServerT } from '@/i18n/server'
import { withLocale } from '@/lib/locale-path'
import { siteConfig } from '@/lib/config'
import { isLocale, locales, type Locale } from '@/i18n/config'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw as Locale

  const categories = getCategoriesFromFolders()
  const t = await getServerT(locale)

  return (
    <I18nProvider locale={locale}>
      <ThemeProvider>
        <OrganizationStructuredData />

        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1531500505272848"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />

        <div className="flex min-h-screen flex-col">
          <Header categories={categories} locale={locale} />

          <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
            {children}
          </main>

          <footer className="border-t border-pantone-border bg-pantone-snow dark:border-[#3D3228] dark:bg-[#1A1410]">
            <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
              <div className="flex flex-col items-center gap-5">
                <div className="flex flex-wrap justify-center gap-6 text-xs tracking-widest text-gray-400 uppercase dark:text-[#9A8E82]">
                  <Link
                    href={withLocale(locale, '/privacy')}
                    className="transition-colors hover:text-pantone-ink dark:hover:text-[#E8E0D6]"
                  >
                    {t('footer.privacy')}
                  </Link>
                  <Link
                    href={withLocale(locale, '/terms')}
                    className="transition-colors hover:text-pantone-ink dark:hover:text-[#E8E0D6]"
                  >
                    {t('footer.terms')}
                  </Link>
                  <Link
                    href={withLocale(locale, '/disclaimer')}
                    className="transition-colors hover:text-pantone-ink dark:hover:text-[#E8E0D6]"
                  >
                    {t('footer.disclaimer')}
                  </Link>
                </div>

                <p className="text-xs text-gray-400 dark:text-[#9A8E82]">
                  {t('footer.copyright', {
                    year: 2025,
                    name: siteConfig.author.name,
                    madeWith: t('footer.madeWith'),
                  })}
                </p>

                <div className="flex gap-4">
                  {Object.entries(siteConfig.author.social).map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1 text-xs tracking-wider text-gray-400 uppercase transition-colors hover:text-pantone-blue dark:text-[#9A8E82]"
                    >
                      <span>{platform}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-3 w-3 motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-out motion-safe:group-hover:translate-x-0.5"
                        aria-hidden
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="h-1.5 bg-pantone-blue" />
          </footer>
        </div>
      </ThemeProvider>
    </I18nProvider>
  )
}
