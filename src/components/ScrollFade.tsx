'use client'

import { useEffect, useState } from 'react'

interface ScrollFadeProps {
  children: React.ReactNode
  /** scroll distance (px) over which the element fully fades out */
  distance?: number
  className?: string
}

export function ScrollFade({ children, distance = 120, className = '' }: ScrollFadeProps) {
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const raw = 1 - (y / distance) * 1.5
      setOpacity(raw <= 0.01 ? 0 : Math.max(0, raw))
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [distance])

  const gone = opacity === 0

  return (
    <div
      className={className}
      style={{
        opacity,
        visibility: gone ? 'hidden' : 'visible',
        pointerEvents: gone ? 'none' : 'auto',
        willChange: 'opacity',
      }}
    >
      {children}
    </div>
  )
}
