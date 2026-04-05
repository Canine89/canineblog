import { Link } from 'next-view-transitions'
import { getAllPosts } from '@/lib/markdown'
import { getServerT } from '@/i18n/server'
import { withLocale } from '@/lib/locale-path'
import { isLocale, type Locale } from '@/i18n/config'
import { notFound } from 'next/navigation'
import { postTitleVtName } from '@/lib/view-transition-names'

export default async function AllPostsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw as Locale
  const t = await getServerT(locale)

  const allPosts = getAllPosts().sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  const getCategoryDisplayName = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      dev: 'dev',
      book: 'book',
      'eng-dev': 'eng-dev',
      think: 'think',
    }
    return categoryMap[category] || category
  }

  const getCategoryColor = (category: string) => {
    const colorMap: { [key: string]: string } = {
      dev: 'bg-blue-100 text-blue-800',
      book: 'bg-green-100 text-green-800',
      'eng-dev': 'bg-purple-100 text-purple-800',
      think: 'bg-orange-100 text-orange-800',
    }
    return colorMap[category] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          {t('postsIndex.title', { count: allPosts.length })}
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">{t('postsIndex.subtitle')}</p>
      </div>

      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {allPosts.map((post) => (
            <article key={post.id} className="group relative">
              <Link href={withLocale(locale, `/posts/${post.id}`)} className="block">
                <div className="h-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md motion-safe:transition-[transform,box-shadow] motion-safe:duration-200 motion-safe:ease-out motion-safe:group-hover:-translate-y-0.5">
                  <div className="mb-4 flex items-start justify-between">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getCategoryColor(post.category || '')}`}
                    >
                      {getCategoryDisplayName(post.category || '')}
                    </span>
                    <time className="text-xs text-gray-500">
                      {new Date(post.date).toLocaleDateString(locale === 'en' ? 'en-US' : 'ko-KR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                  </div>

                  <div className="space-y-3">
                    <h3
                      className="line-clamp-2 text-lg font-semibold text-gray-900 transition-colors duration-200 group-hover:text-blue-600"
                      style={{ viewTransitionName: postTitleVtName(post.id) }}
                    >
                      {post.title}
                    </h3>
                    <p className="line-clamp-3 text-sm text-gray-600">{post.excerpt}</p>
                  </div>

                  {post.tags && post.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded bg-gray-100 px-2 py-1 text-xs text-gray-600"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
