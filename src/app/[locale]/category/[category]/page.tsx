import React from 'react'
import { getAllPosts, getCategoriesFromFolders } from '@/lib/markdown'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { Link } from 'next-view-transitions'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ChipReveal } from '@/components/ChipReveal'
import { getServerT } from '@/i18n/server'
import { withLocale } from '@/lib/locale-path'
import { postThumbVtName, postTitleVtName } from '@/lib/view-transition-names'
import { locales, isLocale, type Locale } from '@/i18n/config'

interface CategoryPageProps {
  params: Promise<{
    locale: string
    category: string
  }>
}

const CATEGORY_PANTONE: Record<string, { color: string; code: string }> = {
  dev: { color: '#E8734A', code: '16-1362 TCX' },
  study: { color: '#74A892', code: '16-5815 TCX' },
  book: { color: '#C4956A', code: '16-1432 TCX' },
  think: { color: '#A3677E', code: '17-1718 TCX' },
  'eng-dev': { color: '#4B7BA6', code: '17-4027 TCX' },
}

export async function generateStaticParams() {
  const categories = getCategoriesFromFolders()
  return locales.flatMap((locale) =>
    categories.map((category) => ({
      locale,
      category: category.path.split('/').pop(),
    }))
  )
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category, locale: raw } = await params
  if (!isLocale(raw)) {
    return { title: 'Not found' }
  }
  const locale = raw as Locale
  const t = await getServerT(locale)
  const categories = getCategoriesFromFolders()
  const currentCategory = categories.find((cat) => cat.path.endsWith(category))

  if (!currentCategory) {
    return {
      title: t('categoryPage.notFoundTitle'),
      description: t('categoryPage.notFoundDesc'),
    }
  }

  return {
    title: t('categoryPage.metaTitle', { name: currentCategory.name }),
    description: currentCategory.description,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category, locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw as Locale
  const t = await getServerT(locale)

  const allPosts = getAllPosts()
  const categories = getCategoriesFromFolders()

  const currentCategory = categories.find((cat) => cat.path.endsWith(category))
  if (!currentCategory) {
    notFound()
  }

  const categoryPosts = allPosts.filter((post) => {
    const postFolder = post.id.includes('/') ? post.id.split('/')[0] : 'root'
    return postFolder === category
  })

  const pantone = CATEGORY_PANTONE[category] || CATEGORY_PANTONE.dev

  return (
    <div className="space-y-10">
      <section className="border-pantone-border overflow-hidden border dark:border-[#3D3228]">
        <div
          className="pantone-swatch-bar flex h-24 items-center justify-center sm:h-32"
          style={{ backgroundColor: pantone.color }}
        >
          <h1 className="text-2xl font-extrabold uppercase tracking-wider text-white sm:text-3xl">
            {currentCategory.name}
          </h1>
        </div>
        <div className="space-y-1 bg-white px-6 py-4 dark:bg-[#2E2820]">
          <p className="pantone-label">PANTONE</p>
          <p className="text-sm font-medium text-gray-500 dark:text-[#9A8E82]">
            {pantone.code} · {category}
          </p>
          <p className="mt-1 text-sm text-gray-500 dark:text-[#9A8E82]">
            {currentCategory.description} — {categoryPosts.length}{' '}
            {locale === 'en' ? 'posts' : '개의 포스트'}
          </p>
        </div>
      </section>

      {categoryPosts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categoryPosts.map((post, i) => (
            <ChipReveal key={post.id} index={i}>
              <article>
                <Link
                  href={withLocale(locale, `/posts/${post.id}`)}
                  className="pantone-chip group block h-full motion-safe:transition-[transform,box-shadow] motion-safe:duration-200 motion-safe:ease-out"
                >
                  <div
                    className="chip-swatch relative h-28 overflow-hidden"
                    style={{ viewTransitionName: postThumbVtName(post.id) }}
                  >
                    <div
                      className="chip-thumb-zoom absolute inset-0"
                      style={{ backgroundColor: pantone.color }}
                    />
                    <div className="absolute bottom-0 right-0 z-10 px-3 py-2 text-right">
                      <p className="text-[7px] font-semibold tracking-[0.15em] text-white/50">PANTONE</p>
                      <p className="text-[10px] font-medium text-white/70">{pantone.code}</p>
                      <p className="text-[9px] text-white/50">{category}</p>
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
                      <time
                        className="text-[10px] text-gray-400 dark:text-[#9A8E82]"
                        dateTime={post.date}
                      >
                        {format(new Date(post.date), 'yyyy년 MM월 dd일', { locale: ko })}
                      </time>
                      {post.tags.length > 0 && (
                        <span className="text-[10px] text-gray-400 dark:text-[#9A8E82]">
                          #{post.tags[0]}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </article>
            </ChipReveal>
          ))}
        </div>
      ) : (
        <div className="border-pantone-border bg-white py-16 text-center dark:border-[#3D3228] dark:bg-[#2E2820]">
          <h3 className="text-pantone-ink dark:text-[#E8E0D6] mb-2 text-base font-semibold">
            {locale === 'en' ? 'No posts yet' : '아직 포스트가 없습니다'}
          </h3>
          <p className="mb-4 text-sm text-gray-500 dark:text-[#9A8E82]">
            {locale === 'en'
              ? 'Posts in this category will appear here.'
              : '이 카테고리에 포스트가 추가되면 여기에 표시됩니다.'}
          </p>
          <Link
            href={withLocale(locale, '/')}
            className="text-pantone-blue hover:text-[#C55A30] text-sm font-medium uppercase tracking-wider"
          >
            {t('post.backHome')}
          </Link>
        </div>
      )}
    </div>
  )
}
