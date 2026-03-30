import React from 'react'
import { getPostData, getAllPostIds } from '@/lib/markdown'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { Metadata } from 'next'
import { siteConfig } from '@/lib/config'
import Link from 'next/link'
import { SocialShare } from '@/components/SocialShare'
import { ArticleTOC } from '@/components/ArticleTOC'
import { getServerT } from '@/i18n/server'
import { withLocale } from '@/lib/locale-path'
import { locales, isLocale, type Locale } from '@/i18n/config'
import { notFound } from 'next/navigation'

interface PostPageProps {
  params: Promise<{
    locale: string
    slug: string[]
  }>
}

export async function generateStaticParams() {
  const paths = getAllPostIds()
  return locales.flatMap((locale) =>
    paths.map((path) => ({
      locale,
      slug: path.params.id.split('/'),
    }))
  )
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const resolvedParams = await params
  if (!isLocale(resolvedParams.locale)) {
    return { title: 'Not found' }
  }
  const locale = resolvedParams.locale as Locale
  const id = resolvedParams.slug.join('/')
  const post = await getPostData(id)

  const base = siteConfig.site.url.replace(/\/$/, '')
  const url = `${base}/${locale}/posts/${id}`

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
      locale: locale === 'en' ? 'en_US' : 'ko_KR',
      publishedTime: post.date,
      authors: [siteConfig.author.name],
      tags: post.tags,
      images: [
        {
          url: `${base}/og-image.jpg`,
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
      images: [`${base}/og-image.jpg`],
      creator: '@limedaddy_8924',
    },
    alternates: {
      canonical: url,
      languages: {
        ko: `${base}/ko/posts/${id}`,
        en: `${base}/en/posts/${id}`,
      },
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
  if (!isLocale(resolvedParams.locale)) notFound()
  const locale = resolvedParams.locale as Locale

  const id = resolvedParams.slug.join('/')
  const post = await getPostData(id)
  const t = await getServerT(locale)

  const base = siteConfig.site.url.replace(/\/$/, '')
  const postUrl = `${base}/${locale}/posts/${id}`

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Person',
      name: siteConfig.author.name,
      url: siteConfig.author.social.github,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.title,
      url: siteConfig.site.url,
    },
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    keywords: post.tags.join(', '),
    articleSection: 'Blog',
    inLanguage: locale === 'en' ? 'en' : 'ko-KR',
  }

  const CATEGORY_PANTONE: Record<string, { color: string; code: string }> = {
    dev: { color: '#E8734A', code: '16-1362 TCX' },
    study: { color: '#74A892', code: '16-5815 TCX' },
    book: { color: '#C4956A', code: '16-1432 TCX' },
    think: { color: '#A3677E', code: '17-1718 TCX' },
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
        <header className="border-pantone-border mb-10 overflow-hidden border dark:border-[#3D3228]">
          <div
            className="pantone-swatch-bar relative h-20 sm:h-28"
            style={{ backgroundColor: pantone.color }}
          >
            <div className="absolute bottom-0 right-0 px-4 py-3 text-right">
              <p className="text-[8px] font-semibold tracking-[0.15em] text-white/50">PANTONE</p>
              <p className="text-[12px] font-medium text-white/70">{pantone.code}</p>
              <p className="text-[10px] text-white/50">{cat}</p>
            </div>
          </div>
          <div className="space-y-4 bg-white px-6 py-6 dark:bg-[#2E2820]">
            <time dateTime={post.date} className="text-xs text-gray-400 dark:text-[#9A8E82]">
              {format(new Date(post.date), 'yyyy년 MM월 dd일', { locale: ko })}
            </time>
            <h1 className="text-pantone-ink dark:text-[#E8E0D6] text-3xl font-extrabold tracking-tight sm:text-4xl">
              {post.title}
            </h1>
            <p className="text-base leading-relaxed text-gray-500 dark:text-[#9A8E82]">
              {post.excerpt}
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="border-pantone-border text-gray-500 dark:border-[#3D3228] dark:text-[#9A8E82] inline-flex items-center border px-3 py-1 text-xs font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="border-pantone-border border-t pt-4 dark:border-[#3D3228]">
              <SocialShare title={post.title} url={postUrl} excerpt={post.excerpt} />
            </div>
          </div>
        </header>

        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        <div className="border-pantone-border mt-10 border-t pt-6 dark:border-[#3D3228]">
          <SocialShare title={post.title} url={postUrl} excerpt={post.excerpt} />
        </div>

        <nav className="border-pantone-border mt-8 border-t pt-6 dark:border-[#3D3228]">
          <Link
            href={withLocale(locale, '/')}
            className="text-pantone-blue hover:text-[#C55A30] inline-flex items-center text-sm font-medium uppercase tracking-wider"
          >
            {t('post.backHome')}
          </Link>
        </nav>
      </article>
    </>
  )
}
