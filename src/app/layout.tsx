import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { siteConfig } from '@/lib/config'
import Script from 'next/script'
import Link from 'next/link'
import { MobileNav } from '@/components/MobileNav'
import { getCategoriesFromFolders } from '@/lib/markdown'
import { CategoryDropdown } from '@/components/CategoryDropdown'

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
  keywords: ['편집자P', 'IT 도서', '개발', '파이썬', '자바스크립트', '자동화', '골든래빗', '책 리뷰', '개발 팁', '생산성'],
  viewport: 'width=device-width, initial-scale=1',
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
  const categories = getCategoriesFromFolders()
  return (
    <html lang={siteConfig.site.language}>
      <head>
        {/* Google AdSense 코드 - Google 문서에 따라 정확한 구현 */}
        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1531500505272848"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${inter.className} bg-white text-gray-900 antialiased`} suppressHydrationWarning>
        <div className="min-h-screen">
          <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                {/* Logo and Title */}
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Link href="/" className="text-lg sm:text-xl font-bold text-gray-900">
                    📝 {siteConfig.title}
                  </Link>
                  <span className="hidden sm:inline text-sm text-gray-500">
                    by {siteConfig.author.name}
                  </span>
                </div>
                
                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                  <Link href="/" className="text-gray-600 hover:text-gray-900">
                    홈
                  </Link>
                  <CategoryDropdown categories={categories} />
                  <Link href="/tags" className="text-gray-600 hover:text-gray-900">
                    태그
                  </Link>
                  <Link href="/books" className="text-gray-600 hover:text-gray-900">
                    편집한 도서
                  </Link>
                  <Link href="/about" className="text-gray-600 hover:text-gray-900">
                    소개
                  </Link>
                </nav>
                
                {/* Mobile Navigation */}
                <div className="flex items-center space-x-4 md:hidden">
                  <MobileNav categories={categories} />
                </div>
              </div>
            </div>
          </header>
          <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
            {children}
          </main>
          <footer className="border-t border-gray-200 bg-gray-50">
            <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
              <div className="flex flex-col items-center space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
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
                      className="text-gray-400 hover:text-gray-600"
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