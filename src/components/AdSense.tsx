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
    // 개발 환경에서는 AdSense를 비활성화
    if (process.env.NODE_ENV === 'development') {
      console.log('AdSense disabled in development mode')
      return
    }

    // AdSense 스크립트가 로드되었는지 확인하고 약간의 지연 후 실행
    const loadAd = () => {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        try {
          window.adsbygoogle.push({})
        } catch (error) {
          console.error('AdSense error:', error)
        }
      } else {
        // AdSense 스크립트가 아직 로드되지 않은 경우 재시도
        setTimeout(loadAd, 100)
      }
    }

    // 즉시 실행하고 1초 후에도 다시 시도
    loadAd()
    const timer = setTimeout(loadAd, 1000)

    return () => clearTimeout(timer)
  }, [])

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

// 광고 위치별 컴포넌트들
export function HeaderAd() {
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