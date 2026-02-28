'use client'

import { useEffect, useState, useRef, useCallback } from 'react'

interface Heading {
  id: string
  text: string
  level: number
}

const CHIP_COLORS = [
  '#D97757', '#6B8F71', '#C2956B', '#8B5E6B', '#5E7FA3',
  '#B8927A', '#7A9E82', '#A47D8B', '#6E8FAD', '#C4A882',
]

export function ArticleTOC() {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const [progress, setProgress] = useState(0)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const slugify = useCallback((text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9가-힣ㄱ-ㅎㅏ-ㅣ\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }, [])

  useEffect(() => {
    const prose = document.querySelector('.prose')
    if (!prose) return

    const els = prose.querySelectorAll('h2, h3')
    const items: Heading[] = []
    els.forEach((el) => {
      const text = el.textContent?.trim() || ''
      if (!text) return
      if (!el.id) el.id = slugify(text)
      items.push({ id: el.id, text, level: parseInt(el.tagName[1]) })
    })

    setHeadings(items)
    if (items.length > 0) setActiveId(items[0].id)

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length > 0) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0.1 }
    )
    els.forEach((el) => observerRef.current?.observe(el))

    const onScroll = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight
      if (docH > 0) setProgress(Math.min(1, window.scrollY / docH))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      observerRef.current?.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [slugify])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: 'smooth' })
  }

  if (headings.length < 2) return null

  const activeIdx = headings.findIndex((h) => h.id === activeId)
  let h2Count = 0

  return (
    <nav className="toc-rail" aria-label="Table of contents">
      {/* 진행 트랙 */}
      <div className="toc-track">
        <div className="toc-track-fill" style={{ height: `${progress * 100}%` }} />
      </div>

      {/* 컬러칩 목록 */}
      <div className="toc-chips">
        {headings.map((h, i) => {
          if (h.level === 2) h2Count++
          const isActive = h.id === activeId
          const isPast = i <= activeIdx
          const color = CHIP_COLORS[(h2Count - 1) % CHIP_COLORS.length]

          return (
            <button
              key={h.id}
              onClick={() => scrollTo(h.id)}
              className={`toc-chip ${isActive ? 'toc-chip--active' : ''} ${isPast ? 'toc-chip--past' : ''} ${h.level === 3 ? 'toc-chip--sub' : ''}`}
              title={h.text}
            >
              <span className="toc-chip-swatch" style={{ backgroundColor: color }} />
              <span className="toc-chip-label">{h.text}</span>
            </button>
          )
        })}
      </div>

      {/* 카운터 */}
      <div className="toc-num">
        <span className="toc-num-now">{activeIdx + 1}</span>
        <span className="toc-num-sep">/</span>
        <span>{headings.length}</span>
      </div>
    </nav>
  )
}
