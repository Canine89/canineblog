import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { siteConfig } from '@/lib/config'
import Script from 'next/script'
import { headers } from 'next/headers'
import { defaultLocale } from '@/i18n/config'
import { ViewTransitionsProvider } from '@/components/ViewTransitionsProvider'

const inter = Inter({ subsets: ['latin'] })

declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.author.name }],
  creator: siteConfig.author.name,
  publisher: siteConfig.author.name,
  keywords: [
    '편집자P',
    'IT 도서',
    '개발',
    '파이썬',
    '자바스크립트',
    '자동화',
    '골든래빗',
    '책 리뷰',
    '개발 팁',
    '생산성',
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: siteConfig.site.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    images: [
      {
        url: `${siteConfig.site.url}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.site.url}/og-image.jpg`],
    creator: '@limedaddy_8924',
  },
  alternates: {
    canonical: siteConfig.site.url,
  },
  other: {
    'theme-color': '#000000',
    'color-scheme': 'light dark',
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    other: [
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const h = await headers()
  const lang = h.get('x-locale') ?? defaultLocale

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.google?.analyticsId || 'G-XXXXXXXXXX'}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('consent', 'default', {
              ad_storage: 'denied',
              analytics_storage: 'denied'
            });
            gtag('config', '${siteConfig.google?.analyticsId || 'G-XXXXXXXXXX'}');
          `}
        </Script>
      </head>
      <body
        className={`${inter.className} bg-pantone-snow text-pantone-ink dark:bg-[#1A1410] dark:text-[#E8E0D6] antialiased transition-colors duration-300`}
        suppressHydrationWarning
      >
        <ViewTransitionsProvider>{children}</ViewTransitionsProvider>
      </body>
    </html>
  )
}
