'use client'

import Image from 'next/image'
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  prepareWithSegments,
  layoutNextLine,
  type PreparedTextWithSegments,
  type LayoutCursor,
} from '@chenglou/pretext'

const DESKTOP_MQ = '(min-width: 1024px)'
const CURSOR_IMAGE_SIZE = 16
const MIN_LINE_WIDTH = 48

type ContentBlock =
  | { kind: 'html'; html: string }
  | { kind: 'pretext'; tag: string; text: string }

type LayoutLine = { text: string; x: number; width: number; y: number }

function fontForTag(tag: string): string {
  switch (tag) {
    case 'H2':
      return '600 24px Inter, sans-serif'
    case 'H3':
      return '600 20px Inter, sans-serif'
    case 'H4':
      return '500 18px Inter, sans-serif'
    case 'BLOCKQUOTE':
      return '400 italic 16px Inter, sans-serif'
    default:
      return '400 16px Inter, sans-serif'
  }
}

function lineHeightPx(tag: string): number {
  switch (tag) {
    case 'H2':
      return 32
    case 'H3':
      return 28
    case 'H4':
      return 26
    default:
      return 26
  }
}

function marginBottomPx(tag: string): number {
  switch (tag) {
    case 'H2':
      return 16
    case 'H3':
      return 12
    case 'H4':
      return 8
    case 'BLOCKQUOTE':
      return 16
    default:
      return 16
  }
}

function marginTopPx(tag: string, index: number): number {
  if (index === 0) return 0
  switch (tag) {
    case 'H2':
      return 24
    case 'H3':
      return 20
    case 'H4':
      return 16
    default:
      return 0
  }
}

function wrapperClass(tag: string): string {
  switch (tag) {
    case 'H2':
      return 'text-2xl font-semibold mb-4 text-gray-900 dark:text-[#E8E0D6]'
    case 'H3':
      return 'text-xl font-semibold mb-3 text-gray-900 dark:text-[#E8E0D6]'
    case 'H4':
      return 'text-lg font-medium mb-2 text-gray-900 dark:text-[#E8E0D6]'
    case 'BLOCKQUOTE':
      return 'border-l-4 border-[#E8734A] pl-4 italic text-gray-600 bg-slate-50 py-2 mb-4 dark:text-[#B0A698] dark:bg-[#252019]'
    default:
      return 'mb-4 leading-relaxed text-gray-700 dark:text-[#C4BAB0]'
  }
}

function parseContentBlocks(html: string): ContentBlock[] {
  const parser = new DOMParser()
  const doc = parser.parseFromString(`<div class="pretext-root">${html}</div>`, 'text/html')
  const root = doc.querySelector('.pretext-root')
  if (!root) return []

  const blocks: ContentBlock[] = []
  for (const node of Array.from(root.children)) {
    const el = node as HTMLElement
    const tag = el.tagName

    if (
      tag === 'PRE' ||
      tag === 'TABLE' ||
      tag === 'HR' ||
      tag === 'UL' ||
      tag === 'OL' ||
      tag === 'H1'
    ) {
      blocks.push({ kind: 'html', html: el.outerHTML })
      continue
    }

    if (tag === 'P' && el.querySelector('img')) {
      blocks.push({ kind: 'html', html: el.outerHTML })
      continue
    }

    if (
      tag === 'P' ||
      tag === 'H2' ||
      tag === 'H3' ||
      tag === 'H4' ||
      tag === 'BLOCKQUOTE'
    ) {
      const text = (el.textContent || '').replace(/\s+/g, ' ').trim()
      if (!text) {
        blocks.push({ kind: 'html', html: el.outerHTML })
        continue
      }
      blocks.push({ kind: 'pretext', tag, text })
      continue
    }

    blocks.push({ kind: 'html', html: el.outerHTML })
  }

  return blocks
}

function layoutParagraphWithExclusion(
  prepared: PreparedTextWithSegments,
  lineHeight: number,
  containerWidth: number,
  blockTopInContainer: number,
  containerRect: DOMRect,
  imageViewport: { left: number; top: number; right: number; bottom: number }
): LayoutLine[] {
  const lines: LayoutLine[] = []
  let cursor: LayoutCursor = { segmentIndex: 0, graphemeIndex: 0 }
  let y = 0

  while (true) {
    const localY = y
    const lineViewportTop = containerRect.top + blockTopInContainer + localY
    const lineViewportBottom = lineViewportTop + lineHeight

    const overlapY =
      lineViewportBottom > imageViewport.top &&
      lineViewportTop < imageViewport.bottom

    let maxW = containerWidth
    let offsetX = 0

    if (overlapY) {
      const imgLeft = imageViewport.left - containerRect.left
      const imgRight = imageViewport.right - containerRect.left
      const spaceLeft = Math.max(0, imgLeft)
      const spaceRight = Math.max(0, containerWidth - imgRight)

      if (spaceLeft <= MIN_LINE_WIDTH / 2 && spaceRight <= MIN_LINE_WIDTH / 2) {
        maxW = MIN_LINE_WIDTH
        offsetX = 0
      } else if (spaceLeft >= spaceRight) {
        maxW = Math.max(MIN_LINE_WIDTH, spaceLeft)
        offsetX = 0
      } else {
        maxW = Math.max(MIN_LINE_WIDTH, spaceRight)
        offsetX = imgRight
      }
    }

    const line = layoutNextLine(prepared, cursor, maxW)
    if (line === null) break
    lines.push({ text: line.text, x: offsetX, width: maxW, y: localY })
    cursor = line.end
    y += lineHeight
  }

  return lines
}

function MeasuredHtmlBlock({
  blockIndex,
  html,
  onHeight,
}: {
  blockIndex: number
  html: string
  onHeight: (index: number, height: number) => void
}) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const report = () => {
      onHeight(blockIndex, el.offsetHeight)
    }

    report()
    const ro = new ResizeObserver(report)
    ro.observe(el)
    return () => ro.disconnect()
  }, [blockIndex, html, onHeight])

  return (
    <div
      ref={ref}
      className="prose max-w-none [&_pre]:mb-4 [&_table]:mb-4 [&_ul]:mb-4 [&_ol]:mb-4 [&_hr]:my-8"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

interface PostContentPretextProps {
  contentHtml: string
}

export function PostContentPretext({ contentHtml }: PostContentPretextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [usePretextDesktop, setUsePretextDesktop] = useState(false)
  const [mouse, setMouse] = useState({ x: -200, y: -200 })
  const [containerWidth, setContainerWidth] = useState(0)
  const [layoutRect, setLayoutRect] = useState<DOMRect | null>(null)
  const [htmlHeights, setHtmlHeights] = useState<Record<number, number>>({})
  const rafRef = useRef<number | null>(null)
  const pendingMouse = useRef({ x: -200, y: -200 })

  const onHtmlHeight = useCallback((index: number, height: number) => {
    setHtmlHeights((prev) => {
      if (prev[index] === height) return prev
      return { ...prev, [index]: height }
    })
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_MQ)
    const reducedMq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => {
      setUsePretextDesktop(mq.matches && !reducedMq.matches)
    }
    sync()
    mq.addEventListener('change', sync)
    reducedMq.addEventListener('change', sync)
    return () => {
      mq.removeEventListener('change', sync)
      reducedMq.removeEventListener('change', sync)
    }
  }, [])

  const blocks = useMemo(() => {
    if (!mounted) return []
    return parseContentBlocks(contentHtml)
  }, [mounted, contentHtml])

  const updateLayoutBox = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    setLayoutRect(r)
    setContainerWidth((w) => (w === r.width ? w : r.width))
  }, [])

  useLayoutEffect(() => {
    if (!usePretextDesktop || !mounted) return
    const el = containerRef.current
    if (!el) return

    updateLayoutBox()
    const ro = new ResizeObserver(updateLayoutBox)
    ro.observe(el)
    window.addEventListener('scroll', updateLayoutBox, { passive: true, capture: true })
    return () => {
      ro.disconnect()
      window.removeEventListener('scroll', updateLayoutBox, { capture: true })
    }
  }, [usePretextDesktop, mounted, blocks, updateLayoutBox])

  const preparedByIndex = useMemo(() => {
    return blocks.map((b) => {
      if (b.kind !== 'pretext') return null
      return prepareWithSegments(b.text, fontForTag(b.tag))
    })
  }, [blocks])

  const onMouseMove = useCallback((e: MouseEvent) => {
    pendingMouse.current = { x: e.clientX, y: e.clientY }
    if (rafRef.current != null) return
    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null
      setMouse(pendingMouse.current)
    })
  }, [])

  useEffect(() => {
    if (!usePretextDesktop || !mounted) return
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [usePretextDesktop, mounted, onMouseMove])

  const half = CURSOR_IMAGE_SIZE / 2
  const imageViewport = {
    left: mouse.x - half,
    top: mouse.y - half,
    right: mouse.x + half,
    bottom: mouse.y + half,
  }

  if (!mounted) {
    return (
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    )
  }

  if (!usePretextDesktop) {
    return (
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    )
  }

  const containerRect =
    layoutRect ??
    (typeof window !== 'undefined'
      ? new DOMRect(0, 0, Math.max(320, window.innerWidth - 64), 800)
      : new DOMRect(0, 0, 640, 800))

  const effectiveWidth =
    containerWidth > 0
      ? containerWidth
      : typeof window !== 'undefined'
        ? Math.max(320, containerRect.width)
        : 640

  let cursorY = 0
  const rendered: React.ReactNode[] = []

  blocks.forEach((block, blockIndex) => {
    if (block.kind === 'html') {
      const gapBefore = blockIndex === 0 ? 0 : 16
      cursorY += gapBefore
      const h = htmlHeights[blockIndex] ?? 48
      cursorY += h

      rendered.push(
        <div
          key={`html-${blockIndex}`}
          style={gapBefore > 0 ? { marginTop: gapBefore } : undefined}
        >
          <MeasuredHtmlBlock
            blockIndex={blockIndex}
            html={block.html}
            onHeight={onHtmlHeight}
          />
        </div>
      )
      return
    }

    const prepared = preparedByIndex[blockIndex]
    if (!prepared) return

    const lh = lineHeightPx(block.tag)
    const mt = marginTopPx(block.tag, blockIndex)
    const mb = marginBottomPx(block.tag)
    cursorY += mt

    const blockTop = cursorY

    const lines =
      effectiveWidth > 0
        ? layoutParagraphWithExclusion(
            prepared,
            lh,
            effectiveWidth,
            blockTop,
            containerRect,
            imageViewport
          )
        : []

    const blockHeight = lines.length * lh + mb
    cursorY += blockHeight

    rendered.push(
      <div
        key={`pretext-${blockIndex}`}
        className={wrapperClass(block.tag)}
        style={mt > 0 ? { marginTop: mt } : undefined}
      >
        {lines.map((line, i) => (
          <div
            key={i}
            style={{
              marginLeft: line.x,
              width: line.width,
              maxWidth: '100%',
              minHeight: lh,
              lineHeight: `${lh}px`,
            }}
            className="break-words"
          >
            {line.text}
          </div>
        ))}
      </div>
    )
  })

  return (
    <div className="relative">
      <div
        className="pointer-events-none fixed z-[60] select-none"
        style={{
          width: CURSOR_IMAGE_SIZE,
          height: CURSOR_IMAGE_SIZE,
          left: mouse.x,
          top: mouse.y,
          transform: 'translate(-50%, -50%)',
        }}
        aria-hidden
      >
        <Image
          src="/p-cursor-follow.png"
          alt=""
          width={CURSOR_IMAGE_SIZE}
          height={CURSOR_IMAGE_SIZE}
          className="h-full w-full object-contain drop-shadow-md"
          draggable={false}
          priority={false}
        />
      </div>

      <div ref={containerRef} className="max-w-none">
        {rendered}
      </div>
    </div>
  )
}
