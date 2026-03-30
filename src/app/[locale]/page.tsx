import { getAllPosts } from '@/lib/markdown'
import { siteConfig } from '@/lib/config'
import { ScrollFade } from '@/components/ScrollFade'
import { PostGrid } from '@/components/PostGrid'
import { getServerT } from '@/i18n/server'
import { isLocale, type Locale } from '@/i18n/config'
import { notFound } from 'next/navigation'

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw as Locale

  const t = await getServerT(locale)
  const posts = getAllPosts().sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <div className="space-y-12">
      <section className="-mx-4 -mt-10 overflow-hidden sm:-mx-6 lg:-mx-8 chip-hero-enter">
        <div
          className="flex min-h-[200px] flex-col justify-between px-8 sm:min-h-[260px] sm:px-10"
          style={{ backgroundColor: '#E8734A' }}
        >
          <ScrollFade className="flex flex-1 items-center justify-center px-6" distance={100}>
            <h1
              className="text-center text-3xl font-black leading-tight tracking-tight sm:text-5xl"
              style={{ color: '#FFFFFF' }}
            >
              {t('site.title')}
            </h1>
          </ScrollFade>

          <div className="flex justify-end pb-5 pr-2">
            <div className="text-right">
              <p
                className="text-[8px] font-semibold tracking-[0.2em] sm:text-[9px]"
                style={{ color: 'rgba(255,255,255,0.45)' }}
              >
                PANTONE
              </p>
              <p
                className="text-[11px] font-medium sm:text-[13px]"
                style={{ color: 'rgba(255,255,255,0.65)' }}
              >
                16-1362 TCX
              </p>
            </div>
          </div>
        </div>

        <div className="hero-info-strip flex items-center justify-between border-b border-pantone-border bg-white px-8 py-4 sm:px-10 sm:py-5">
          <p className="text-base font-extrabold tracking-tight text-pantone-ink sm:text-lg">
            {t('site.description')}
          </p>
          <p className="ml-4 flex-shrink-0 text-[10px] uppercase tracking-widest text-gray-400">
            {t('site.byAuthor', { name: siteConfig.author.name })}
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 dark:text-[#9A8E82]">
            {t('home.allPosts')}
          </h2>
          <span className="text-xs tracking-widest text-gray-300 dark:text-[#9A8E82]">
            {posts.length} {t('home.articles')}
          </span>
        </div>

        <PostGrid
          locale={locale}
          posts={posts.map((p) => ({
            id: p.id,
            title: p.title,
            date: p.date,
            excerpt: p.excerpt,
            category: p.category,
            tags: p.tags,
          }))}
        />
      </section>
    </div>
  )
}
