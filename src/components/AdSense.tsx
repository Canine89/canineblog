'use client'

import React, { useEffect } from 'react'

interface AdSenseProps {
  adSlot: string
  adFormat?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical'
  style?: React.CSSProperties
  className?: string
}

// AdSense 전역 타입 선언
declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}

export function AdSense({ adSlot, adFormat = 'auto', style, className }: AdSenseProps) {
  useEffect(() => {
    // 개발 환경에서는 AdSense를 완전히 비활성화
    if (process.env.NODE_ENV === 'development') {
      return
    }

    // 프로덕션 환경에서만 AdSense 로드
    const loadAd = () => {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        try {
          const adElement = document.querySelector(`ins[data-ad-slot="${adSlot}"]`)
          if (adElement && !adElement.getAttribute('data-adsbygoogle-status')) {
            window.adsbygoogle.push({})
          }
        } catch (error) {
          // 프로덕션에서도 조용히 실패 처리
          return
        }
      }
    }

    // 프로덕션에서만 타이머 설정
    const timer = setTimeout(loadAd, 1500)
    return () => clearTimeout(timer)
  }, [adSlot])

  // 개발 환경에서는 광고 대신 플레이스홀더 표시
  if (process.env.NODE_ENV === 'development') {
    return (
      <div 
        className={`adsense-placeholder ${className || ''}`} 
        style={{
          ...style,
          backgroundColor: '#f0f0f0',
          border: '2px dashed #ccc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#666',
          fontSize: '14px'
        }}
      >
        [AdSense Placeholder - {adFormat}]
      </div>
    )
  }

  return (
    <div className={`adsense-container ${className || ''}`} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-1531500505272848"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  )
}

// 광고 위치별 컴포넌트들 - 상단 광고 제거
// export function HeaderAd() {
//   return (
//     <div className="my-4">
//       <AdSense 
//         adSlot="6031330884" 
//         className="text-center"
//         style={{ minHeight: '90px' }}
//       />
//     </div>
//   )
// }

export function SidebarAd() {
  return (
    <div className="my-4">
      <AdSense 
        adSlot="6031330884" 
        adFormat="vertical"
        className="text-center"
        style={{ minHeight: '600px' }}
      />
    </div>
  )
}

export function InlineAd() {
  return (
    <div className="my-8">
      <AdSense 
        adSlot="6031330884" 
        adFormat="rectangle"
        className="text-center"
        style={{ minHeight: '250px' }}
      />
    </div>
  )
}

export function FooterAd() {
  return (
    <div className="my-4">
      <AdSense 
        adSlot="6031330884" 
        className="text-center"
        style={{ minHeight: '90px' }}
      />
    </div>
  )
} 