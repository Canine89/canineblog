import { siteConfig } from '@/lib/config'
import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="space-y-8 sm:space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">소개</h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
          골든래빗에서 앞으로 30년은 일할 기획자+편집자+저자+삽화가+IT애호가 편집자P입니다.
        </p>
      </div>

      {/* Author Info */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 shadow-lg">
          {/* Avatar and Basic Info */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gray-200 flex items-center justify-center text-2xl sm:text-4xl text-gray-500 overflow-hidden shadow-md">
                {siteConfig.author.avatar && siteConfig.author.avatar !== "/p.jpg" ? (
                  <Image 
                    src={siteConfig.author.avatar} 
                    alt={`${siteConfig.author.name} 프로필`}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>{siteConfig.author.name.charAt(0)}</span>
                )}
              </div>
            </div>
            
            {/* Name and Bio */}
            <div className="text-center md:text-left flex-1">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                {siteConfig.author.name}
              </h2>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base mb-3">
                {siteConfig.author.bio}
              </p>
              {/* Education */}
              <div className="bg-blue-50 rounded-lg p-3 mb-3">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                  <span className="text-sm font-medium text-blue-700">
                    건국대학교 컴퓨터공학과 소프트웨어 공학 전공
                  </span>
                </div>
              </div>
              
              {/* Personal Info */}
              <div className="flex gap-2 mb-3">
                <div className="bg-purple-50 rounded-lg px-3 py-2">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium text-purple-700">
                      AB형
                    </span>
                  </div>
                </div>
                <div className="bg-orange-50 rounded-lg px-3 py-2">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-sm font-medium text-orange-700">
                      ENTP
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact and Social Info */}
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Contact */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                연락처
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                <a href={`mailto:${siteConfig.author.email}`} className="hover:text-blue-600 transition-colors">
                  {siteConfig.author.email}
                </a>
              </p>
            </div>

            {/* Social Links */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                소셜 미디어
              </h3>
              <div className="flex flex-wrap gap-2">
                {Object.entries(siteConfig.author.social).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors"
                  >
                    {platform}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}