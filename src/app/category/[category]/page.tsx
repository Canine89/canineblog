import React from 'react'
import { getAllPosts, getCategoriesFromFolders } from '@/lib/markdown'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ChipReveal } from '@/components/ChipReveal'

interface CategoryPageProps {
  params: Promise<{
    category: string
  }>
}

const CATEGORY_PANTONE: Record<string, { color: string; code: string }> = {
  dev:      { color: '#D97757', code: '16-1441 TCX' },
  study:    { color: '#6B8F71', code: '16-5917 TCX' },
  book:     { color: '#C2956B', code: '16-1432 TCX' },
  think:    { color: '#8B5E6B', code: '17-1608 TCX' },
  'eng-dev': { color: '#5E7FA3', code: '17-4020 TCX' },
}

export async function generateStaticParams() {
  const categories = getCategoriesFromFolders()
  return categories.map((category) => ({
    category: category.path.split('/').pop()
  }))
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params
  const categories = getCategoriesFromFolders()
  const currentCategory = categories.find(cat => cat.path.endsWith(category))
  
  if (!currentCategory) {
    return {
      title: '카테고리를 찾을 수 없습니다',
      description: '요청하신 카테고리를 찾을 수 없습니다.'
    }
  }
  
  return {
    title: `${currentCategory.name} - 편집자P의 편집실`,
    description: currentCategory.description,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params
  const allPosts = getAllPosts()
  const categories = getCategoriesFromFolders()
  
  const currentCategory = categories.find(cat => cat.path.endsWith(category))
  if (!currentCategory) {
    notFound()
  }
  
  const categoryPosts = allPosts.filter(post => {
    const postFolder = post.id.includes('/') ? post.id.split('/')[0] : 'root'
    return postFolder === category
  })

  const pantone = CATEGORY_PANTONE[category] || CATEGORY_PANTONE.dev

  return (
    <div className="space-y-10">
      {/* Pantone-style category header */}
      <section className="border border-pantone-border overflow-hidden">
        <div
          className="h-24 sm:h-32 flex items-center justify-center"
          style={{ backgroundColor: pantone.color }}
        >
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wider uppercase">
            {currentCategory.name}
          </h1>
        </div>
        <div className="bg-white px-6 py-4 space-y-1">
          <p className="pantone-label">PANTONE</p>
          <p className="text-sm font-medium text-gray-500">{pantone.code} · {category}</p>
          <p className="text-sm text-gray-500 mt-1">
            {currentCategory.description} — 총 {categoryPosts.length}개의 포스트
          </p>
        </div>
      </section>

      {/* Post list as pantone chips */}
      {categoryPosts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categoryPosts.map((post, i) => (
            <ChipReveal key={post.id} index={i}>
              <article>
                <Link href={`/posts/${post.id}`} className="block pantone-chip h-full">
                  <div
                    className="chip-swatch h-28 relative"
                    style={{ backgroundColor: pantone.color }}
                  >
                    <div className="absolute bottom-0 right-0 px-3 py-2 text-right">
                      <p className="text-[7px] font-semibold text-white/50 tracking-[0.15em]">PANTONE</p>
                      <p className="text-[10px] font-medium text-white/70">{pantone.code}</p>
                      <p className="text-[9px] text-white/50">{category}</p>
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
                      <time className="text-[10px] text-gray-400" dateTime={post.date}>
                        {format(new Date(post.date), 'yyyy년 MM월 dd일', { locale: ko })}
                      </time>
                      {post.tags.length > 0 && (
                        <span className="text-[10px] text-gray-400">#{post.tags[0]}</span>
                      )}
                    </div>
                  </div>
                </Link>
              </article>
            </ChipReveal>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border border-pantone-border bg-white">
          <h3 className="text-base font-semibold text-pantone-ink mb-2">
            아직 포스트가 없습니다
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            이 카테고리에 포스트가 추가되면 여기에 표시됩니다.
          </p>
          <Link href="/" className="text-sm text-pantone-blue hover:text-[#B8603F] font-medium tracking-wider uppercase">
            홈으로 돌아가기 →
          </Link>
        </div>
      )}
    </div>
  )
}
