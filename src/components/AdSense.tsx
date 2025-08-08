/**
 * AdSense 자동광고 컴포넌트
 * 
 * 이 프로젝트는 Google AdSense 자동광고를 사용합니다.
 * layout.tsx에서 자동광고가 초기화되므로 별도의 수동 슬롯 컴포넌트는 필요하지 않습니다.
 * 
 * 자동광고는 Google의 AI가 최적의 위치에 광고를 자동으로 배치합니다.
 */

export function AdSenseInfo() {
  return (
    <div style={{ 
      display: 'none',
      fontSize: '12px',
      color: '#666',
      textAlign: 'center',
      padding: '4px'
    }}>
      AdSense 자동광고 활성화됨
    </div>
  )
}

/**
 * 이전 수동 광고 슬롯들은 자동광고로 대체되었습니다.
 * 
 * 자동광고의 장점:
 * - Google AI가 최적의 위치에 광고 배치
 * - 사용자 경험을 해치지 않는 자연스러운 광고 노출
 * - 수동 슬롯 관리의 복잡성 제거
 * - 광고 정책 위반 위험 감소
 */