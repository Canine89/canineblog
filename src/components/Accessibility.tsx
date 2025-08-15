'use client'

import { useEffect, useState } from 'react'
import { useLocalStorage, useMediaQuery } from '@/hooks/usePerformance'

/**
 * 접근성 개선을 위한 스킵 링크 컴포넌트
 */
export function SkipLinks() {
  return (
    <div className="sr-only focus-within:not-sr-only">
      <a
        href="#main-content"
        className="
          absolute top-0 left-0 z-50 p-4 
          bg-blue-600 text-white 
          focus:relative focus:z-50 
          transition-all duration-200
        "
      >
        메인 콘텐츠로 건너뛰기
      </a>
      <a
        href="#navigation"
        className="
          absolute top-0 left-0 z-50 p-4 ml-32
          bg-blue-600 text-white 
          focus:relative focus:z-50 
          transition-all duration-200
        "
      >
        네비게이션으로 건너뛰기
      </a>
    </div>
  )
}

/**
 * 다크모드 토글 버튼
 */
export function DarkModeToggle() {
  const [theme, setTheme] = useLocalStorage<'light' | 'dark' | 'system'>('theme', 'system')
  const [mounted, setMounted] = useState(false)
  const systemPrefersDark = useMediaQuery('(prefers-color-scheme: dark)')

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    
    if (theme === 'dark' || (theme === 'system' && systemPrefersDark)) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [theme, systemPrefersDark])

  if (!mounted) {
    return <div className="w-10 h-10" /> // 플레이스홀더
  }

  const currentTheme = theme === 'system' 
    ? (systemPrefersDark ? 'dark' : 'light')
    : theme

  const nextTheme = currentTheme === 'light' ? 'dark' : 'light'

  return (
    <button
      onClick={() => setTheme(nextTheme)}
      className="
        p-2 rounded-lg 
        text-gray-600 hover:text-gray-900 
        dark:text-gray-400 dark:hover:text-gray-100
        border border-gray-200 hover:border-gray-300
        dark:border-gray-700 dark:hover:border-gray-600
        transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
      "
      aria-label={`${nextTheme === 'dark' ? '다크' : '라이트'} 모드로 전환`}
      title={`${nextTheme === 'dark' ? '다크' : '라이트'} 모드로 전환`}
    >
      {currentTheme === 'light' ? (
        <svg
          className="w-5 h-5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      ) : (
        <svg
          className="w-5 h-5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )}
    </button>
  )
}

/**
 * 폰트 크기 조절 컨트롤
 */
export function FontSizeControl() {
  const [fontSize, setFontSize] = useLocalStorage<'small' | 'normal' | 'large'>('fontSize', 'normal')

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('text-sm', 'text-base', 'text-lg')
    
    switch (fontSize) {
      case 'small':
        root.classList.add('text-sm')
        break
      case 'large':
        root.classList.add('text-lg')
        break
      default:
        root.classList.add('text-base')
    }
  }, [fontSize])

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600 dark:text-gray-400">A</span>
      <div className="flex border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        {(['small', 'normal', 'large'] as const).map((size) => (
          <button
            key={size}
            onClick={() => setFontSize(size)}
            className={`
              px-3 py-1 text-sm transition-colors duration-200
              ${fontSize === size 
                ? 'bg-blue-500 text-white' 
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }
            `}
            aria-label={`${size === 'small' ? '작은' : size === 'large' ? '큰' : '보통'} 글자 크기로 설정`}
          >
            {size === 'small' ? 'A' : size === 'large' ? 'A' : 'A'}
          </button>
        ))}
      </div>
      <span className="text-lg text-gray-600 dark:text-gray-400">A</span>
    </div>
  )
}

/**
 * 고대비 모드 토글
 */
export function HighContrastToggle() {
  const [highContrast, setHighContrast] = useLocalStorage('highContrast', false)

  useEffect(() => {
    const root = document.documentElement
    if (highContrast) {
      root.classList.add('high-contrast')
    } else {
      root.classList.remove('high-contrast')
    }
  }, [highContrast])

  return (
    <button
      onClick={() => setHighContrast(!highContrast)}
      className={`
        px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        ${highContrast
          ? 'bg-yellow-500 text-black border-2 border-black'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
        }
      `}
      aria-label={`고대비 모드 ${highContrast ? '비활성화' : '활성화'}`}
    >
      고대비 {highContrast ? 'OFF' : 'ON'}
    </button>
  )
}

/**
 * 애니메이션 감소 토글
 */
export function ReduceMotionToggle() {
  const [reduceMotion, setReduceMotion] = useLocalStorage('reduceMotion', false)
  const systemPrefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

  useEffect(() => {
    const root = document.documentElement
    const shouldReduceMotion = reduceMotion || systemPrefersReducedMotion

    if (shouldReduceMotion) {
      root.classList.add('reduce-motion')
    } else {
      root.classList.remove('reduce-motion')
    }
  }, [reduceMotion, systemPrefersReducedMotion])

  return (
    <button
      onClick={() => setReduceMotion(!reduceMotion)}
      className="
        px-4 py-2 rounded-lg text-sm font-medium
        bg-gray-200 text-gray-700 hover:bg-gray-300
        dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600
        transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
      "
      aria-label={`애니메이션 ${reduceMotion ? '활성화' : '비활성화'}`}
    >
      🎬 애니메이션 {reduceMotion ? 'ON' : 'OFF'}
    </button>
  )
}

/**
 * 접근성 설정 패널
 */
export function AccessibilityPanel() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          p-2 rounded-lg 
          text-gray-600 hover:text-gray-900 
          dark:text-gray-400 dark:hover:text-gray-100
          border border-gray-200 hover:border-gray-300
          dark:border-gray-700 dark:hover:border-gray-600
          transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        "
        aria-label="접근성 설정 패널 열기"
        aria-expanded={isOpen}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>

      {isOpen && (
        <div className="
          absolute right-0 mt-2 w-80 p-4
          bg-white dark:bg-gray-800 
          border border-gray-200 dark:border-gray-700
          rounded-lg shadow-lg z-50
        ">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
            접근성 설정
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                테마 설정
              </label>
              <DarkModeToggle />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                글자 크기
              </label>
              <FontSizeControl />
            </div>

            <div className="flex flex-col gap-2">
              <HighContrastToggle />
              <ReduceMotionToggle />
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="
              mt-4 w-full px-4 py-2 
              bg-gray-100 hover:bg-gray-200 
              dark:bg-gray-700 dark:hover:bg-gray-600
              text-gray-700 dark:text-gray-300
              rounded-lg text-sm transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            "
          >
            닫기
          </button>
        </div>
      )}
    </div>
  )
}
