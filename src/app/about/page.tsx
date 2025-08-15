import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { siteConfig } from '@/lib/config'

export const metadata: Metadata = {
  title: '자기소개 · 연락처',
  description: '편집자P의 편집실 소개 및 연락처 - 블로그 운영자 소개와 연락하는 방법을 안내합니다.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">자기소개 · 연락처</h1>
      
      <div className="space-y-8">
        {/* 운영자 소개 */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                {siteConfig.author.avatar ? (
                  <Image 
                    src={siteConfig.author.avatar} 
                    alt={`${siteConfig.author.name} 프로필`}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                    P
                  </div>
                )}
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">{siteConfig.author.name}</h2>
              <p className="text-gray-700 mb-4">
                {siteConfig.author.bio}
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>📧 {siteConfig.author.email}</span>
                <span>🏢 골든래빗 출판사</span>
              </div>
            </div>
          </div>
        </section>

        <div className="grid md:grid-cols-2 gap-8">
          {/* 이메일 연락 */}
          <section className="bg-white border border-gray-200 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-3">📧</span>
              <h3 className="text-lg font-semibold text-gray-900">이메일 문의</h3>
            </div>
            <p className="text-gray-600 mb-4">
              블로그, 도서 편집, 기술 문의 등 모든 연락사항은 이메일로 문의해 주세요.
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded">
                <span className="font-medium text-gray-900">이메일</span>
                <a 
                  href={`mailto:${siteConfig.author.email}`}
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  {siteConfig.author.email}
                </a>
              </div>
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded">
                <span className="font-medium text-gray-900">응답 시간</span>
                <span className="text-gray-600">1-3 영업일 내</span>
              </div>
            </div>
          </section>

          {/* 소셜 미디어 */}
          <section className="bg-white border border-gray-200 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-3">🌐</span>
              <h3 className="text-lg font-semibold text-gray-900">소셜 미디어</h3>
            </div>
            <p className="text-gray-600 mb-4">
              일상적인 개발 이야기와 최신 소식을 소셜 미디어에서 만나보세요.
            </p>
            <div className="space-y-3">
              {Object.entries(siteConfig.author.social).map(([platform, url]) => (
                <a 
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between bg-gray-50 p-3 rounded hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center">
                    <span className="mr-3">{platform === 'github' ? '🐙' : '🧵'}</span>
                    <span className="font-medium text-gray-900">{platform === 'github' ? 'GitHub' : 'Threads'}</span>
                  </div>
                  <span className="text-blue-600">
                    {platform === 'github' ? '@canine89' : '@limedaddy_8924'} →
                  </span>
                </a>
              ))}
            </div>
          </section>
        </div>


        {/* 블로그 관련 정보 */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">블로그 정보</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">기술 스택</h4>
              <ul className="text-gray-600 space-y-1">
                <li>• Next.js 15.4.4</li>
                <li>• TypeScript</li>
                <li>• Tailwind CSS</li>
                <li>• Vercel 배포</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">정책 준수</h4>
              <ul className="text-gray-600 space-y-1">
                <li>• <Link href="/privacy" className="text-blue-600 hover:text-blue-800 underline">개인정보 처리방침</Link></li>
                <li>• <Link href="/terms" className="text-blue-600 hover:text-blue-800 underline">이용약관</Link></li>
                <li>• <Link href="/disclaimer" className="text-blue-600 hover:text-blue-800 underline">면책조항</Link></li>
                <li>• Google AdSense 정책 준수</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 연락처 푸터 */}
        <section className="text-center pt-8 border-t border-gray-200">
          <p className="text-gray-600 mb-4">
            편집자P의 편집실에 관심과 사랑을 보내주셔서 감사합니다!
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-500">
            <span>🏢 골든래빗 출판사</span>
            <span>📧 {siteConfig.author.email}</span>
            <span>🌐 https://canineblog.vercel.app</span>
          </div>
        </section>
      </div>
    </div>
  )
}