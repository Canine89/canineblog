import { siteConfig } from '@/lib/config'
import Image from 'next/image'

export default function BooksPage() {
  const books = {
    goldenrabbit: [
      {
        title: "요즘 바이브 코딩 클로드 코드 완벽 가이드",
        role: "기획/집필",
        url: "https://www.yes24.com/product/goods/151850127",
        image: "https://image.yes24.com/goods/151850127/XL"
      },
      {
        title: "이게 되네? 클로드 MCP 미친 활용법 27제",
        role: "기획/집필",
        url: "https://www.yes24.com/product/goods/147957269",
        image: "https://image.yes24.com/goods/147957269/XL"
      },
      {
        title: "이게 되네? 챗GPT 미친 크롤링 24제",
        role: "기획/집필",
        url: "https://www.yes24.com/product/goods/144868498",
        image: "https://image.yes24.com/goods/144868498/XL"
      },
      {
        title: "이게 되네? 챗GPT 미친 기획 X 마케팅 59제",
        role: "기획/편집",
        url: "https://www.yes24.com/product/goods/146492205",
        image: "https://image.yes24.com/goods/146492205/XL"
      },
      {
        title: "정말 쉽네? 챗GPT 입문",
        role: "표지 삽화",
        url: "https://www.yes24.com/product/goods/133846138",
        image: "https://image.yes24.com/goods/133846138/XL"
      },
      {
        title: "파이썬 데이터 분석가 되기+챗GPT",
        role: "기획/편집/삽화",
        url: "https://www.yes24.com/product/goods/136469562",
        image: "https://image.yes24.com/goods/136469562/XL"
      },
      {
        title: "파이썬 업무 자동화 일잘러 되기 + 챗GPT",
        role: "기획",
        url: "https://www.yes24.com/product/goods/140256885",
        image: "https://image.yes24.com/goods/140256885/XL"
      },
      {
        title: "스프링 부트 3 백엔드 개발자 되기 : 자바 편 (2판)",
        role: "기획/편집/삽화",
        url: "https://www.yes24.com/product/goods/125668284",
        image: "https://image.yes24.com/goods/125668284/XL"
      },
      {
        title: "코딩 테스트 합격자 되기 - C++ 편",
        role: "기획/편집/삽화",
        url: "https://www.yes24.com/product/goods/126161512",
        image: "https://image.yes24.com/goods/126161512/XL"
      },
      {
        title: "코딩 테스트 합격자 되기 - 파이썬 편",
        role: "기획/편집/삽화",
        url: "https://www.yes24.com/product/goods/123272392",
        image: "https://image.yes24.com/goods/123272392/XL"
      },
      {
        title: "코딩 테스트 합격자 되기 - 자바 편",
        role: "기획/편집/삽화",
        url: "https://www.yes24.com/product/goods/125183948",
        image: "https://image.yes24.com/goods/125183948/XL"
      },
      {
        title: "코딩 테스트 합격자 되기 - 자바스크립트 편",
        role: "기획/편집/삽화",
        url: "https://www.yes24.com/product/goods/128182419",
        image: "https://image.yes24.com/goods/128182419/XL"
      },
      {
        title: "정말 쉽네? 챗GPT 구글 업무 자동화",
        role: "기획/편집/삽화/표지 삽화",
        url: "https://www.yes24.com/product/goods/142787946",
        image: "https://image.yes24.com/goods/142787946/XL"
      }
    ],
    easyspub: [
      {
        title: "Do it! C++ 완전 정복",
        role: "기획",
        url: "https://www.yes24.com/product/goods/125606390",
        image: "https://image.yes24.com/goods/125606390/XL"
      },
      {
        title: "Do it! 알고리즘 코딩 테스트 자바 편",
        role: "기획",
        url: "https://www.yes24.com/product/goods/108571508",
        image: "https://image.yes24.com/goods/108571508/XL"
      },
      {
        title: "Do it! 알고리즘 코딩 테스트 C++ 편",
        role: "기획",
        url: "https://www.yes24.com/product/goods/116431190",
        image: "https://image.yes24.com/goods/116431190/XL"
      },
      {
        title: "Do it! 알고리즘 코딩 테스트 - 파이썬 편",
        role: "기획",
        url: "https://www.yes24.com/product/goods/111686187",
        image: "https://image.yes24.com/goods/111686187/XL"
      },
      {
        title: "Do it! 쉽게 배우는 파이썬 데이터 분석",
        role: "기획/편집",
        url: "https://www.yes24.com/product/goods/108947478",
        image: "https://image.yes24.com/goods/108947478/XL",
        note: "세종도서"
      },
      {
        title: "Do it! 자료구조와 함께 배우는 알고리즘 입문 : 파이썬 편",
        role: "기획",
        url: "https://www.yes24.com/product/goods/91219874",
        image: "https://image.yes24.com/goods/91219874/XL"
      },
      {
        title: "Do it! 자료구조와 함께 배우는 알고리즘 입문 : 자바 편",
        role: "기획",
        url: "https://www.yes24.com/product/goods/60547893",
        image: "https://image.yes24.com/goods/60547893/XL"
      },
      {
        title: "Do it! 자료구조와 함께 배우는 알고리즘 입문 : C 언어 편",
        role: "기획/편집",
        url: "https://www.yes24.com/product/goods/57798536",
        image: "https://image.yes24.com/goods/57798536/XL"
      },
      {
        title: "Do it! SQL 입문",
        role: "기획",
        url: "https://www.yes24.com/product/goods/110262600",
        image: "https://image.yes24.com/goods/110262600/XL"
      },
      {
        title: "Do it! 쉽게 배우는 R 텍스트 마이닝",
        role: "기획/편집",
        url: "https://www.yes24.com/product/goods/97126355",
        image: "https://image.yes24.com/goods/97126355/XL"
      },
      {
        title: "Do it! 자바스크립트+제이쿼리 입문",
        role: "개정",
        url: "https://www.yes24.com/product/goods/59461086",
        image: "https://image.yes24.com/goods/59461086/XL"
      },
      {
        title: "Do it! 딥러닝 입문",
        role: "기획/편집",
        url: "https://www.yes24.com/product/goods/78896574",
        image: "https://image.yes24.com/goods/78896574/XL"
      },
      {
        title: "Do it! 딥러닝 교과서",
        role: "기획/편집/삽화",
        url: "https://www.yes24.com/product/goods/104229648",
        image: "https://image.yes24.com/goods/104229648/XL"
      },
      {
        title: "Do it! 데이터 분석을 위한 판다스 입문",
        role: "기획",
        url: "https://www.yes24.com/product/goods/64625506",
        image: "https://image.yes24.com/goods/64625506/XL"
      },
      {
        title: "IT 5분 잡학사전",
        role: "기획/편집",
        url: "https://www.yes24.com/product/goods/113463430",
        image: "https://image.yes24.com/goods/113463430/XL"
      },
      {
        title: "Do it! 프로덕트 디자인 입문 with 피그마",
        role: "기획/편집",
        url: "https://www.yes24.com/product/goods/116918123",
        image: "https://image.yes24.com/goods/116918123/XL"
      },
      {
        title: "Do it! 코틀린 프로그래밍",
        role: "기획/편집",
        url: "https://www.yes24.com/product/goods/74035266",
        image: "https://image.yes24.com/goods/74035266/XL"
      },
      {
        title: "Do it! 점프 투 장고",
        role: "기획/편집",
        url: "https://www.yes24.com/product/goods/96376772",
        image: "https://image.yes24.com/goods/96376772/XL"
      },
      {
        title: "Do it! 점프 투 플라스크",
        role: "기획/편집",
        url: "https://www.yes24.com/product/goods/95751850",
        image: "https://image.yes24.com/goods/95751850/XL"
      },
      {
        title: "Do it! 깡샘의 안드로이드 앱 프로그래밍 with 코틀린",
        role: "편집",
        url: "https://www.yes24.com/product/goods/116012310",
        image: "https://image.yes24.com/goods/116012310/XL"
      },
      {
        title: "Do it! 클론 코딩 영화 평점 웹서비스",
        role: "기획/편집",
        url: "https://www.yes24.com/product/goods/90344496",
        image: "https://image.yes24.com/goods/90344496/XL"
      },
      {
        title: "Do it! 프로그레시브 웹앱 만들기",
        role: "기획",
        url: "https://www.yes24.com/product/goods/91724510",
        image: "https://image.yes24.com/goods/91724510/XL"
      },
      {
        title: "Do it! 클론 코딩 줌",
        role: "기획",
        url: "https://www.yes24.com/product/goods/109316768",
        image: "https://image.yes24.com/goods/109316768/XL"
      },
      {
        title: "Do it! 클론 코딩 트위터",
        role: "기획/편집",
        url: "https://www.yes24.com/product/goods/103190780",
        image: "https://image.yes24.com/goods/103190780/XL"
      },
      {
        title: "Do it! 강화 학습 입문",
        role: "기획/편집",
        url: "https://www.yes24.com/product/goods/101924618",
        image: "https://image.yes24.com/goods/101924618/XL"
      },
      {
        title: "Do it! 반응형 웹 만들기",
        role: "편집",
        url: "https://www.yes24.com/product/goods/41008186",
        image: "https://image.yes24.com/goods/41008186/XL"
      },
      {
        title: "Do it! 리액트 프로그래밍 정석",
        role: "기획/편집",
        url: "https://www.yes24.com/product/goods/87631428",
        image: "https://image.yes24.com/goods/87631428/XL"
      },
      {
        title: "Do it! 지옥에서 온 문서 관리자 깃&깃허브 입문",
        role: "기획",
        url: "https://www.yes24.com/product/goods/84803146",
        image: "https://image.yes24.com/goods/84803146/XL"
      }
    ]
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">📚 편집한 도서</h1>
        <p className="text-xl text-gray-600">
          {siteConfig.author.name}가 기획하고 편집한 도서들입니다
        </p>
      </div>

      {/* Golden Rabbit Books */}
      <div className="space-y-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            🏢 골든래빗 (~현재)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {books.goldenrabbit.map((book, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                {/* Book Cover */}
                <div className="mb-3">
                  <div className="w-full h-48 bg-gray-200 rounded overflow-hidden">
                    <Image 
                      src={book.image}
                      alt={book.title}
                      width={200}
                      height={240}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                {/* Book Info */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-gray-500 bg-gray-200 px-2 py-1 rounded">
                      {index + 1}
                    </span>
                    <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                      {book.role}
                    </span>
                  </div>
                  <h3 className="text-gray-900 font-medium text-sm leading-tight line-clamp-3">
                    {book.title}
                  </h3>
                  <a
                    href={book.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-full text-center text-blue-600 hover:text-blue-800 text-sm font-medium py-2 px-3 bg-blue-50 rounded hover:bg-blue-100 transition-colors"
                  >
                    살펴보기 →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* EasySPub Books */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            📖 이지스퍼블리싱 (2017~2023)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {books.easyspub.map((book, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                {/* Book Cover */}
                <div className="mb-3">
                  <div className="w-full h-48 bg-gray-200 rounded overflow-hidden">
                    <Image 
                      src={book.image}
                      alt={book.title}
                      width={200}
                      height={240}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                {/* Book Info */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-gray-500 bg-gray-200 px-2 py-1 rounded">
                      {index + 1}
                    </span>
                    <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded">
                      {book.role}
                    </span>
                    {book.note && (
                      <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">
                        {book.note}
                      </span>
                    )}
                  </div>
                  <h3 className="text-gray-900 font-medium text-sm leading-tight line-clamp-3">
                    {book.title}
                  </h3>
                  <a
                    href={book.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-full text-center text-blue-600 hover:text-blue-800 text-sm font-medium py-2 px-3 bg-blue-50 rounded hover:bg-blue-100 transition-colors"
                  >
                    살펴보기 →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-gray-900">
              {books.goldenrabbit.length + books.easyspub.length}
            </div>
            <div className="text-sm text-gray-600">총 도서 수</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">
              {books.goldenrabbit.length}
            </div>
            <div className="text-sm text-gray-600">골든래빗</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">
              {books.easyspub.length}
            </div>
            <div className="text-sm text-gray-600">이지스퍼블리싱</div>
          </div>
        </div>
      </div>
    </div>
  )
} 