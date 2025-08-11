'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  advertising: boolean
}

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    advertising: false,
  })

  useEffect(() => {
    // 쿠키 동의 여부 확인
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setIsVisible(true)
    }
  }, [])

  const handleAcceptAll = () => {
    const allConsent = {
      necessary: true,
      analytics: true,
      advertising: true,
      timestamp: new Date().toISOString(),
    }
    localStorage.setItem('cookie-consent', JSON.stringify(allConsent))
    setIsVisible(false)
    
    // Google Analytics 활성화
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted',
      })
    }
  }

  const handleAcceptSelected = () => {
    const consent = {
      ...preferences,
      timestamp: new Date().toISOString(),
    }
    localStorage.setItem('cookie-consent', JSON.stringify(consent))
    setIsVisible(false)
    
    // Google Analytics 설정
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: preferences.analytics ? 'granted' : 'denied',
        ad_storage: preferences.advertising ? 'granted' : 'denied',
      })
    }
  }

  const handleRejectAll = () => {
    const minimalConsent = {
      necessary: true,
      analytics: false,
      advertising: false,
      timestamp: new Date().toISOString(),
    }
    localStorage.setItem('cookie-consent', JSON.stringify(minimalConsent))
    setIsVisible(false)
    
    // Google Analytics 비활성화
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
      })
    }
  }

  const updatePreference = (key: keyof CookiePreferences, value: boolean) => {
    setPreferences(prev => ({ ...prev, [key]: value }))
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4">
      {/* 배경 오버레이 */}
      <div className="absolute inset-0 bg-black/50" onClick={() => setIsVisible(false)} />
      
      {/* 쿠키 동의 배너 */}
      <div className="relative w-full max-w-lg bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🍪</span>
              <h3 className="text-lg font-semibold text-gray-900">
                쿠키 설정
              </h3>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <p className="text-sm text-gray-600 mb-4">
            저희는 웹사이트를 개선하고 맞춤형 광고를 제공하기 위해 쿠키를 사용합니다. 
            자세한 내용은 <Link href="/privacy" className="text-blue-600 hover:text-blue-800 underline">개인정보 처리방침</Link>을 참조해 주세요.
          </p>

          {/* 기본 버튼들 */}
          {!showDetails && (
            <div className="space-y-3">
              <div className="flex space-x-3">
                <button
                  onClick={handleAcceptAll}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  모두 허용
                </button>
                <button
                  onClick={handleRejectAll}
                  className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  필수만 허용
                </button>
              </div>
              <button
                onClick={() => setShowDetails(true)}
                className="w-full text-sm text-blue-600 hover:text-blue-800 underline"
              >
                쿠키 설정 관리
              </button>
            </div>
          )}

          {/* 상세 설정 */}
          {showDetails && (
            <div className="space-y-4">
              <div className="space-y-3">
                {/* 필수 쿠키 */}
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">필수 쿠키</h4>
                    <p className="text-xs text-gray-600 mt-1">
                      웹사이트 기본 기능을 위해 필요합니다.
                    </p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs text-gray-500 mr-2">항상 활성</span>
                    <div className="w-11 h-6 bg-blue-600 rounded-full flex items-center justify-end px-1">
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* 분석 쿠키 */}
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">분석 쿠키</h4>
                    <p className="text-xs text-gray-600 mt-1">
                      Google Analytics를 통한 웹사이트 사용 분석
                    </p>
                  </div>
                  <button
                    onClick={() => updatePreference('analytics', !preferences.analytics)}
                    className={`w-11 h-6 rounded-full transition-colors duration-200 ease-in-out ${
                      preferences.analytics ? 'bg-blue-600' : 'bg-gray-300'
                    } flex items-center ${preferences.analytics ? 'justify-end' : 'justify-start'} px-1`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full shadow transform transition-transform"></div>
                  </button>
                </div>

                {/* 광고 쿠키 */}
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">광고 쿠키</h4>
                    <p className="text-xs text-gray-600 mt-1">
                      Google AdSense를 통한 맞춤형 광고 제공
                    </p>
                  </div>
                  <button
                    onClick={() => updatePreference('advertising', !preferences.advertising)}
                    className={`w-11 h-6 rounded-full transition-colors duration-200 ease-in-out ${
                      preferences.advertising ? 'bg-blue-600' : 'bg-gray-300'
                    } flex items-center ${preferences.advertising ? 'justify-end' : 'justify-start'} px-1`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full shadow transform transition-transform"></div>
                  </button>
                </div>
              </div>

              <div className="flex space-x-3 pt-2">
                <button
                  onClick={handleAcceptSelected}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  선택 사항 저장
                </button>
                <button
                  onClick={() => setShowDetails(false)}
                  className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  뒤로
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Google Analytics gtag 타입 선언
declare global {
  interface Window {
    gtag: (
      command: 'consent' | 'config' | 'event',
      action: string,
      parameters?: Record<string, any>
    ) => void
  }
}