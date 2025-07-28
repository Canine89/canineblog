'use client'

import { useEffect } from 'react'

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
    // AdSense 스크립트가 로드되었는지 확인
    if (typeof window !== 'undefined' && window.adsbygoogle) {
      try {
        window.adsbygoogle.push({})
      } catch (error) {
        console.error('AdSense error:', error)
      }
    }
  }, [])

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