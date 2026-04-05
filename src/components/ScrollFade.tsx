'use client'

import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

export type ScrollFadeDirection = 'fade-up' | 'fade-in-only'
export type ScrollFadeMode = 'scroll' | 'reveal'

interface ScrollFadeProps {
  children: React.ReactNode
  /** scroll distance (px) — scroll mode only */
  distance?: number
  className?: string
  /** scroll: hero opacity vs scrollY; reveal: Intersection Observer enter */
  mode?: ScrollFadeMode
  /** reveal mode only */
  direction?: ScrollFadeDirection
}

export function ScrollFade({
  children,
  distance = 120,
  className = '',
  mode = 'scroll',
  direction = 'fade-up',
}: ScrollFadeProps) {
  const reduceMotion = usePrefersReducedMotion()
  const revealRef = useRef<HTMLDivElement>(null)
  const [opacity, setOpacity] = useState(1)
  const [revealVisible, setRevealVisible] = useState(false)

  useEffect(() => {
    if (reduceMotion) setRevealVisible(true)
  }, [reduceMotion])

  useEffect(() => {
    if (reduceMotion || mode !== 'scroll') return

    const onScroll = () => {
      const y = window.scrollY
      const raw = 1 - (y / distance) * 1.5
      setOpacity(raw <= 0.01 ? 0 : Math.max(0, raw))
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [distance, mode, reduceMotion])

  useEffect(() => {
    if (reduceMotion || mode !== 'reveal') return
    const el = revealRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [mode, reduceMotion])

  if (mode === 'reveal') {
    const dirClass =
      direction === 'fade-in-only' ? 'scroll-fade-reveal--fade-in-only' : 'scroll-fade-reveal--fade-up'
    const visible = reduceMotion || revealVisible
    return (
      <div
        ref={revealRef}
        className={`scroll-fade-reveal ${dirClass} ${visible ? 'scroll-fade-reveal--visible' : ''} ${className}`}
      >
        {children}
      </div>
    )
  }

  const gone = opacity === 0 && !reduceMotion

  return (
    <div
      className={className}
      style={{
        opacity: reduceMotion ? 1 : opacity,
        visibility: reduceMotion || !gone ? 'visible' : 'hidden',
        pointerEvents: gone ? 'none' : 'auto',
        willChange: reduceMotion ? undefined : 'opacity',
      }}
    >
      {children}
    </div>
  )
}
