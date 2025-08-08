import React from 'react'
import { getPostData, getAllPostIds } from '@/lib/markdown'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { Metadata } from 'next'
import { siteConfig } from '@/lib/config'
import Link from 'next/link'
import { SocialShare } from '@/components/SocialShare'

interface PostPageProps {
  params: Promise<{
    slug: string[]
  }>
}

export async function generateStaticParams() {
  const paths = getAllPostIds()
  return paths.map(path => ({
    slug: path.params.id.split('/')
  }))
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const id = resolvedParams.slug.join('/')
  const post = await getPostData(id)
  
  const url = `${siteConfig.site.url}/posts/${id}`
  
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: siteConfig.author.name }],
    creator: siteConfig.author.name,
    publisher: siteConfig.author.name,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: url,
      siteName: siteConfig.title,
      locale: 'ko_KR',
      publishedTime: post.date,
      authors: [siteConfig.author.name],
      tags: post.tags,
      images: [
        {
          url: `${siteConfig.site.url}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [`${siteConfig.site.url}/og-image.jpg`],
      creator: '@limedaddy_8924',
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const resolvedParams = await params
  const id = resolvedParams.slug.join('/')
  const post = await getPostData(id)
  const postUrl = `${siteConfig.site.url}/posts/${id}`

  // 구조화된 데이터 (JSON-LD)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
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
    "datePublished": post.date,
    "dateModified": post.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${siteConfig.site.url}/posts/${id}`
    },
    "keywords": post.tags.join(", "),
    "articleSection": "Blog",
    "inLanguage": "ko-KR"
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <article className="max-w-none">
        {/* Header */}
        <header className="mb-8">
          <div className="mb-4">
            <time 
              dateTime={post.date}
              className="text-sm text-gray-500"
            >
              {format(new Date(post.date), 'yyyy년 MM월 dd일', { locale: ko })}
            </time>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            {post.excerpt}
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800"
              >
                {tag}
              </span>
            ))}
          </div>
          
          {/* Social Share */}
          <div className="border-t border-gray-200 pt-4">
            <SocialShare 
              title={post.title}
              url={postUrl}
              excerpt={post.excerpt}
            />
          </div>
        </header>

        {/* 자동광고가 이 위치에 광고를 배치할 수 있습니다 */}

        {/* Content */}
        <div 
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        {/* Social Share - Bottom */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <SocialShare 
            title={post.title}
            url={postUrl}
            excerpt={post.excerpt}
          />
        </div>

        {/* Navigation */}
        <nav className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <Link
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-800"
            >
              ← 홈으로 돌아가기
            </Link>
          </div>
        </nav>

        {/* 자동광고가 하단에 광고를 배치할 수 있습니다 */}
      </article>
    </>
  )
} 