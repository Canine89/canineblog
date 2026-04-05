'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'next-view-transitions'
import { useTranslation } from 'react-i18next'
import { withLocale } from '@/lib/locale-path'
import type { Locale } from '@/i18n/config'
import { postThumbVtName, postTitleVtName } from '@/lib/view-transition-names'
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
  dev: { color: '#E8734A', code: '16-1362 TCX' },
  study: { color: '#74A892', code: '16-5815 TCX' },
  book: { color: '#C4956A', code: '16-1432 TCX' },
  think: { color: '#A3677E', code: '17-1718 TCX' },
  'eng-dev': { color: '#4B7BA6', code: '17-4027 TCX' },
}

const BATCH = 9

export function PostGrid({ posts, locale }: { posts: Post[]; locale: Locale }) {
  const { t } = useTranslation('common')
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
            <ChipReveal key={post.id} index={i}>
              <article>
                <Link
                  href={withLocale(locale, `/posts/${post.id}`)}
                  className="pantone-chip group block h-full motion-safe:transition-[transform,box-shadow] motion-safe:duration-200 motion-safe:ease-out"
                >
                  <div
                    className="chip-swatch relative h-32 overflow-hidden sm:h-36"
                    style={{ viewTransitionName: postThumbVtName(post.id) }}
                  >
                    <div
                      className="chip-thumb-zoom absolute inset-0"
                      style={{ backgroundColor: pantone.color }}
                    />
                    <div className="absolute bottom-0 right-0 z-10 px-3 py-2 text-right">
                      <p className="text-[7px] font-semibold tracking-[0.15em] text-white/50">PANTONE</p>
                      <p className="text-[10px] font-medium text-white/70">{pantone.code}</p>
                      <p className="text-[9px] text-white/50">{cat}</p>
                    </div>
                  </div>
                  <div className="chip-info flex-1">
                    <h3
                      className="line-clamp-2 text-[15px] font-bold leading-snug text-pantone-ink dark:text-[#E8E0D6]"
                      style={{ viewTransitionName: postTitleVtName(post.id) }}
                    >
                      {post.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-gray-500 dark:text-[#9A8E82]">
                      {post.excerpt}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-3">
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
          <span className="motion-reduce:animate-none animate-pulse text-xs tracking-widest text-gray-400 uppercase dark:text-[#9A8E82]">
            {t('home.loading')}
          </span>
        </div>
      )}

      {!hasMore && posts.length > BATCH && (
        <p className="pt-4 text-center text-xs tracking-widest text-gray-300 dark:text-[#9A8E82]">
          {posts.length} articles
        </p>
      )}
    </>
  )
}
