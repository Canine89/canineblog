import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Script from 'next/script'
import Navigation from '@/components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My Blog - Next.js 정적 블로그',
  description: 'Next.js와 구글 애드센스를 활용한 정적 블로그입니다.',
  keywords: ['블로그', 'Next.js', 'React', '구글애드센스'],
  authors: [{ name: '블로그 관리자' }],
  openGraph: {
    title: 'My Blog - Next.js 정적 블로그',
    description: 'Next.js와 구글 애드센스를 활용한 정적 블로그입니다.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        {/* 구글 애드센스 스크립트 */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1531500505272848"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={inter.className}>
        <Navigation />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        
        <footer className="bg-gray-50 border-t">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center text-gray-500">
              <p>&copy; 2024 My Blog. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
