'use client'

import { useEffect } from 'react'
import { siteConfig } from '@/lib/config'

interface DisqusProps {
  identifier: string
  title: string
  url: string
}

declare global {
  interface Window {
    DISQUS?: any
    disqus_config?: () => void
  }
}

export function Disqus({ identifier, title, url }: DisqusProps) {
  useEffect(() => {
    // Disqus 스크립트가 이미 로드되어 있는지 확인
    if (typeof window !== 'undefined' && window.DISQUS) {
      window.DISQUS.reset({
        reload: true,
        config: function () {
          this.page.identifier = identifier
          this.page.url = url
          this.page.title = title
        }
      })
    } else {
      // Disqus 스크립트 로드
      const script = document.createElement('script')
      script.src = `https://${siteConfig.disqus.shortname}.disqus.com/embed.js`
      script.setAttribute('data-timestamp', Date.now().toString())
      script.async = true
      
      // Disqus 설정
      window.disqus_config = function () {
        this.page.identifier = identifier
        this.page.url = url
        this.page.title = title
      }
      
      document.head.appendChild(script)
    }
  }, [identifier, title, url])

  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          댓글
        </h3>
        <p className="text-gray-600 text-sm">
          이 글에 대한 의견이나 질문이 있으시면 댓글을 남겨주세요.
        </p>
      </div>
      <div id="disqus_thread" className="min-h-[400px]"></div>
    </div>
  )
} 