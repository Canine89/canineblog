'use client'

import { useEffect, useState } from 'react'

/** SSR: false — avoids layout shift; updates after mount. */
export function usePrefersReducedMotion(): boolean {
  const [prefers, setPrefers] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefers(mq.matches)
    const onChange = () => setPrefers(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return prefers
}
