import { getAllPosts } from '@/lib/markdown'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { siteConfig } from '@/lib/config'
import { HeaderAd, InlineAd, FooterAd } from '@/components/AdSense'

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

      <div className="space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
            {siteConfig.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {siteConfig.description}
          </p>
        </div>

        {/* Posts Grid */}
        <div className="space-y-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">최근 포스트</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {posts.map((post, index) => (
              <article key={post.id} className="group relative rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm transition-all hover:shadow-md">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <time dateTime={post.date}>
                      {format(new Date(post.date), 'yyyy년 MM월 dd일', { locale: ko })}
                    </time>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    <a href={`/posts/${post.id}`} className="block">
                      {post.title}
                    </a>
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 line-clamp-3">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full bg-gray-100 dark:bg-gray-700 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:text-gray-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
          
          {/* 포스트 사이 광고 (2번째 포스트 후) */}
          {posts.length >= 2 && <InlineAd />}
        </div>

        {/* Stats */}
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{posts.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">총 포스트</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {Array.from(new Set(posts.flatMap((post) => post.tags))).length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">태그 수</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                2025년
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">시작 연도</div>
            </div>
          </div>
        </div>
      </div>

      {/* 푸터 광고 */}
      <FooterAd />
    </>
  )
}
