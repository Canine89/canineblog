import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '개인정보 처리방침',
  description: '편집자P의 편집실 개인정보 처리방침 - Google AdSense, 쿠키 사용 및 데이터 처리 방침을 안내합니다.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">개인정보 처리방침</h1>
      
      <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. 개인정보 수집 및 이용 목적</h2>
          <p className="mb-4">
            편집자P의 편집실(&apos;https://canineblog.vercel.app&apos;, 이하 &apos;본 사이트&apos;)은 다음의 목적을 위하여 개인정보를 처리합니다:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>웹사이트 서비스 제공 및 운영</li>
            <li>사용자 경험 개선 및 맞춤형 콘텐츠 제공</li>
            <li>웹사이트 통계 분석 및 개선</li>
            <li>광고 서비스 제공 (Google AdSense)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. 수집하는 개인정보 항목</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">자동 수집 정보</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>IP 주소</li>
                <li>쿠키 및 세션 정보</li>
                <li>브라우저 정보 (종류, 버전)</li>
                <li>운영체제 정보</li>
                <li>방문 페이지 및 체류시간</li>
                <li>리퍼러 정보</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. 개인정보 처리 및 보유기간</h2>
          <p className="mb-4">
            본 사이트는 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>웹사이트 방문 기록: 1년</li>
            <li>쿠키 정보: 브라우저 설정에 따름 (최대 2년)</li>
            <li>Google Analytics 데이터: Google 정책에 따름</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. 쿠키(Cookie) 사용에 대한 안내</h2>
          <div className="space-y-4">
            <p>
              본 사이트는 서비스 제공을 위해 쿠키를 사용합니다. 쿠키는 웹사이트 방문 시 브라우저에 저장되는 작은 텍스트 파일입니다.
            </p>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">쿠키 사용 목적</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>사용자 설정 기억 및 서비스 최적화</li>
                <li>웹사이트 트래픽 분석 (Google Analytics)</li>
                <li>맞춤형 광고 제공 (Google AdSense)</li>
                <li>사용자 경험 개선</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">쿠키 거부 방법</h3>
              <p className="mb-2">
                사용자는 브라우저 설정을 통해 쿠키 설치를 거부할 수 있으나, 이 경우 일부 서비스 이용에 제한이 있을 수 있습니다.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Google AdSense 및 제3자 서비스</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Google AdSense</h3>
              <p className="mb-2">
                본 사이트는 Google AdSense를 사용하여 광고를 게재합니다. Google은 다음과 같은 정보를 수집할 수 있습니다:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>웹사이트 방문 기록</li>
                <li>광고 클릭 및 상호작용 정보</li>
                <li>디바이스 정보 및 브라우저 정보</li>
                <li>관심사 기반 광고를 위한 데이터</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Google Analytics</h3>
              <p className="mb-2">
                웹사이트 트래픽 분석을 위해 Google Analytics를 사용하며, 이는 익명화된 형태로 데이터를 수집합니다.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">개인화 광고 차단</h3>
              <p className="mb-2">
                사용자는 다음 방법으로 개인화 광고를 차단할 수 있습니다:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li><a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">Google 광고 설정</a>에서 개인화 광고 해제</li>
                <li><a href="http://www.aboutads.info/choices" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">Digital Advertising Alliance</a>에서 옵트아웃</li>
                <li><a href="http://www.networkadvertising.org/managing/opt_out.asp" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">Network Advertising Initiative</a>에서 옵트아웃</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. 개인정보 보호를 위한 기술적/관리적 대책</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>HTTPS 암호화 통신 적용</li>
            <li>개인정보 접근 권한 제한</li>
            <li>정기적인 보안 점검 및 업데이트</li>
            <li>개인정보 처리 기록 관리</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. 이용자의 권리와 그 행사방법</h2>
          <p className="mb-4">
            이용자는 개인정보 처리에 관하여 다음과 같은 권리를 가집니다:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>개인정보 처리 현황에 대한 통지 요구권</li>
            <li>개인정보 열람 요구권</li>
            <li>개인정보 정정·삭제 요구권</li>
            <li>개인정보 처리정지 요구권</li>
          </ul>
          <p className="mt-4">
            위 권리 행사는 개인정보보호법 시행령 제41조 제1항에 따라 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. GDPR (General Data Protection Regulation) 준수</h2>
          <p className="mb-4">
            EU 거주자에 대해서는 GDPR에 따른 다음 권리를 보장합니다:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>정보 접근권 (Right of Access)</li>
            <li>정정권 (Right of Rectification)</li>
            <li>삭제권 (Right to Erasure)</li>
            <li>처리 제한권 (Right to Restriction of Processing)</li>
            <li>데이터 이동권 (Right to Data Portability)</li>
            <li>이의제기권 (Right to Object)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. 개인정보 보호책임자</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p><strong>개인정보 보호책임자:</strong> 편집자P</p>
            <p><strong>이메일:</strong> hgpark@goldenrabbit.co.kr</p>
            <p><strong>연락처:</strong> 본 사이트 연락처 페이지 참조</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. 개인정보 처리방침 변경</h2>
          <p>
            이 개인정보 처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 
            변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
          </p>
        </section>

        <section>
          <p className="text-sm text-gray-600 mt-8 pt-4 border-t border-gray-200">
            <strong>시행일자:</strong> 2025년 1월 1일<br/>
            <strong>최종 수정:</strong> 2025년 1월 11일
          </p>
        </section>
      </div>
    </div>
  )
}