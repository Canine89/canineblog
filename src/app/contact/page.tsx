import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '연락처',
  description: '편집자P의 편집실 연락처 - 블로그 운영자와 연락하는 방법을 안내합니다.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">연락처</h1>
      
      <div className="space-y-8">
        {/* 운영자 소개 */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                P
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">편집자P</h2>
              <p className="text-gray-700 mb-4">
                개발이 취미인 컴공과 출신 IT 도서 기획/편집자입니다. 
                사내에서 사용하는 각종 자동화 앱을 파이썬, 자바스크립트로 개발하여 적극 활용하고 있습니다. 
                IT 지식을 더 쉽게 나누기 위해 책을 쓰고, 유튜브와 쇼츠를 제작합니다.
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>📧 hgpark@goldenrabbit.co.kr</span>
                <span>🏢 골든래빗 출판사</span>
              </div>
            </div>
          </div>
        </section>

        <div className="grid md:grid-cols-2 gap-8">
          {/* 이메일 연락 */}
          <section className="bg-white border border-gray-200 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-3">📧</span>
              <h3 className="text-lg font-semibold text-gray-900">이메일 문의</h3>
            </div>
            <p className="text-gray-600 mb-4">
              블로그, 도서 편집, 기술 문의 등 모든 연락사항은 이메일로 문의해 주세요.
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded">
                <span className="font-medium text-gray-900">이메일</span>
                <a 
                  href="mailto:hgpark@goldenrabbit.co.kr"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  hgpark@goldenrabbit.co.kr
                </a>
              </div>
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded">
                <span className="font-medium text-gray-900">응답 시간</span>
                <span className="text-gray-600">1-3 영업일 내</span>
              </div>
            </div>
          </section>

          {/* 소셜 미디어 */}
          <section className="bg-white border border-gray-200 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-3">🌐</span>
              <h3 className="text-lg font-semibold text-gray-900">소셜 미디어</h3>
            </div>
            <p className="text-gray-600 mb-4">
              일상적인 개발 이야기와 최신 소식을 소셜 미디어에서 만나보세요.
            </p>
            <div className="space-y-3">
              <a 
                href="https://github.com/canine89"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-gray-50 p-3 rounded hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center">
                  <span className="mr-3">🐙</span>
                  <span className="font-medium text-gray-900">GitHub</span>
                </div>
                <span className="text-blue-600">@canine89 →</span>
              </a>
              <a 
                href="https://www.threads.net/@limedaddy_8924"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-gray-50 p-3 rounded hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center">
                  <span className="mr-3">🧵</span>
                  <span className="font-medium text-gray-900">Threads</span>
                </div>
                <span className="text-blue-600">@limedaddy_8924 →</span>
              </a>
            </div>
          </section>
        </div>

        {/* 문의 유형별 안내 */}
        <section>
          <h3 className="text-xl font-semibold text-gray-900 mb-6">문의 유형별 안내</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <div className="flex items-center mb-3">
                <span className="text-xl mr-2">📚</span>
                <h4 className="font-semibold text-blue-900">도서 관련</h4>
              </div>
              <p className="text-sm text-blue-800 mb-3">
                출간 도서 문의, 편집 의뢰, 저자 상담
              </p>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• 도서 출간 과정 문의</li>
                <li>• 편집 서비스 문의</li>
                <li>• 기술 검토 요청</li>
                <li>• 집필 상담</li>
              </ul>
            </div>

            <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
              <div className="flex items-center mb-3">
                <span className="text-xl mr-2">💻</span>
                <h4 className="font-semibold text-green-900">기술 문의</h4>
              </div>
              <p className="text-sm text-green-800 mb-3">
                개발 관련 질문, 자동화 도구 문의
              </p>
              <ul className="text-xs text-green-700 space-y-1">
                <li>• 파이썬/자바스크립트 질문</li>
                <li>• 자동화 도구 사용법</li>
                <li>• 코드 리뷰 요청</li>
                <li>• 프로젝트 아이디어</li>
              </ul>
            </div>

            <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
              <div className="flex items-center mb-3">
                <span className="text-xl mr-2">🗣️</span>
                <h4 className="font-semibold text-purple-900">기타 문의</h4>
              </div>
              <p className="text-sm text-purple-800 mb-3">
                블로그 관련, 협업 제안, 일반 문의
              </p>
              <ul className="text-xs text-purple-700 space-y-1">
                <li>• 블로그 콘텐츠 제안</li>
                <li>• 협업/파트너십 제안</li>
                <li>• 강연/세미나 요청</li>
                <li>• 미디어 인터뷰</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 자주 묻는 질문 */}
        <section>
          <h3 className="text-xl font-semibold text-gray-900 mb-6">자주 묻는 질문</h3>
          <div className="space-y-4">
            <details className="bg-white border border-gray-200 rounded-lg">
              <summary className="p-4 cursor-pointer hover:bg-gray-50 font-medium text-gray-900">
                📖 어떤 분야의 도서를 주로 편집하시나요?
              </summary>
              <div className="p-4 pt-0 text-gray-700">
                <p>
                  주로 IT 기술서적, 특히 파이썬, 자바스크립트, 웹 개발, 자동화 도구 관련 도서를 편집합니다. 
                  골든래빗 출판사에서 초보자도 이해하기 쉬운 실용적인 기술서를 만드는 것을 목표로 하고 있습니다.
                </p>
              </div>
            </details>

            <details className="bg-white border border-gray-200 rounded-lg">
              <summary className="p-4 cursor-pointer hover:bg-gray-50 font-medium text-gray-900">
                ⏰ 이메일 문의에 대한 응답은 얼마나 걸리나요?
              </summary>
              <div className="p-4 pt-0 text-gray-700">
                <p>
                  일반적으로 1-3 영업일 내에 답변드립니다. 
                  출간 일정이 바쁘거나 휴가 기간에는 응답이 지연될 수 있으니 양해 부탁드립니다.
                </p>
              </div>
            </details>

            <details className="bg-white border border-gray-200 rounded-lg">
              <summary className="p-4 cursor-pointer hover:bg-gray-50 font-medium text-gray-900">
                🤝 외부 프로젝트 참여나 협업이 가능한가요?
              </summary>
              <div className="p-4 pt-0 text-gray-700">
                <p>
                  IT 도서 편집, 기술 검토, 콘텐츠 제작 등의 협업은 가능합니다. 
                  단, 본업과의 일정 조율이 필요하므로 구체적인 내용과 일정을 이메일로 문의해 주세요.
                </p>
              </div>
            </details>

            <details className="bg-white border border-gray-200 rounded-lg">
              <summary className="p-4 cursor-pointer hover:bg-gray-50 font-medium text-gray-900">
                📝 블로그 포스트에 대한 질문이나 정정 요청을 하려면?
              </summary>
              <div className="p-4 pt-0 text-gray-700">
                <p>
                  블로그 내용에 대한 질문이나 정정이 필요한 부분이 있다면 이메일로 연락해 주세요. 
                  해당 포스트 제목과 구체적인 내용을 명시해 주시면 빠르게 확인하고 답변드리겠습니다.
                </p>
              </div>
            </details>
          </div>
        </section>

        {/* 블로그 관련 정보 */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">블로그 정보</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">기술 스택</h4>
              <ul className="text-gray-600 space-y-1">
                <li>• Next.js 15.4.4</li>
                <li>• TypeScript</li>
                <li>• Tailwind CSS</li>
                <li>• Vercel 배포</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">정책 준수</h4>
              <ul className="text-gray-600 space-y-1">
                <li>• <Link href="/privacy" className="text-blue-600 hover:text-blue-800 underline">개인정보 처리방침</Link></li>
                <li>• <Link href="/terms" className="text-blue-600 hover:text-blue-800 underline">이용약관</Link></li>
                <li>• <Link href="/disclaimer" className="text-blue-600 hover:text-blue-800 underline">면책조항</Link></li>
                <li>• Google AdSense 정책 준수</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 연락처 푸터 */}
        <section className="text-center pt-8 border-t border-gray-200">
          <p className="text-gray-600 mb-4">
            편집자P의 편집실에 관심과 사랑을 보내주셔서 감사합니다!
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-500">
            <span>🏢 골든래빗 출판사</span>
            <span>📧 hgpark@goldenrabbit.co.kr</span>
            <span>🌐 https://canineblog.vercel.app</span>
          </div>
        </section>
      </div>
    </div>
  )
}