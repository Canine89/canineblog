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

    // AdSense 스크립트가 누락된 경우 안전하게 주입
    const ensureAdSenseScriptPresent = () => {
      if (typeof window === 'undefined') return
      const existing = document.querySelector(
        'script[src^="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]'
      ) as HTMLScriptElement | null
      if (!existing) {
        const script = document.createElement('script')
        script.async = true
        script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1531500505272848'
        script.crossOrigin = 'anonymous'
        document.head.appendChild(script)
      }
    }

    // 프로덕션 환경에서만 AdSense 로드 (재시도 포함)
    const loadAdWithRetry = () => {
      let attempts = 0
      const maxAttempts = 20
      const tryLoad = () => {
        attempts += 1
        if (typeof window !== 'undefined' && window.adsbygoogle) {
          try {
            const adElement = document.querySelector(`ins[data-ad-slot="${adSlot}"]`)
            if (adElement && !adElement.getAttribute('data-adsbygoogle-status')) {
              window.adsbygoogle.push({})
            }
            return // 성공 또는 이미 로드됨
          } catch (error) {
            // 조용히 실패 후 재시도
          }
        }
        if (attempts < maxAttempts) {
          setTimeout(tryLoad, 500)
        }
      }
      tryLoad()
    }

    // 스크립트 보장 후 광고 로드 시도
    ensureAdSenseScriptPresent()
    const timer = setTimeout(loadAdWithRetry, 500)
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