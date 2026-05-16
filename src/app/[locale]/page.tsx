import { getAllPosts } from '@/lib/markdown'
import { siteConfig } from '@/lib/config'
import { ScrollFade } from '@/components/ScrollFade'
import { PostGrid } from '@/components/PostGrid'
import { getServerT } from '@/i18n/server'
import { isLocale, type Locale } from '@/i18n/config'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import type { CSSProperties } from 'react'

function typeStyle(
  chars: number,
  delay: string,
  width: string,
  duration = '0.72s'
): CSSProperties {
  return {
    '--type-chars': chars,
    '--type-delay': delay,
    '--type-duration': duration,
    '--type-width': width,
  } as CSSProperties
}

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
    <div className="home-editorial-stage relative left-1/2 -ml-[50vw] -mt-10 w-screen overflow-hidden chip-hero-enter">
      <div className="editor-desk-scene" aria-hidden="true">
        <Image
          src="/assets/book-editorial-desk/hero-magnifier-page-proof-book-darts.png"
          alt=""
          width={1536}
          height={1024}
          className="editor-desk-scene__asset editor-desk-scene__asset--proof"
          priority
        />
        <Image
          src="/assets/book-editorial-desk/hero-editor-tool-tray-stamp-pad.png"
          alt=""
          width={1536}
          height={1024}
          className="editor-desk-scene__asset editor-desk-scene__asset--tray"
          priority
        />
        <Image
          src="/assets/book-editorial-desk/hero-manuscript-red-pencil-paperweight.png"
          alt=""
          width={1536}
          height={1024}
          className="editor-desk-scene__asset editor-desk-scene__asset--manuscript"
          priority
        />
      </div>

      <div
        className="liquid-hero flex min-h-[640px] flex-col px-6 py-8 sm:min-h-[680px] sm:px-10 lg:px-14"
      >
        <ScrollFade className="mx-auto flex w-full max-w-6xl flex-1 items-center px-0" distance={100}>
            <div className="grid w-full gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div className="space-y-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/55">
                  AI / AGENT Editorial Lab
                </p>
                <h1
                  className="hero-title max-w-3xl text-5xl font-medium leading-[1.02] tracking-[-0.055em] text-white sm:text-7xl lg:text-8xl"
                >
                  {locale === 'ko' ? (
                    <>
                      <span className="hero-type-line" style={typeStyle(5, '0.18s', '5.1em')}>
                        편집자P의
                      </span>
                      <span className="hero-type-line" style={typeStyle(8, '0.92s', '4.9em')}>
                        AI/AGENT
                      </span>
                      <span className="hero-type-line" style={typeStyle(3, '1.84s', '3.05em', '0.52s')}>
                        편집실
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="hero-type-line" style={typeStyle(10, '0.18s', '6.2em', '0.82s')}>
                        Editor P&apos;s
                      </span>
                      <span className="hero-type-line" style={typeStyle(15, '1.08s', '9.4em', '1.05s')}>
                        AI/AGENT Studio
                      </span>
                    </>
                  )}
                </h1>
                <p
                  className="hero-type-subtitle max-w-xl text-base font-medium leading-7 text-white/72 sm:text-lg"
                  style={
                    locale === 'ko'
                      ? typeStyle(13, '2.34s', '13.5em', '0.9s')
                      : typeStyle(24, '2.32s', '17.5em', '1.08s')
                  }
                >
                  {t('site.description')}
                </p>
              </div>

              <div className="liquid-profile-panel">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/48">
                    Profile
                  </p>
                  <h2 className="mt-2 text-3xl font-medium tracking-[-0.04em] text-white sm:text-4xl">
                    편집자P
                  </h2>
                </div>

                <p className="mt-5 text-sm leading-7 text-white/76">
                  개발이 취미인 컴공과 출신 IT 도서 기획/편집자이자 IT 애호가입니다.
                  활동명 편집자P로 더 많이 알려져 있습니다. 사내 자동화 앱을 파이썬,
                  자바스크립트로 개발해 활용하고, IT 지식을 쉽게 나누기 위해 책과 영상,
                  ai100.co.kr을 운영합니다.
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg border border-white/10 bg-white/[0.07] p-4">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/48">
                      저서
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-white/78">
                      챗GPT 크롤링 · 클로드 MCP · 커서 AI · 깃허브 코파일럿 · 바로바로 바이브 코딩
                    </p>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/[0.07] p-4">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/48">
                      강의
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-white/78">
                      대구 NIA · 한국로봇산업진흥원 · 멀티캠퍼스 MCP 강의 외 다수
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2 text-xs font-medium">
                  <span className="rounded-full border border-white/15 bg-white/[0.07] px-3 py-1.5 text-white/76 backdrop-blur-md">
                    커서 공식 앰베서더
                  </span>
                  <a
                    href={siteConfig.author.social.instructor}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-white/90 backdrop-blur-md transition-colors hover:border-white/45 hover:bg-white/18"
                  >
                    강사 소개 상세
                  </a>
                  <a
                    href={siteConfig.author.social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-white/90 backdrop-blur-md transition-colors hover:border-white/45 hover:bg-white/18"
                  >
                    유튜브
                  </a>
                  <a
                    href={`mailto:${siteConfig.author.email}`}
                    className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-white/90 backdrop-blur-md transition-colors hover:border-white/45 hover:bg-white/18"
                  >
                    강의/홍보 문의
                  </a>
                  <a
                    href="https://ai100.co.kr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-white/90 backdrop-blur-md transition-colors hover:border-white/45 hover:bg-white/18"
                  >
                    ai100.co.kr
                  </a>
                </div>
              </div>
            </div>
        </ScrollFade>

        <div className="mx-auto flex w-full max-w-6xl justify-end pb-4">
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

      <div className="home-editorial-posts mx-auto w-full max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
        <ScrollFade mode="reveal" direction="fade-in-only">
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
        </ScrollFade>
      </div>
    </div>
  )
}
