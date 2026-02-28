'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

interface ChipRevealProps {
  children: ReactNode
  index?: number
  className?: string
}

const STAGGER_MS = 80
const THRESHOLD = 0.15

export function ChipReveal({ children, index = 0, className = '' }: ChipRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
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
  }, [])

  return (
    <div
      ref={ref}
      className={`chip-reveal ${visible ? 'chip-reveal--visible' : ''} ${className}`}
      style={{ transitionDelay: `${index * STAGGER_MS}ms`, animationDelay: `${index * STAGGER_MS}ms` }}
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
