'use client'

import { useEffect, useState } from 'react'

interface HeroTypewriterProps {
  lines: string[]
  subtitle: string
}

export function HeroTypewriter({ lines, subtitle }: HeroTypewriterProps) {
  const [typedLines, setTypedLines] = useState(() => lines.map(() => ''))
  const [typedSubtitle, setTypedSubtitle] = useState('')
  const [activeKey, setActiveKey] = useState<string | null>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      setTypedLines(lines)
      setTypedSubtitle(subtitle)
      setActiveKey(null)
      return
    }

    const timers: number[] = []
    let elapsed = 220

    lines.forEach((line, lineIndex) => {
      timers.push(
        window.setTimeout(() => {
          setActiveKey(`line-${lineIndex}`)
        }, elapsed)
      )

      Array.from(line).forEach((_, charIndex) => {
        timers.push(
          window.setTimeout(() => {
            setTypedLines((current) =>
              current.map((value, index) =>
                index === lineIndex ? Array.from(line).slice(0, charIndex + 1).join('') : value
              )
            )
          }, elapsed + charIndex * 82)
        )
      })

      elapsed += Array.from(line).length * 82 + 260
    })

    timers.push(
      window.setTimeout(() => {
        setActiveKey('subtitle')
      }, elapsed)
    )

    Array.from(subtitle).forEach((_, charIndex) => {
      timers.push(
        window.setTimeout(() => {
          setTypedSubtitle(Array.from(subtitle).slice(0, charIndex + 1).join(''))
        }, elapsed + charIndex * 48)
      )
    })

    elapsed += Array.from(subtitle).length * 48 + 520
    timers.push(
      window.setTimeout(() => {
        setActiveKey(null)
      }, elapsed)
    )

    return () => {
      timers.forEach(window.clearTimeout)
    }
  }, [lines, subtitle])

  return (
    <>
      <h1
        className="hero-title max-w-3xl text-5xl font-medium leading-[1.02] tracking-[-0.055em] text-white sm:text-7xl lg:text-8xl"
        aria-label={lines.join(' ')}
      >
        {lines.map((line, index) => (
          <span className="hero-typewriter__line" key={line}>
            {typedLines[index]}
            <span
              className="hero-typewriter__caret"
              aria-hidden="true"
              data-active={activeKey === `line-${index}`}
            />
          </span>
        ))}
      </h1>

      <p
        className="hero-typewriter__subtitle max-w-xl text-base font-medium leading-7 text-white/72 sm:text-lg"
        aria-label={subtitle}
      >
        {typedSubtitle}
        <span
          className="hero-typewriter__caret"
          aria-hidden="true"
          data-active={activeKey === 'subtitle'}
        />
      </p>
    </>
  )
}
