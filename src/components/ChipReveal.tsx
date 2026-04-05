'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

interface ChipRevealProps {
  children: ReactNode
  index?: number
  className?: string
}

/** Stagger between cards when the grid enters the viewport (50–80ms) */
const STAGGER_MS = 60
const THRESHOLD = 0.15

export function ChipReveal({ children, index = 0, className = '' }: ChipRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const reduceMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (reduceMotion) return
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: THRESHOLD }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [reduceMotion])

  const show = reduceMotion || visible
  const delayMs = reduceMotion ? 0 : index * STAGGER_MS

  return (
    <div
      ref={ref}
      className={`chip-reveal ${show ? 'chip-reveal--visible' : ''} ${className}`}
      style={{
        transitionDelay: `${delayMs}ms`,
        animationDelay: `${delayMs}ms`,
      }}
    >
      {children}
    </div>
  )
}

interface ChipRevealGridProps {
  children: ReactNode
  className?: string
}

export function ChipRevealGrid({ children, className = '' }: ChipRevealGridProps) {
  return (
    <div className={className}>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <ChipReveal key={i} index={i}>
              {child}
            </ChipReveal>
          ))
        : children}
    </div>
  )
}
