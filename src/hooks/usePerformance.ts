'use client'

import { useEffect, useCallback, useRef, useState } from 'react'
import { debounce, throttle, measurePerformance } from '@/lib/performance'

/**
 * 디바운스된 값을 반환하는 훅
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}

/**
 * 스로틀된 함수를 반환하는 훅
 */
export function useThrottle<T extends (...args: unknown[]) => unknown>(
  callback: T,
  limit: number
): T {
  const throttledFn = useRef<T | undefined>(undefined)
  
  if (!throttledFn.current) {
    throttledFn.current = throttle(callback, limit) as T
  }

  return throttledFn.current
}

/**
 * 디바운스된 함수를 반환하는 훅
 */
export function useDebounceCallback<T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number
): T {
  const debouncedFn = useRef<T | undefined>(undefined)
  
  if (!debouncedFn.current) {
    debouncedFn.current = debounce(callback, delay) as T
  }

  return debouncedFn.current
}

/**
 * 성능 측정을 위한 훅
 */
export function usePerformanceMeasure(name: string) {
  const endMeasureRef = useRef<(() => void) | null>(null)

  const startMeasure = useCallback(() => {
    endMeasureRef.current = measurePerformance(name)
  }, [name])

  const endMeasure = useCallback(() => {
    if (endMeasureRef.current) {
      endMeasureRef.current()
      endMeasureRef.current = null
    }
  }, [])

  // 컴포넌트 언마운트 시 측정 종료
  useEffect(() => {
    return () => {
      if (endMeasureRef.current) {
        endMeasureRef.current()
      }
    }
  }, [])

  return { startMeasure, endMeasure }
}

/**
 * 지연 로딩을 위한 IntersectionObserver 훅
 */
export function useIntersectionObserver(
  options?: IntersectionObserverInit
) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasIntersected, setHasIntersected] = useState(false)
  const targetRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const target = targetRef.current
    if (!target) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
        if (entry.isIntersecting && !hasIntersected) {
          setHasIntersected(true)
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
        ...options,
      }
    )

    observer.observe(target)

    return () => {
      observer.unobserve(target)
    }
  }, [hasIntersected, options])

  return { ref: targetRef, isIntersecting, hasIntersected }
}

/**
 * 이전 값을 추적하는 훅
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined)
  
  useEffect(() => {
    ref.current = value
  }, [value])
  
  return ref.current
}

/**
 * 지연된 업데이트를 처리하는 훅
 */
export function useDeferredValue<T>(value: T, delay: number = 0): T {
  const [deferredValue, setDeferredValue] = useState(value)

  useEffect(() => {
    if (delay === 0) {
      setDeferredValue(value)
      return
    }

    const timer = setTimeout(() => {
      setDeferredValue(value)
    }, delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  return deferredValue
}

/**
 * 이벤트 리스너를 최적화하는 훅
 */
export function useEventListener<T extends keyof WindowEventMap>(
  eventName: T,
  handler: (event: WindowEventMap[T]) => void,
  element?: Element | Window | null,
  options?: AddEventListenerOptions
) {
  const savedHandler = useRef(handler)

  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    const targetElement = element ?? window
    if (!targetElement?.addEventListener) return

    const eventListener = (event: Event) => {
      savedHandler.current(event as WindowEventMap[T])
    }

    targetElement.addEventListener(eventName, eventListener, options)

    return () => {
      targetElement.removeEventListener(eventName, eventListener, options)
    }
  }, [eventName, element, options])
}

/**
 * 스크롤 위치를 추적하는 훅
 */
export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 })

  const updatePosition = useThrottle(() => {
    setScrollPosition({ x: window.scrollX, y: window.scrollY })
  }, 100)

  useEventListener('scroll', updatePosition)

  return scrollPosition
}

/**
 * 뷰포트 크기를 추적하는 훅
 */
export function useViewportSize() {
  const [size, setSize] = useState({ width: 0, height: 0 })

  const updateSize = useThrottle(() => {
    setSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }, 250)

  useEventListener('resize', updateSize)

  useEffect(() => {
    updateSize()
  }, [updateSize])

  return size
}

/**
 * 미디어 쿼리를 추적하는 훅
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia(query)
    setMatches(mediaQuery.matches)

    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler)
      return () => mediaQuery.removeEventListener('change', handler)
    } else {
      // 레거시 브라우저 지원
      mediaQuery.addListener(handler)
      return () => mediaQuery.removeListener(handler)
    }
  }, [query])

  return matches
}

/**
 * 로컬 스토리지 값을 관리하는 훅
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }

    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)

      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }, [key, storedValue])

  return [storedValue, setValue]
}
