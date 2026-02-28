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
    <div className="space-y-10">
      {/* Pantone-style header */}
      <section className="border border-pantone-border overflow-hidden">
        <div className="bg-pantone-ink h-24 sm:h-32 flex items-center justify-center">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wider uppercase">
            About
          </h1>
        </div>
        <div className="bg-white px-6 py-4 space-y-1">
          <p className="pantone-label">PANTONE</p>
          <p className="text-sm font-medium text-gray-500">19-4305 TCX · Ink Black</p>
          <p className="text-sm text-gray-500">{siteConfig.author.name}를 소개합니다.</p>
        </div>
      </section>

      {/* Profile */}
      <section className="pantone-section">
        <div className="section-swatch h-3 bg-pantone-blue" />
        <div className="section-body">
          <div className="flex items-start gap-5">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 overflow-hidden bg-pantone-blue flex items-center justify-center">
                {siteConfig.author.avatar ? (
                  <Image 
                    src={siteConfig.author.avatar} 
                    alt={`${siteConfig.author.name} 프로필`}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-white text-2xl font-bold">P</span>
                )}
              </div>
            </div>
            <div className="flex-1 space-y-2">
              <h2 className="text-xl font-extrabold text-pantone-ink">{siteConfig.author.name}</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{siteConfig.author.bio}</p>
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <span>{siteConfig.author.email}</span>
                <span>골든래빗 출판사</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Email */}
        <section className="pantone-section">
          <div className="section-swatch h-14 bg-pantone-blue flex items-center justify-center">
            <span className="text-sm font-bold text-white tracking-widest uppercase">Email</span>
          </div>
          <div className="section-body">
            <p className="pantone-label">PANTONE</p>
            <p className="text-xs text-gray-500 mb-3">Contact · Email</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between bg-pantone-snow p-3">
                <span className="text-xs font-medium text-pantone-ink">이메일</span>
                <a href={`mailto:${siteConfig.author.email}`} className="text-xs text-pantone-blue hover:underline">
                  {siteConfig.author.email}
                </a>
              </div>
              <div className="flex items-center justify-between bg-pantone-snow p-3">
                <span className="text-xs font-medium text-pantone-ink">응답 시간</span>
                <span className="text-xs text-gray-500">1-3 영업일 내</span>
              </div>
            </div>
          </div>
        </section>

        {/* Social */}
        <section className="pantone-section">
          <div className="section-swatch h-14 bg-pantone-slate flex items-center justify-center">
            <span className="text-sm font-bold text-white tracking-widest uppercase">Social</span>
          </div>
          <div className="section-body">
            <p className="pantone-label">PANTONE</p>
            <p className="text-xs text-gray-500 mb-3">Contact · Social Media</p>
            <div className="space-y-2">
              {Object.entries(siteConfig.author.social).map(([platform, url]) => (
                <a 
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between bg-pantone-snow p-3 hover:bg-pantone-mist transition-colors"
                >
                  <span className="text-xs font-medium text-pantone-ink uppercase">{platform}</span>
                  <span className="text-xs text-pantone-blue">
                    {platform === 'github' ? '@canine89' : '@limedaddy_8924'} →
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Blog info */}
      <section className="pantone-section">
        <div className="section-swatch h-3 bg-pantone-blue" />
        <div className="section-body">
          <p className="pantone-label">PANTONE</p>
          <h3 className="text-sm font-bold text-pantone-ink">블로그 정보</h3>
          <div className="grid md:grid-cols-2 gap-6 mt-2 text-xs">
            <div>
              <h4 className="font-semibold text-pantone-ink mb-2 uppercase tracking-wider">Tech Stack</h4>
              <ul className="text-gray-500 space-y-1">
                <li>Next.js 15.4.4</li>
                <li>TypeScript</li>
                <li>Tailwind CSS</li>
                <li>Vercel 배포</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-pantone-ink mb-2 uppercase tracking-wider">Compliance</h4>
              <ul className="text-gray-500 space-y-1">
                <li><Link href="/privacy" className="text-pantone-blue hover:underline">개인정보 처리방침</Link></li>
                <li><Link href="/terms" className="text-pantone-blue hover:underline">이용약관</Link></li>
                <li><Link href="/disclaimer" className="text-pantone-blue hover:underline">면책조항</Link></li>
                <li>Google AdSense 정책 준수</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="text-center pt-6 border-t border-pantone-border">
        <p className="text-sm text-gray-500 mb-3">
          편집자P의 편집실에 관심을 보내주셔서 감사합니다.
        </p>
        <div className="flex justify-center gap-6 text-[10px] text-gray-400 uppercase tracking-widest">
          <span>골든래빗 출판사</span>
          <span>{siteConfig.author.email}</span>
        </div>
      </section>
    </div>
  )
}
