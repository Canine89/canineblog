import React from 'react'
import { getAllPosts, getPostsByCategory, getAllCategories } from '@/lib/markdown'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import Link from 'next/link'
import { InlineAd } from '@/components/AdSense'
import type { Metadata } from 'next'

interface CategoryPageProps {
  params: Promise<{
    category: string
  }>
}

const categoryNames: { [key: string]: string } = {
  dev: '개발',
  tip: '팁',
  book: '책'
}

const categoryDescriptions: { [key: string]: string } = {
  dev: '개발 관련 포스트들을 확인해보세요',
  tip: '유용한 개발 팁들을 확인해보세요',
  book: '책 리뷰 및 추천을 확인해보세요'
}

export async function generateStaticParams() {
  const categories = getAllCategories()
  
  return categories.map((category) => ({
    category: category,
  }))
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params
  const categoryName = categoryNames[category] || category
  
  return {
    title: `${categoryName} - My Blog`,
    description: categoryDescriptions[category] || `${categoryName} 관련 포스트들`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params
  const categoryPosts = getPostsByCategory(category)
  const categoryName = categoryNames[category] || category

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{categoryName}</h1>
        <p className="text-gray-600">{categoryDescriptions[category] || `${categoryName} 관련 포스트들`}</p>
      </div>

      {categoryPosts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">이 카테고리에는 아직 포스트가 없습니다.</p>
          <Link href="/blog" className="text-blue-600 hover:text-blue-800 font-medium mt-4 inline-block">
            모든 포스트 보기 →
          </Link>
        </div>
      ) : (
        <div className="grid gap-8">
          {categoryPosts.map((post, index) => (
            <div key={post.id}>
              <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <time dateTime={post.date}>
                      {format(new Date(post.date), 'yyyy년 MM월 dd일', { locale: ko })}
                    </time>
                    {post.category && (
                      <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {categoryNames[post.category] || post.category}
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                    <Link href={`/posts/${post.id}`} className="hover:text-blue-600 transition-colors">
                      {post.title}
                    </Link>
                  </h2>
                  {post.excerpt && (
                    <p className="text-gray-600 mb-4 text-lg">
                      {post.excerpt}
                    </p>
                  )}
                  {post.tags && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <Link 
                    href={`/posts/${post.id}`} 
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    자세히 보기 →
                  </Link>
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
      )}
    </div>
  )
} 