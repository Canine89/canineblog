'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { ChipReveal } from './ChipReveal'

interface Post {
  id: string
  title: string
  date: string
  excerpt: string
  category?: string
  tags?: string[]
}

interface PantoneInfo {
  color: string
  code: string
}

const CATEGORY_PANTONE: Record<string, PantoneInfo> = {
  dev:      { color: '#E8734A', code: '16-1362 TCX' },
  study:    { color: '#74A892', code: '16-5815 TCX' },
  book:     { color: '#C4956A', code: '16-1432 TCX' },
  think:    { color: '#A3677E', code: '17-1718 TCX' },
  'eng-dev': { color: '#4B7BA6', code: '17-4027 TCX' },
}

const BATCH = 9

export function PostGrid({ posts }: { posts: Post[] }) {
  const [count, setCount] = useState(BATCH)
  const loaderRef = useRef<HTMLDivElement>(null)

  const loadMore = useCallback(() => {
    setCount((prev) => Math.min(prev + BATCH, posts.length))
  }, [posts.length])

  useEffect(() => {
    const el = loaderRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) loadMore()
      },
      { rootMargin: '200px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [loadMore])

  const gridRef = useRef<HTMLDivElement>(null)

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    const cards = gridRef.current?.querySelectorAll('.pantone-chip')
    cards?.forEach((card) => {
      const rect = card.getBoundingClientRect()
      const el = card as HTMLElement
      el.style.setProperty('--glow-x', `${e.clientX - rect.left}px`)
      el.style.setProperty('--glow-y', `${e.clientY - rect.top}px`)
    })
  }, [])

  const visible = posts.slice(0, count)
  const hasMore = count < posts.length

  return (
    <>
      <div
        ref={gridRef}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        onPointerMove={handlePointerMove}
      >
        {visible.map((post, i) => {
          const cat = post.category || 'dev'
          const pantone = CATEGORY_PANTONE[cat] || CATEGORY_PANTONE.dev
          return (
            <ChipReveal key={post.id} index={i % BATCH}>
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
                    <h3 className="text-[15px] font-bold text-pantone-ink dark:text-[#E8E0D6] leading-snug line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-[#9A8E82] leading-relaxed mt-1 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="mt-auto pt-3 flex items-center justify-between">
                      <time className="text-[10px] text-gray-400 dark:text-[#9A8E82]">
                        {new Date(post.date).toLocaleDateString('ko-KR')}
                      </time>
                      {post.tags && post.tags.length > 0 && (
                        <span className="text-[10px] text-gray-400 dark:text-[#9A8E82]">
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

      {hasMore && (
        <div ref={loaderRef} className="flex justify-center py-8">
          <span className="text-xs text-gray-400 dark:text-[#9A8E82] tracking-widest uppercase animate-pulse">
            loading...
          </span>
        </div>
      )}

      {!hasMore && posts.length > BATCH && (
        <p className="text-center text-xs text-gray-300 dark:text-[#9A8E82] tracking-widest pt-4">
          {posts.length} articles
        </p>
      )}
    </>
  )
}
