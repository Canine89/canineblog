import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { siteConfig } from '@/lib/config'
import Script from 'next/script'
import Link from 'next/link'
import { getCategoriesFromFolders } from '@/lib/markdown'
import { OrganizationStructuredData } from '@/components/StructuredData'
import { Header } from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

// AdSense 타입 선언 - 2025 정책 준수 (간소화)
declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}

// Viewport configuration (Next.js 15 requirement)
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

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
        {/* Google Analytics */}
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
      <body className={`${inter.className} bg-white text-pantone-ink antialiased`} suppressHydrationWarning>
        {/* Structured Data — body에 배치하여 AdSense 스크립트와의 hydration 충돌 방지 */}
        <OrganizationStructuredData />
        
        {/* 
          Google AdSense 자동광고 - 2025 정책 준수 구현
          
          ✅ 정책 준수 사항:
          - 단일 스크립트로 자동광고 활성화 (enable_page_level_ads 불필요)
          - 페이지당 단 하나의 AdSense 스크립트만 사용
          - Google AI가 최적 위치에 광고 자동 배치
          - 코드 수정 금지 원칙 준수
          - data-nscript 속성 오류 해결 (beforeInteractive 사용)
        */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1531500505272848"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
        <div className="min-h-screen flex flex-col">
          <Header categories={categories} />

          <main className="flex-1 mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
            {children}
          </main>

          <footer className="border-t border-pantone-border bg-pantone-snow">
            <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
              <div className="flex flex-col items-center gap-5">
                <div className="flex flex-wrap justify-center gap-6 text-xs tracking-widest uppercase text-gray-400">
                  <Link href="/privacy" className="hover:text-pantone-ink transition-colors">
                    개인정보 처리방침
                  </Link>
                  <Link href="/terms" className="hover:text-pantone-ink transition-colors">
                    이용약관
                  </Link>
                  <Link href="/disclaimer" className="hover:text-pantone-ink transition-colors">
                    면책조항
                  </Link>
                </div>
                
                <p className="text-xs text-gray-400">
                  © 2025 {siteConfig.author.name}. Next.js로 제작되었습니다.
                </p>
                
                <div className="flex gap-4">
                  {Object.entries(siteConfig.author.social).map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-gray-400 hover:text-pantone-blue transition-colors uppercase tracking-wider"
                    >
                      {platform}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="h-1.5 bg-pantone-blue" />
          </footer>
        </div>
        
      </body>
    </html>
  )
}