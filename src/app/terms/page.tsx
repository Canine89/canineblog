import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '이용약관',
  description: '편집자P의 편집실 이용약관 - 블로그 서비스 이용에 관한 약관을 안내합니다.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">서비스 이용약관</h1>
      
      <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">제1조 (목적)</h2>
          <p>
            이 약관은 편집자P('https://canineblog.vercel.app', 이하 '본 사이트')가 제공하는 
            인터넷 관련 서비스(이하 '서비스')를 이용함에 있어 본 사이트와 이용자의 권리, 
            의무 및 책임사항을 규정함을 목적으로 합니다.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">제2조 (정의)</h2>
          <p className="mb-4">이 약관에서 사용하는 용어의 정의는 다음과 같습니다:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>'웹사이트'</strong>란 본 사이트가 블로그 콘텐츠 및 관련 서비스를 이용자에게 
              제공하기 위하여 컴퓨터 등 정보통신설비를 이용하여 설정한 가상의 영업장을 말합니다.
            </li>
            <li>
              <strong>'이용자'</strong>란 본 사이트에 접속하여 이 약관에 따라 본 사이트가 
              제공하는 서비스를 받는 자를 말합니다.
            </li>
            <li>
              <strong>'콘텐츠'</strong>란 본 사이트에서 제공하는 글, 이미지, 동영상 등 
              모든 정보와 자료를 말합니다.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">제3조 (약관의 효력 및 변경)</h2>
          <div className="space-y-4">
            <div>
              <p className="mb-2"><strong>① 약관의 효력</strong></p>
              <p>
                이 약관은 본 사이트에 게시하여 공시함으로써 효력이 발생합니다. 
                본 사이트는 필요시 관련 법령을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.
              </p>
            </div>
            <div>
              <p className="mb-2"><strong>② 약관의 변경</strong></p>
              <p>
                약관이 변경되는 경우, 변경된 약관은 그 효력발생일 7일 이전부터 
                본 사이트에 공지됩니다. 다만, 이용자에게 불리한 약관의 변경인 경우에는 
                30일 이전에 공지하며, 이용자가 변경에 동의하지 않는 경우 서비스 이용을 
                중단할 수 있습니다.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">제4조 (서비스의 제공 및 변경)</h2>
          <div className="space-y-4">
            <div>
              <p className="mb-2"><strong>① 서비스 내용</strong></p>
              <p>본 사이트가 제공하는 서비스는 다음과 같습니다:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>IT 도서, 개발 관련 블로그 콘텐츠 제공</li>
                <li>개발 팁 및 자동화 관련 정보 제공</li>
                <li>도서 리뷰 및 편집 후기 제공</li>
                <li>기타 본 사이트가 정하는 서비스</li>
              </ul>
            </div>
            <div>
              <p className="mb-2"><strong>② 서비스 변경</strong></p>
              <p>
                본 사이트는 운영상, 기술상의 필요에 따라 제공하고 있는 전부 또는 
                일부 서비스를 변경할 수 있습니다.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">제5조 (서비스의 중단)</h2>
          <p className="mb-4">
            본 사이트는 다음과 같은 경우에 서비스 제공을 일시적 또는 영구적으로 중단할 수 있습니다:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장, 통신의 두절 등의 사유가 발생한 경우</li>
            <li>전기통신사업법에 규정된 기간통신사업자가 전기통신 서비스를 중지했을 경우</li>
            <li>국가비상사태, 서비스 설비의 장애 또는 서비스 이용의 폭주 등으로 서비스 이용에 지장이 있는 경우</li>
            <li>기타 중대한 사유로 인하여 본 사이트가 서비스 제공을 지속하는 것이 부적당하다고 인정하는 경우</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">제6조 (이용자의 의무)</h2>
          <div className="space-y-4">
            <p>이용자는 다음 행위를 하여서는 안 됩니다:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>신청 또는 변경시 허위 내용의 등록</li>
              <li>타인의 정보 도용</li>
              <li>본 사이트에 게시된 정보의 변경</li>
              <li>본 사이트가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는 게시</li>
              <li>본 사이트 기타 제3자의 저작권 등 지적재산권에 대한 침해</li>
              <li>본 사이트 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위</li>
              <li>외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는 정보를 본 사이트에 공개 또는 게시하는 행위</li>
              <li>기타 관계법령에 위배되는 행위</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">제7조 (저작권 및 지적재산권)</h2>
          <div className="space-y-4">
            <div>
              <p className="mb-2"><strong>① 본 사이트의 권리</strong></p>
              <p>
                본 사이트가 작성한 저작물에 대한 저작권 기타 지적재산권은 본 사이트에 귀속합니다.
              </p>
            </div>
            <div>
              <p className="mb-2"><strong>② 이용자의 권리</strong></p>
              <p>
                이용자는 본 사이트를 이용함으로써 얻은 정보 중 본 사이트에게 지적재산권이 
                귀속된 정보를 본 사이트의 사전 승낙 없이 복제, 송신, 출판, 배포, 방송 기타 
                방법에 의하여 영리목적으로 이용하거나 제3자에게 이용하게 하여서는 안됩니다.
              </p>
            </div>
            <div>
              <p className="mb-2"><strong>③ 제3자 콘텐츠</strong></p>
              <p>
                본 사이트에서 제공하는 서비스 중 제3자가 제공하는 콘텐츠의 저작권은 
                해당 제3자에게 귀속됩니다.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">제8조 (개인정보보호)</h2>
          <p>
            본 사이트는 이용자의 개인정보를 보호하기 위해 개인정보처리방침을 수립하여 시행하고 있습니다. 
            자세한 내용은 <a href="/privacy" className="text-blue-600 hover:text-blue-800 underline">개인정보 처리방침</a>을 참조해 주시기 바랍니다.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">제9조 (책임제한)</h2>
          <div className="space-y-4">
            <div>
              <p className="mb-2"><strong>① 본 사이트의 책임제한</strong></p>
              <p>
                본 사이트는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 
                서비스 제공에 관한 책임이 면제됩니다.
              </p>
            </div>
            <div>
              <p className="mb-2"><strong>② 정보의 정확성</strong></p>
              <p>
                본 사이트는 본 사이트에 게재된 정보, 자료, 사실의 신뢰도, 정확성 등의 품질에 관하여는 
                어떠한 책임도 부담하지 않습니다.
              </p>
            </div>
            <div>
              <p className="mb-2"><strong>③ 이용자간 분쟁</strong></p>
              <p>
                본 사이트는 이용자 상호간 또는 이용자와 제3자 상호간에 서비스를 매개로 하여 발생한 
                분쟁에 대해 개입할 의무가 없으며, 이로 인한 손해를 배상할 책임도 없습니다.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">제10조 (분쟁해결)</h2>
          <div className="space-y-4">
            <div>
              <p className="mb-2"><strong>① 준거법</strong></p>
              <p>
                본 사이트와 이용자 간에 제기된 소송에는 대한민국 법을 적용합니다.
              </p>
            </div>
            <div>
              <p className="mb-2"><strong>② 관할법원</strong></p>
              <p>
                본 사이트와 이용자간에 발생한 분쟁에 관한 소송의 관할법원은 민사소송법에 따른 
                관할법원으로 합니다.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">제11조 (광고 및 링크)</h2>
          <div className="space-y-4">
            <div>
              <p className="mb-2"><strong>① 광고 게재</strong></p>
              <p>
                본 사이트는 서비스의 운영을 위해 Google AdSense 등을 통한 광고를 게재할 수 있으며, 
                이용자는 서비스 이용 시 노출되는 광고에 대해 동의한 것으로 간주됩니다.
              </p>
            </div>
            <div>
              <p className="mb-2"><strong>② 외부 링크</strong></p>
              <p>
                본 사이트에 포함된 외부 사이트로의 링크는 정보 제공의 목적으로만 제공되며, 
                해당 사이트의 콘텐츠나 서비스에 대한 책임은 지지 않습니다.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">제12조 (연락처)</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p>서비스 관련 문의사항이 있으시면 아래 연락처로 문의해 주시기 바랍니다:</p>
            <ul className="mt-2 space-y-1">
              <li><strong>운영자:</strong> 편집자P</li>
              <li><strong>이메일:</strong> hgpark@goldenrabbit.co.kr</li>
              <li><strong>웹사이트:</strong> https://canineblog.vercel.app</li>
            </ul>
          </div>
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