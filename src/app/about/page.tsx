import React from 'react'
import { siteConfig } from '@/lib/config'
import { FooterAd } from '@/components/AdSense'

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="py-16 sm:py-24">
        <div className="text-center space-y-6">
          <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-4xl text-white font-bold">
            {siteConfig.author.name.charAt(0)}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
            {siteConfig.author.name}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {siteConfig.author.bio}
          </p>
        </div>
      </div>

      {/* 상세 정보 */}
      <div className="space-y-12">
        {/* 경력 및 활동 */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-4">
            경력 및 활동
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">📚 IT 도서 편집</h3>
              <p className="text-gray-600 dark:text-gray-300">
                개발이 취미인 컴공과 출신 IT 도서 기획/편집자로 활동하고 있습니다. 
                복잡한 기술을 쉽게 이해할 수 있도록 도서를 기획하고 편집합니다.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">💻 개발 활동</h3>
              <p className="text-gray-600 dark:text-gray-300">
                사내에서 사용하는 각종 자동화 앱을 파이썬, 자바스크립트로 개발하여 
                적극 활용하고 있습니다. 개발을 통해 업무 효율을 높이는 것을 좋아합니다.
              </p>
            </div>
          </div>
        </section>

        {/* 기술 스택 */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-4">
            기술 스택
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">프로그래밍 언어</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs rounded">Python</span>
                <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 text-xs rounded">JavaScript</span>
                <span className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-xs rounded">TypeScript</span>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">프레임워크</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs rounded">React</span>
                <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 text-xs rounded">Next.js</span>
                <span className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-xs rounded">Node.js</span>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">도구</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded">Git</span>
                <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 text-xs rounded">Docker</span>
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs rounded">Vercel</span>
              </div>
            </div>
          </div>
        </section>

        {/* 소셜 링크 */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-4">
            소셜 링크
          </h2>
          <div className="flex flex-wrap gap-4">
            <a
              href={siteConfig.author.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>GitHub</span>
            </a>
            <a
              href={siteConfig.author.social.threads}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.186 24h-7.349c-.732 0-1.325-.593-1.325-1.325V1.325C3.512.593 4.105 0 4.837 0h7.349c.732 0 1.325.593 1.325 1.325v21.35c0 .732-.593 1.325-1.325 1.325zM12.186 1.325H4.837v21.35h7.349V1.325z"/>
                <path d="M15.674 24h-7.349c-.732 0-1.325-.593-1.325-1.325V1.325C8.325.593 8.918 0 9.65 0h7.349c.732 0 1.325.593 1.325 1.325v21.35c0 .732-.593 1.325-1.325 1.325zM15.674 1.325H9.65v21.35h6.024V1.325z"/>
              </svg>
              <span>Threads</span>
            </a>
          </div>
        </section>

        {/* 연락처 */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-4">
            연락처
          </h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-gray-600 dark:text-gray-300">{siteConfig.author.email}</span>
            </div>
          </div>
        </section>
      </div>

      {/* 푸터 광고 */}
      <FooterAd />
    </div>
  )
} 