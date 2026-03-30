import React from 'react'
import { getPostData, getAllPostIds } from '@/lib/markdown'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { Metadata } from 'next'
import { siteConfig } from '@/lib/config'
import Link from 'next/link'
import { SocialShare } from '@/components/SocialShare'
import { ArticleTOC } from '@/components/ArticleTOC'

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

  const CATEGORY_PANTONE: Record<string, { color: string; code: string }> = {
    dev:      { color: '#E8734A', code: '16-1362 TCX' },
    study:    { color: '#74A892', code: '16-5815 TCX' },
    book:     { color: '#C4956A', code: '16-1432 TCX' },
    think:    { color: '#A3677E', code: '17-1718 TCX' },
    'eng-dev': { color: '#4B7BA6', code: '17-4027 TCX' },
  }
  const cat = (post as { category?: string }).category || 'dev'
  const pantone = CATEGORY_PANTONE[cat] || CATEGORY_PANTONE.dev

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ArticleTOC />
      <article className="max-w-none">
        {/* Pantone-style post header */}
        <header className="mb-10 border border-pantone-border dark:border-[#3D3228] overflow-hidden">
          <div
            className="h-20 sm:h-28 relative pantone-swatch-bar"
            style={{ backgroundColor: pantone.color }}
          >
            <div className="absolute bottom-0 right-0 px-4 py-3 text-right">
              <p className="text-[8px] font-semibold text-white/50 tracking-[0.15em]">PANTONE</p>
              <p className="text-[12px] font-medium text-white/70">{pantone.code}</p>
              <p className="text-[10px] text-white/50">{cat}</p>
            </div>
          </div>
          <div className="bg-white dark:bg-[#2E2820] px-6 py-6 space-y-4">
            <time 
              dateTime={post.date}
              className="text-xs text-gray-400 dark:text-[#9A8E82]"
            >
              {format(new Date(post.date), 'yyyy년 MM월 dd일', { locale: ko })}
            </time>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-pantone-ink dark:text-[#E8E0D6] tracking-tight">
              {post.title}
            </h1>
            <p className="text-base text-gray-500 dark:text-[#9A8E82] leading-relaxed">
              {post.excerpt}
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 text-xs font-medium border border-pantone-border dark:border-[#3D3228] text-gray-500 dark:text-[#9A8E82]"
                >
                  #{tag}
                </span>
              ))}
            </div>
            
            <div className="border-t border-pantone-border dark:border-[#3D3228] pt-4">
              <SocialShare 
                title={post.title}
                url={postUrl}
                excerpt={post.excerpt}
              />
            </div>
          </div>
        </header>

        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        {/* Social Share - Bottom */}
        <div className="mt-10 pt-6 border-t border-pantone-border dark:border-[#3D3228]">
          <SocialShare 
            title={post.title}
            url={postUrl}
            excerpt={post.excerpt}
          />
        </div>

        {/* Navigation */}
        <nav className="mt-8 pt-6 border-t border-pantone-border dark:border-[#3D3228]">
          <Link
            href="/"
            className="inline-flex items-center text-pantone-blue hover:text-[#C55A30] text-sm font-medium tracking-wider uppercase"
          >
            ← 홈으로 돌아가기
          </Link>
        </nav>
      </article>
    </>
  )
} 