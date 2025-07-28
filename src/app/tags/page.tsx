import { getAllTags, getPostsByTag } from '@/lib/markdown'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

export default function TagsPage() {
  const tags = getAllTags()

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">태그</h1>
        <p className="text-gray-600 dark:text-gray-300">
          모든 태그를 확인하고 관련 포스트를 찾아보세요.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tags.map((tag) => {
          const posts = getPostsByTag(tag)
          return (
            <div
              key={tag}
              className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    #{tag}
                  </h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {posts.length}개 포스트
                  </span>
                </div>
                
                <div className="space-y-3">
                  {posts.slice(0, 3).map((post) => (
                    <article key={post.id} className="group">
                      <a
                        href={`/posts/${post.id}`}
                        className="block space-y-1"
                      >
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2">
                          {post.title}
                        </h4>
                        <time
                          dateTime={post.date}
                          className="text-xs text-gray-500 dark:text-gray-400"
                        >
                          {format(new Date(post.date), 'yyyy년 MM월 dd일', { locale: ko })}
                        </time>
                      </a>
                    </article>
                  ))}
                  
                  {posts.length > 3 && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      +{posts.length - 3}개 더 보기
                    </p>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
} 