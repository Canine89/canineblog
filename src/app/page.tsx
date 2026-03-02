import { getAllPosts } from '@/lib/markdown'
import { siteConfig } from '@/lib/config'
import { ScrollFade } from '@/components/ScrollFade'
import { PostGrid } from '@/components/PostGrid'

export default function HomePage() {
  const posts = getAllPosts()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="space-y-12">
      {/* Hero — Header와 합쳐진 Signature Pantone Brand Card */}
      <section className="-mt-10 -mx-4 sm:-mx-6 lg:-mx-8 overflow-hidden chip-hero-enter">
        {/* Swatch — 헤더와 이어지는 코럴 영역 */}
        <div
          className="flex flex-col justify-between px-8 sm:px-10 min-h-[200px] sm:min-h-[260px]"
          style={{ backgroundColor: '#E8734A' }}
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
              <p className="text-[11px] sm:text-[13px] font-medium" style={{ color: 'rgba(255,255,255,0.65)' }}>16-1362 TCX</p>
            </div>
          </div>
        </div>

        {/* Info strip — 슬로건 */}
        <div className="hero-info-strip bg-white border-b border-pantone-border px-8 sm:px-10 py-4 sm:py-5 flex items-center justify-between">
          <p className="text-base sm:text-lg font-extrabold text-pantone-ink tracking-tight">
            {siteConfig.description}
          </p>
          <p className="text-[10px] text-gray-400 tracking-widest uppercase flex-shrink-0 ml-4">
            by {siteConfig.author.name}
          </p>
        </div>
      </section>

      {/* Posts — 무한 스크롤 */}
      <section className="space-y-6">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xs font-semibold text-gray-400 dark:text-[#9A8E82] tracking-[0.2em] uppercase">
            All Posts
          </h2>
          <span className="text-xs text-gray-300 dark:text-[#9A8E82] tracking-widest">
            {posts.length} articles
          </span>
        </div>

        <PostGrid posts={posts.map(p => ({
          id: p.id,
          title: p.title,
          date: p.date,
          excerpt: p.excerpt,
          category: p.category,
          tags: p.tags,
        }))} />
      </section>
    </div>
  )
}
