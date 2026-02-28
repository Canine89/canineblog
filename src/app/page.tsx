import Link from 'next/link'
import { getAllPosts } from '@/lib/markdown'
import { siteConfig } from '@/lib/config'
import { ChipReveal } from '@/components/ChipReveal'
import { ScrollFade } from '@/components/ScrollFade'

const CATEGORY_PANTONE: Record<string, { color: string; code: string }> = {
  dev:      { color: '#D97757', code: '16-1441 TCX' },
  study:    { color: '#6B8F71', code: '16-5917 TCX' },
  book:     { color: '#C2956B', code: '16-1432 TCX' },
  think:    { color: '#8B5E6B', code: '17-1608 TCX' },
  'eng-dev': { color: '#5E7FA3', code: '17-4020 TCX' },
}

export default function HomePage() {
  const posts = getAllPosts()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, siteConfig.blog.postsPerPage)

  return (
    <div className="space-y-12">
      {/* Hero — Header와 합쳐진 Signature Pantone Brand Card */}
      <section className="-mt-10 -mx-4 sm:-mx-6 lg:-mx-8 overflow-hidden chip-hero-enter">
        {/* Swatch — 헤더와 이어지는 코럴 영역 */}
        <div
          className="flex flex-col justify-between px-8 sm:px-10 min-h-[200px] sm:min-h-[260px]"
          style={{ backgroundColor: '#D97757' }}
        >
          {/* Blog title — 스크롤 시 페이드아웃 */}
          <ScrollFade className="flex-1 flex items-center justify-center px-6" distance={100}>
            <h1
              className="text-3xl sm:text-5xl font-black tracking-tight text-center leading-tight"
              style={{ color: '#FFFFFF' }}
            >
              {siteConfig.title}
            </h1>
          </ScrollFade>

          {/* 컬러 코드 — 우하단 */}
          <div className="flex justify-end pb-5 pr-2">
            <div className="text-right">
              <p className="text-[8px] sm:text-[9px] font-semibold tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.45)' }}>PANTONE</p>
              <p className="text-[11px] sm:text-[13px] font-medium" style={{ color: 'rgba(255,255,255,0.65)' }}>16-1441 TCX</p>
            </div>
          </div>
        </div>

        {/* Info strip — 슬로건 */}
        <div className="bg-white border-b border-pantone-border px-8 sm:px-10 py-4 sm:py-5 flex items-center justify-between">
          <p className="text-base sm:text-lg font-extrabold text-pantone-ink tracking-tight">
            {siteConfig.description}
          </p>
          <p className="text-[10px] text-gray-400 tracking-widest uppercase flex-shrink-0 ml-4">
            by {siteConfig.author.name}
          </p>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="space-y-6">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xs font-semibold text-gray-400 tracking-[0.2em] uppercase">
            Latest Posts
          </h2>
          <span className="text-xs text-gray-300 tracking-widest">
            {posts.length} articles
          </span>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => {
            const cat = post.category || 'dev'
            const pantone = CATEGORY_PANTONE[cat] || CATEGORY_PANTONE.dev
            return (
              <ChipReveal key={post.id} index={i}>
                <article>
                  <Link href={`/posts/${post.id}`} className="block pantone-chip h-full">
                    <div
                      className="chip-swatch h-32 sm:h-36 relative"
                      style={{ backgroundColor: pantone.color }}
                    >
                      <div className="absolute bottom-0 right-0 px-3 py-2 text-right">
                        <p className="text-[7px] font-semibold text-white/50 tracking-[0.15em]">PANTONE</p>
                        <p className="text-[10px] font-medium text-white/70">{pantone.code}</p>
                        <p className="text-[9px] text-white/50">{cat}</p>
                      </div>
                    </div>
                    <div className="chip-info flex-1">
                      <h3 className="text-[15px] font-bold text-pantone-ink leading-snug line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-xs text-gray-500 leading-relaxed mt-1 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="mt-auto pt-3 flex items-center justify-between">
                        <time className="text-[10px] text-gray-400">
                          {new Date(post.date).toLocaleDateString('ko-KR')}
                        </time>
                        {post.tags && post.tags.length > 0 && (
                          <span className="text-[10px] text-gray-400">
                            #{post.tags[0]}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </article>
              </ChipReveal>
            )
          })}
        </div>
      </section>

      {/* View All */}
      {posts.length >= siteConfig.blog.postsPerPage && (
        <div className="text-center pt-4">
          <ChipReveal index={0}>
            <Link
              href="/posts"
              className="inline-flex items-center px-8 py-3 bg-pantone-blue text-white text-sm font-semibold tracking-wider uppercase hover:bg-[#B8603F] transition-colors"
            >
              모든 포스트 보기
            </Link>
          </ChipReveal>
        </div>
      )}
    </div>
  )
}
