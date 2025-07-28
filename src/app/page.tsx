import React from 'react'
import { getAllPosts } from '@/lib/markdown'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { siteConfig } from '@/lib/config'
import { HeaderAd, InlineAd, FooterAd } from '@/components/AdSense'
import Link from 'next/link'

export default function Home() {
  const posts = getAllPosts()

  // 구조화된 데이터 (JSON-LD)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": siteConfig.title,
    "description": siteConfig.description,
    "url": siteConfig.site.url,
    "author": {
      "@type": "Person",
      "name": siteConfig.author.name,
      "url": siteConfig.author.social.github
    },
    "publisher": {
      "@type": "Organization",
      "name": siteConfig.title,
      "url": siteConfig.site.url
    },
    "blogPost": posts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "datePublished": post.date,
      "url": `${siteConfig.site.url}/posts/${post.id}`,
      "author": {
        "@type": "Person",
        "name": siteConfig.author.name
      }
    })),
    "inLanguage": "ko-KR"
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* 헤더 광고 */}
      <HeaderAd />

      <div className="max-w-4xl mx-auto">
        {/* Hero Section - Notion 스타일 */}
        <div className="py-16 sm:py-24">
          <div className="text-center space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white tracking-tight">
              {siteConfig.title}
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {siteConfig.description}
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <span>by {siteConfig.author.name}</span>
              <span>•</span>
              <span>{posts.length} posts</span>
            </div>
          </div>
        </div>

        {/* Posts Section - Notion 스타일 */}
        <div className="space-y-12">
          <div className="border-b border-gray-200 dark:border-gray-700 pb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white mb-2">
              최근 포스트
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              최신 글들을 확인해보세요
            </p>
          </div>

          <div className="space-y-8">
            {posts.map((post, index) => (
              <article key={post.id} className="group">
                <Link href={`/posts/${post.id}`} className="block">
                  <div className="space-y-4 p-6 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200 border border-transparent hover:border-gray-200 dark:hover:border-gray-700">
                    <div className="space-y-3">
                      {/* 날짜 */}
                      <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                        <time dateTime={post.date}>
                          {format(new Date(post.date), 'yyyy년 MM월 dd일', { locale: ko })}
                        </time>
                        {post.category && (
                          <>
                            <span>•</span>
                            <span className="capitalize">{post.category}</span>
                          </>
                        )}
                      </div>
                      
                      {/* 제목 */}
                      <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                        {post.title}
                      </h3>
                      
                      {/* 요약 */}
                      <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      {/* 태그 */}
                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-2">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center rounded-md bg-gray-100 dark:bg-gray-700 px-2.5 py-1 text-xs font-medium text-gray-700 dark:text-gray-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
          
          {/* 포스트 사이 광고 (2번째 포스트 후) */}
          {posts.length >= 2 && (
            <div className="py-8">
              <InlineAd />
            </div>
          )}
        </div>

        {/* Stats Section - Notion 스타일 */}
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {posts.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                총 포스트
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {Array.from(new Set(posts.flatMap((post) => post.tags))).length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                태그 수
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                2025년
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                시작 연도
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 푸터 광고 */}
      <FooterAd />
    </>
  )
}
