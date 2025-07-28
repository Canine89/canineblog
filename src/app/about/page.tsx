import { siteConfig } from '@/lib/config'
import Image from 'next/image'

export default function AboutPage() {
  const books = [
    {
      title: "이게 되네? 클로드 MCP 미친 활용법 27제",
      publisher: "YES24",
      url: "https://www.yes24.com/product/goods/147957269",
      image: "https://image.yes24.com/goods/147957269/XL"
    },
    {
      title: "이게 되네? 챗GPT 미친 크롤링 24제",
      publisher: "YES24", 
      url: "https://www.yes24.com/product/goods/144868498",
      image: "https://image.yes24.com/goods/144868498/XL"
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">편집자P 소개</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          블로그 주인에 대해 알아보세요
        </p>
      </div>

      {/* Author Info & Books */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 shadow-sm">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Author Info */}
            <div className="space-y-6">
              {/* Avatar */}
              <div className="flex justify-center">
                <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-4xl text-gray-500 dark:text-gray-400 overflow-hidden">
                  {siteConfig.author.avatar && siteConfig.author.avatar !== "/p.jpg" ? (
                    <Image 
                      src={siteConfig.author.avatar} 
                      alt={`${siteConfig.author.name} 프로필`}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>{siteConfig.author.name.charAt(0)}</span>
                  )}
                </div>
              </div>
              
              {/* Name and Bio */}
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
                  {siteConfig.author.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {siteConfig.author.bio}
                </p>
              </div>

              {/* Contact */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">연락처</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  <a href={`mailto:${siteConfig.author.email}`} className="hover:text-blue-600 dark:hover:text-blue-400">
                    {siteConfig.author.email}
                  </a>
                </p>
              </div>

              {/* Social Links */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">소셜 미디어</h3>
                <div className="flex space-x-4">
                  {Object.entries(siteConfig.author.social).map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                    >
                      {platform}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Published Books */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                📚 출간 도서
              </h3>
              <div className="space-y-4">
                {books.map((book, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                    <div className="flex space-x-4">
                      {/* Book Cover */}
                      <div className="w-20 h-28 bg-gray-200 dark:bg-gray-600 rounded overflow-hidden flex-shrink-0">
                        <Image 
                          src={book.image}
                          alt={book.title}
                          width={80}
                          height={112}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Book Info */}
                      <div className="flex-1 space-y-2">
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2">
                          {book.title}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {book.publisher}
                        </p>
                        
                        {/* Purchase Button */}
                        <a
                          href={book.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-xs font-medium py-1 px-3 rounded transition-colors"
                        >
                          구매하기
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Info
      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">이 블로그에 대해</h3>
          <div className="space-y-3 text-gray-600 dark:text-gray-300">
            <p>
              이 블로그는 <strong>Next.js</strong>와 <strong>Tailwind CSS</strong>로 만들어졌습니다.
              마크다운으로 작성한 콘텐츠가 아름다운 웹페이지로 변환되는 정적 블로그입니다.
            </p>
            <p>
              주요 기능:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>마크다운 지원 (GFM 포함)</li>
              <li>태그 시스템</li>
              <li>코드 하이라이팅</li>
              <li>반응형 디자인</li>
              <li>SEO 최적화</li>
              <li>다크 모드 지원</li>
              <li>Google AdSense 연동</li>
            </ul>
          </div>
        </div>
      </div> */}
    </div>
  )
} 