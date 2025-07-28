import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { siteConfig } from '@/lib/config'
import { ThemeToggle } from '@/components/ThemeToggle'
import Script from 'next/script'
import Link from 'next/link'
import { MobileNav } from '@/components/MobileNav'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.author.name }],
  creator: siteConfig.author.name,
  publisher: siteConfig.author.name,
  keywords: ['블로그', '개발', 'IT', '마크다운', 'Next.js'],
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
    // Google AdSense 검증을 위한 메타 태그 (구글에서 제공하는 코드로 교체)
    // 'google-site-verification': 'your-verification-code',
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang={siteConfig.site.language}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="light dark" />
        <meta name="google-adsense-account" content="ca-pub-1531500505272848" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${inter.className} bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 antialiased`} suppressHydrationWarning>
        {/* Google AdSense 스크립트 */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1531500505272848"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        
        {/* Google AdSense 자동 광고 */}
        <Script
          id="adsense-auto-ads"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (adsbygoogle = window.adsbygoogle || []).push({
                google_ad_client: "ca-pub-1531500505272848",
                enable_page_level_ads: true
              });
            `
          }}
        />
        
        <div className="min-h-screen">
          <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                {/* Logo and Title */}
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Link href="/" className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                    📝 {siteConfig.title}
                  </Link>
                  <span className="hidden sm:inline text-sm text-gray-500 dark:text-gray-400">
                    by {siteConfig.author.name}
                  </span>
                </div>
                
                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                  <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                    홈
                  </Link>
                  <Link href="/tags" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                    태그
                  </Link>
                  <Link href="/books" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                    편집한 도서
                  </Link>
                  <Link href="/about" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                    소개
                  </Link>
                  <ThemeToggle />
                </nav>
                
                {/* Mobile Navigation */}
                <div className="flex items-center space-x-4 md:hidden">
                  <ThemeToggle />
                  <MobileNav />
                </div>
              </div>
            </div>
          </header>
          <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
            {children}
          </main>
          <footer className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
              <div className="flex flex-col items-center space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    © 2025 {siteConfig.author.name}. Next.js로 제작되었습니다.
                  </span>
                </div>
                <div className="flex space-x-4">
                  {Object.entries(siteConfig.author.social).map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      {platform}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
