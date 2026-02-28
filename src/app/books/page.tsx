import { siteConfig } from '@/lib/config'
import Image from 'next/image'

export default function BooksPage() {
  const books = {
    goldenrabbit: [
      {
        title: "요즘 바이브 코딩 깃허브 코파일럿 31가지 프로그램 만들기",
        role: "기획/집필",
        url: "https://www.yes24.com/product/goods/167428992",
        image: "https://image.yes24.com/goods/167428992/XL"
      },
      {
        title: "요즘 바이브 코딩 커서 AI 30가지 프로그램 만들기",
        role: "기획/집필",
        url: "https://www.yes24.com/product/goods/153029475",
        image: "https://image.yes24.com/goods/153029475/XL"
      },
      {
        title: "요즘 바이브 코딩 클로드 코드 완벽 가이드",
        role: "기획/편집",
        url: "https://www.yes24.com/product/goods/151850127",
        image: "https://image.yes24.com/goods/151850127/XL"
      },
      {
        title: "이게 되네? 클로드 MCP 미친 활용법 27제",
        role: "기획/편집",
        url: "https://www.yes24.com/product/goods/147957269",
        image: "https://image.yes24.com/goods/147957269/XL"
      },
      {
        title: "이게 되네? 챗GPT 미친 크롤링 24제",
        role: "기획/편집",
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

  const PUBLISHER_COLORS: Record<string, { color: string; code: string }> = {
    goldenrabbit: { color: '#D97757', code: '16-1441 TCX' },
    easyspub:     { color: '#6B8F71', code: '16-5917 TCX' },
  }

  return (
    <div className="space-y-10">
      {/* Pantone-style header */}
      <section className="border border-pantone-border overflow-hidden">
        <div className="bg-pantone-blue h-24 sm:h-32 flex items-center justify-center">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wider uppercase">
            Books
          </h1>
        </div>
        <div className="bg-white px-6 py-4 space-y-1">
          <p className="pantone-label">PANTONE</p>
          <p className="text-sm font-medium text-gray-500">16-1441 TCX · Warm Coral</p>
          <p className="text-sm text-gray-500">
            {siteConfig.author.name}가 기획하고 편집한 도서들입니다
          </p>
        </div>
      </section>

      {/* Book sections */}
      {([
        { key: 'goldenrabbit', label: '골든래빗', period: '~현재', list: books.goldenrabbit },
        { key: 'easyspub', label: '이지스퍼블리싱', period: '2017~2023', list: books.easyspub },
      ] as const).map((publisher) => {
        const pub = PUBLISHER_COLORS[publisher.key]
        return (
          <section key={publisher.key} className="space-y-5">
            <div className="pantone-section">
              <div className="section-swatch h-14 flex items-center justify-center" style={{ backgroundColor: pub.color }}>
                <span className="text-sm font-bold text-white tracking-widest uppercase">
                  {publisher.label} ({publisher.period})
                </span>
              </div>
              <div className="section-body !py-2">
                <p className="pantone-label">PANTONE</p>
                <p className="pantone-code">{pub.code} · {publisher.list.length}권</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {publisher.list.map((book, index) => (
                <div key={index} className="pantone-chip">
                  <div className="chip-swatch">
                    <div className="w-full aspect-[3/4] bg-gray-100 overflow-hidden">
                      <Image 
                        src={book.image}
                        alt={book.title}
                        width={200}
                        height={267}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="chip-info !gap-1.5">
                    <p className="pantone-label">PANTONE</p>
                    <span
                      className="text-[10px] font-medium px-2 py-0.5 self-start"
                      style={{ backgroundColor: pub.color + '15', color: pub.color }}
                    >
                      {book.role}
                    </span>
                    <h3 className="text-xs font-semibold text-pantone-ink leading-tight line-clamp-2">
                      {book.title}
                    </h3>
                    <a
                      href={book.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] text-pantone-blue hover:underline mt-auto"
                    >
                      살펴보기 →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )
      })}

      {/* Stats */}
      <section className="pantone-section">
        <div className="flex h-2">
          <div className="flex-1 bg-pantone-blue" />
          <div className="flex-1 bg-cat-study" />
        </div>
        <div className="section-body">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-extrabold text-pantone-ink">
                {books.goldenrabbit.length + books.easyspub.length}
              </div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wider">Total</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-pantone-blue">
                {books.goldenrabbit.length}
              </div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wider">골든래빗</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-cat-study">
                {books.easyspub.length}
              </div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wider">이지스퍼블리싱</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
