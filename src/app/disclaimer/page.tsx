import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '면책조항',
  description: '편집자P의 편집실 면책조항 - 블로그 콘텐츠 이용 시 유의사항과 법적 면책사항을 안내합니다.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">면책조항</h1>
      
      <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <span className="text-yellow-400 text-xl">⚠️</span>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-800">
                <strong>중요 고지:</strong> 이 면책조항은 편집자P의 편집실(&apos;https://canineblog.vercel.app&apos;)을 
                이용하기 전에 반드시 읽어보시기 바랍니다. 본 사이트를 이용함으로써 이 면책조항에 동의하는 것으로 간주됩니다.
              </p>
            </div>
          </div>
        </div>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. 일반 면책사항</h2>
          <p className="mb-4">
            편집자P의 편집실(이하 &apos;본 사이트&apos;)에서 제공하는 모든 콘텐츠는 정보 제공 및 교육 목적으로만 
            제공됩니다. 본 사이트는 다음과 같은 사항에 대해 어떠한 법적 책임도 지지 않습니다:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>본 사이트 콘텐츠의 정확성, 완전성, 신뢰성에 대한 보장</li>
            <li>본 사이트 이용으로 인한 직접적 또는 간접적 손해</li>
            <li>제3자가 제공하는 정보나 서비스로 인한 손해</li>
            <li>기술적 오류, 시스템 장애, 데이터 손실로 인한 손해</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. 콘텐츠 면책사항</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">기술 정보 및 개발 팁</h3>
              <p className="mb-2">
                본 사이트에서 제공하는 개발 관련 정보, 코드 예제, 기술 팁은 다음과 같은 특성을 가집니다:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>개인적인 경험과 의견에 기반한 내용일 수 있음</li>
                <li>특정 환경에서만 적용 가능할 수 있음</li>
                <li>시간이 경과함에 따라 정확성이 변할 수 있음</li>
                <li>모든 상황에 적용 가능하다고 보장할 수 없음</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">도서 리뷰 및 편집 후기</h3>
              <p className="mb-2">
                도서에 대한 리뷰와 편집 경험은 개인적인 견해이며:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>주관적인 평가와 의견이 포함됨</li>
                <li>독자의 배경지식이나 경험에 따라 다르게 해석될 수 있음</li>
                <li>도서 구매나 학습 결정에 대한 책임은 독자에게 있음</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. 기술적 면책사항</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">코드 사용</h3>
              <p className="mb-2">
                본 사이트에서 제공하는 코드 예제에 대해 다음 사항을 유의하시기 바랍니다:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>코드는 교육 목적으로 제공되며, 상업적 사용시 추가 검토 필요</li>
                <li>프로덕션 환경에서 사용 전 충분한 테스트 필요</li>
                <li>보안 검토 및 최적화 과정 필요</li>
                <li>코드 사용으로 인한 시스템 오류나 데이터 손실에 대한 책임 없음</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">자동화 도구 및 스크립트</h3>
              <p className="mb-2">
                자동화 관련 콘텐츠 사용 시:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>사용자 환경에 맞는 수정 및 테스트 필요</li>
                <li>중요한 데이터의 백업 필수</li>
                <li>권한 및 보안 설정 재검토 필요</li>
                <li>예상치 못한 결과에 대한 책임 면제</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. 제3자 콘텐츠 및 링크</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">외부 링크</h3>
              <p>
                본 사이트에 포함된 외부 사이트로의 링크는 정보 제공 목적으로만 제공됩니다. 
                외부 사이트의 콘텐츠, 개인정보보호정책, 서비스에 대해서는 책임을 지지 않습니다.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">광고 콘텐츠</h3>
              <p>
                Google AdSense를 통해 제공되는 광고는 Google의 정책에 따라 표시되며, 
                광고 내용이나 광고된 제품/서비스에 대한 책임은 지지 않습니다.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. 지적재산권 면책</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">저작권 관련</h3>
              <p className="mb-2">
                본 사이트는 지적재산권을 존중하며 다음과 같이 명시합니다:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>모든 콘텐츠는 저작권법의 보호를 받음</li>
                <li>제3자의 저작권을 침해하지 않도록 노력함</li>
                <li>저작권 침해 주장 시 적절한 조치를 취함</li>
                <li>의도치 않은 저작권 침해에 대한 선의의 대응</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">오픈소스 및 라이선스</h3>
              <p>
                오픈소스 프로젝트나 라이선스가 있는 콘텐츠를 언급할 때는 해당 라이선스를 
                준수하되, 라이선스 해석이나 적용에 대한 법적 책임은 지지 않습니다.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. 개인정보 및 데이터 면책</h2>
          <p className="mb-4">
            개인정보보호에 최선을 다하되, 다음과 같은 경우에는 책임을 면합니다:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>이용자의 부주의로 인한 개인정보 노출</li>
            <li>제3자의 불법적인 접근이나 해킹으로 인한 정보 유출</li>
            <li>시스템 오류나 통신 장애로 인한 데이터 손실</li>
            <li>관련 법령에 따른 정보 제공 요구 시의 정보 제공</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. 서비스 이용 면책</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">서비스 중단</h3>
              <p>
                다음과 같은 사유로 인한 서비스 중단에 대해서는 책임을 지지 않습니다:
              </p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>정기 또는 비정기 점검, 업데이트</li>
                <li>서버 장애, 네트워크 문제</li>
                <li>천재지변, 전쟁, 테러 등 불가항력적 사유</li>
                <li>제3자 서비스 제공업체의 서비스 중단</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">이용자간 분쟁</h3>
              <p>
                이용자간 또는 이용자와 제3자간에 발생하는 분쟁에 대해서는 
                중재나 해결 의무가 없으며, 이로 인한 손해에 대해 책임을 지지 않습니다.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. 법적 고지사항</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">준거법</h3>
              <p>
                이 면책조항은 대한민국 법률에 따라 해석되며, 관련 분쟁은 
                관할 법원에서 해결됩니다.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">면책조항의 효력</h3>
              <p>
                이 면책조항의 일부가 법적으로 무효하다고 판단되더라도, 
                나머지 부분의 효력에는 영향을 미치지 않습니다.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. 연락처 및 문의</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="mb-2">
              이 면책조항에 대한 문의사항이 있으시면 아래 연락처로 문의해 주시기 바랍니다:
            </p>
            <ul className="space-y-1">
              <li><strong>운영자:</strong> 편집자P</li>
              <li><strong>이메일:</strong> hgpark@goldenrabbit.co.kr</li>
              <li><strong>웹사이트:</strong> https://canineblog.vercel.app</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. 면책조항 수정</h2>
          <p>
            이 면책조항은 필요에 따라 수정될 수 있으며, 변경사항은 본 사이트에 게시를 통해 
            공지됩니다. 변경된 면책조항은 게시일로부터 효력이 발생합니다.
          </p>
        </section>

        <div className="bg-red-50 border-l-4 border-red-400 p-4 mt-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <span className="text-red-400 text-xl">🚨</span>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-red-800 mb-2">최종 권고사항</h3>
              <p className="text-sm text-red-700">
                본 사이트의 정보를 중요한 결정이나 프로덕션 환경에 적용하기 전에는 
                반드시 전문가의 자문을 구하시고, 충분한 검토와 테스트를 거치시기 바랍니다. 
                본 사이트 정보의 사용은 전적으로 이용자의 책임과 판단에 달려있습니다.
              </p>
            </div>
          </div>
        </div>

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