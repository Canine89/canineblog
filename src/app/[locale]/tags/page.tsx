import Link from 'next/link'
import { getAllTags, getPostsByTag } from '@/lib/markdown'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { ChipReveal } from '@/components/ChipReveal'
import { withLocale } from '@/lib/locale-path'
import { isLocale, type Locale } from '@/i18n/config'
import { notFound } from 'next/navigation'

const TAG_COLORS = [
  '#E8734A', '#74A892', '#C4956A', '#A3677E', '#4B7BA6',
  '#D4896E', '#8AB89E', '#B4A07A', '#7E92B0', '#C9A484',
]

export default async function TagsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw as Locale
  const tags = getAllTags()

  return (
    <div className="space-y-10">
      {/* Pantone-style header */}
      <section className="border border-pantone-border dark:border-[#3D3228] overflow-hidden">
        <div className="bg-pantone-slate dark:bg-[#252019] h-24 sm:h-28 flex items-center justify-center">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wider uppercase">
            Tags
          </h1>
        </div>
        <div className="bg-white dark:bg-[#2E2820] px-6 py-4 space-y-1">
          <p className="pantone-label">PANTONE</p>
          <p className="text-sm font-medium text-gray-500 dark:text-[#9A8E82]">Tag Collection · {tags.length} tags</p>
          <p className="text-sm text-gray-500 dark:text-[#9A8E82]">모든 태그를 확인하고 관련 포스트를 찾아보세요.</p>
        </div>
      </section>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {tags.map((tag, idx) => {
          const posts = getPostsByTag(tag)
          const color = TAG_COLORS[idx % TAG_COLORS.length]
          return (
            <ChipReveal key={tag} index={idx % 6}>
            <div className="pantone-chip">
              <div className="chip-swatch h-16 relative" style={{ backgroundColor: color }}>
                <div className="absolute bottom-0 right-0 px-2 py-1 text-right">
                  <p className="text-[6px] font-semibold text-white/50 tracking-[0.15em]">PANTONE</p>
                  <p className="text-[8px] font-medium text-white/70">{color}</p>
                </div>
              </div>
              <div className="chip-info">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-pantone-ink dark:text-[#E8E0D6]">#{tag}</h3>
                  <span className="text-[10px] text-gray-400 dark:text-[#9A8E82]">{posts.length}개</span>
                </div>
                
                <div className="space-y-2 mt-2">
                  {posts.slice(0, 3).map((post) => (
                    <Link
                      key={post.id}
                      href={withLocale(locale, `/posts/${post.id}`)}
                      className="group block"
                    >
                      <h4 className="line-clamp-2 text-xs font-medium text-gray-600 transition-colors group-hover:text-pantone-blue dark:text-[#9A8E82]">
                        {post.title}
                      </h4>
                      <time
                        dateTime={post.date}
                        className="text-[10px] text-gray-400 dark:text-[#9A8E82]"
                      >
                        {format(new Date(post.date), 'yyyy년 MM월 dd일', { locale: ko })}
                      </time>
                    </Link>
                  ))}
                  
                  {posts.length > 3 && (
                    <p className="text-[10px] text-gray-400 dark:text-[#9A8E82]">
                      +{posts.length - 3}개 더
                    </p>
                  )}
                </div>
              </div>
            </div>
            </ChipReveal>
          )
        })}
      </div>
    </div>
  )
}
