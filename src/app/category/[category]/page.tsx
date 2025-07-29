import React from 'react'
import { getAllPosts, getCategoriesFromFolders } from '@/lib/markdown'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import Link from 'next/link'
import { InlineAd, FooterAd } from '@/components/AdSense'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface CategoryPageProps {
  params: Promise<{
    category: string
  }>
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
  
  // 해당 카테고리 정보 찾기
  const currentCategory = categories.find(cat => cat.path.endsWith(category))
  if (!currentCategory) {
    notFound()
  }
  
  // 해당 카테고리의 포스트 필터링 (폴더 기반)
  const categoryPosts = allPosts.filter(post => {
    const postFolder = post.id.includes('/') ? post.id.split('/')[0] : 'root'
    return postFolder === category
  })

  return (
    <div className="space-y-8">
      {/* 카테고리 헤더 */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <span className="text-4xl">{currentCategory.icon}</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            {currentCategory.name}
          </h1>
        </div>
        <p className="text-lg text-gray-600">
          {currentCategory.description}
        </p>
        <div className="text-sm text-gray-500">
          총 {categoryPosts.length}개의 포스트
        </div>
      </div>

      {/* 포스트 목록 */}
      {categoryPosts.length > 0 ? (
        <div className="space-y-6 sm:space-y-8">
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
            {categoryPosts.map((post, index) => (
              <div key={post.id}>
                <article className="group relative rounded-lg border border-gray-200 bg-white p-4 sm:p-6 shadow-sm transition-all hover:shadow-md">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <time dateTime={post.date}>
                        {format(new Date(post.date), 'yyyy년 MM월 dd일', { locale: ko })}
                      </time>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 group-hover:text-blue-600">
                      <Link href={`/posts/${post.id}`} className="block">
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 line-clamp-3 text-sm sm:text-base">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
                
                {/* 3번째 포스트마다 인라인 광고 삽입 */}
                {(index + 1) % 3 === 0 && (
                  <div className="my-8">
                    <InlineAd />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📭</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            아직 포스트가 없습니다
          </h3>
          <p className="text-gray-600 mb-4">
            이 카테고리에 포스트가 추가되면 여기에 표시됩니다.
          </p>
          <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium">
            홈으로 돌아가기 →
          </Link>
        </div>
      )}

      {/* 푸터 광고 */}
      <FooterAd />
    </div>
  )
}