import { getAllTags, getPostsByTag } from '@/lib/markdown'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { ChipReveal } from '@/components/ChipReveal'

const TAG_COLORS = [
  '#D97757', '#6B8F71', '#C2956B', '#8B5E6B', '#5E7FA3',
  '#B8927A', '#7A9E82', '#A47D8B', '#6E8FAD', '#C4A882',
]

export default function TagsPage() {
  const tags = getAllTags()

  return (
    <div className="space-y-10">
      {/* Pantone-style header */}
      <section className="border border-pantone-border overflow-hidden">
        <div className="bg-pantone-slate h-24 sm:h-28 flex items-center justify-center">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wider uppercase">
            Tags
          </h1>
        </div>
        <div className="bg-white px-6 py-4 space-y-1">
          <p className="pantone-label">PANTONE</p>
          <p className="text-sm font-medium text-gray-500">Tag Collection · {tags.length} tags</p>
          <p className="text-sm text-gray-500">모든 태그를 확인하고 관련 포스트를 찾아보세요.</p>
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
                  <h3 className="text-sm font-bold text-pantone-ink">#{tag}</h3>
                  <span className="text-[10px] text-gray-400">{posts.length}개</span>
                </div>
                
                <div className="space-y-2 mt-2">
                  {posts.slice(0, 3).map((post) => (
                    <a
                      key={post.id}
                      href={`/posts/${post.id}`}
                      className="block group"
                    >
                      <h4 className="text-xs font-medium text-gray-600 group-hover:text-pantone-blue line-clamp-2 transition-colors">
                        {post.title}
                      </h4>
                      <time
                        dateTime={post.date}
                        className="text-[10px] text-gray-400"
                      >
                        {format(new Date(post.date), 'yyyy년 MM월 dd일', { locale: ko })}
                      </time>
                    </a>
                  ))}
                  
                  {posts.length > 3 && (
                    <p className="text-[10px] text-gray-400">
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
