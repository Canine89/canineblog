import Link from 'next/link'
import { getAllPosts } from '@/lib/markdown'
import { siteConfig } from '@/lib/config'

export default function HomePage() {
  const posts = getAllPosts()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, siteConfig.blog.postsPerPage)

  const getCategoryDisplayName = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      'dev': 'dev',
      'book': 'book',
      'eng-dev': 'eng-dev',
      'think': 'think'
    }
    return categoryMap[category] || category
  }

  const getCategoryColor = (category: string) => {
    const colorMap: { [key: string]: string } = {
      'dev': 'bg-blue-100 text-blue-800',
      'book': 'bg-green-100 text-green-800',
      'eng-dev': 'bg-purple-100 text-purple-800',
      'think': 'bg-orange-100 text-orange-800'
    }
    return colorMap[category] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">
          안녕하세요! {siteConfig.author.name}입니다 👋
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {siteConfig.description}
        </p>
      </div>

      {/* Posts Grid */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">최근 포스트</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.id} className="group relative">
              <Link href={`/posts/${post.id}`} className="block">
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6 h-full">
                  {/* Category Badge */}
                  <div className="flex justify-between items-start mb-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(post.category || '')}`}>
                      {getCategoryDisplayName(post.category || '')}
                    </span>
                    <time className="text-xs text-gray-500">
                      {new Date(post.date).toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  </div>
                  
                  {/* Post Content */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                  
                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-600"
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

      {/* View All Posts Link */}
      {posts.length >= siteConfig.blog.postsPerPage && (
        <div className="text-center pt-8">
          <Link
            href="/posts"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            모든 포스트 보기
          </Link>
        </div>
      )}
    </div>
  )
}