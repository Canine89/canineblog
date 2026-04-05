'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [rotation, setRotation] = useState(0)
  const reduceMotion = usePrefersReducedMotion()

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return <div className={`h-8 w-8 ${className}`} />
  }

  const isDark = resolvedTheme === 'dark'

  const handleClick = () => {
    setTheme(isDark ? 'light' : 'dark')
    if (!reduceMotion) {
      setRotation((r) => r + 180)
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-black/10 dark:hover:bg-white/10 ${className}`}
      aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
    >
      <span
        className="inline-flex motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-out"
        style={reduceMotion ? undefined : { transform: `rotate(${rotation}deg)` }}
      >
        {isDark ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-[18px] w-[18px]"
          >
            <path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657 5.404a.75.75 0 10-1.06-1.06l-1.061 1.06a.75.75 0 001.06 1.06l1.06-1.06zM6.464 14.596a.75.75 0 10-1.06-1.06l-1.06 1.06a.75.75 0 001.06 1.06l1.06-1.06zM18 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10zM14.596 15.657a.75.75 0 001.06-1.06l-1.06-1.061a.75.75 0 10-1.06 1.06l1.06 1.06zM5.404 6.464a.75.75 0 001.06-1.06l-1.06-1.06a.75.75 0 10-1.06 1.06l1.06 1.06z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-[18px] w-[18px]"
          >
            <path
              fillRule="evenodd"
              d="M7.455 2.004a.75.75 0 01.26.77 7 7 0 009.958 7.967.75.75 0 011.067.853A8.5 8.5 0 116.647 1.921a.75.75 0 01.808.083z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </span>
    </button>
  )
}
