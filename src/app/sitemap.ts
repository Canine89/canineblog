import { getAllPosts, getCategoriesFromFolders } from '@/lib/markdown'
import { siteConfig } from '@/lib/config'
import { locales } from '@/i18n/config'

export default function sitemap() {
  const posts = getAllPosts()
  const categories = getCategoriesFromFolders()

  const baseUrl = siteConfig.site.url.replace(/\/$/, '')

  const staticEntries: Array<{
    path: string
    changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly'
    priority: number
  }> = [
    { path: '', changeFrequency: 'daily', priority: 1 },
    { path: '/tags', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/books', changeFrequency: 'weekly', priority: 0.7 },
    { path: '/posts', changeFrequency: 'daily', priority: 0.8 },
    { path: '/about', changeFrequency: 'monthly', priority: 0.5 },
    { path: '/privacy', changeFrequency: 'yearly', priority: 0.3 },
    { path: '/disclaimer', changeFrequency: 'yearly', priority: 0.3 },
    { path: '/terms', changeFrequency: 'yearly', priority: 0.3 },
  ]

  const staticPages = locales.flatMap((locale) =>
    staticEntries.map((e) => ({
      url: `${baseUrl}/${locale}${e.path}`,
      lastModified: new Date(),
      changeFrequency: e.changeFrequency,
      priority: e.priority,
    }))
  )

  const categoryPages = locales.flatMap((locale) =>
    categories.map((category) => ({
      url: `${baseUrl}/${locale}${category.path}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  )

  const postPages = locales.flatMap((locale) =>
    posts.map((post) => ({
      url: `${baseUrl}/${locale}/posts/${post.id}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  )

  return [...staticPages, ...categoryPages, ...postPages]
}
