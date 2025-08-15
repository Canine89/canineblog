'use client'

import { useState, useEffect, useRef } from 'react'
import { createIntersectionObserver, preloadImage } from '@/lib/performance'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  sizes?: string
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  sizes,
  placeholder = 'empty',
  blurDataURL
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(priority)
  const [error, setError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  // 지연 로딩을 위한 IntersectionObserver
  useEffect(() => {
    if (priority) return

    const observer = createIntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer?.disconnect()
          }
        })
      },
      { rootMargin: '50px' }
    )

    if (imgRef.current && observer) {
      observer.observe(imgRef.current)
    }

    return () => observer?.disconnect()
  }, [priority])

  // 이미지 프리로딩
  useEffect(() => {
    if (isInView || priority) {
      preloadImage(src)
        .then(() => setIsLoaded(true))
        .catch(() => setError(true))
    }
  }, [src, isInView, priority])

  const shouldShowImage = isInView || priority
  const imageSrc = shouldShowImage ? src : undefined

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ width, height }}>
      {/* 플레이스홀더 */}
      {placeholder === 'blur' && !isLoaded && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{
            backgroundImage: blurDataURL ? `url(${blurDataURL})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(10px)',
          }}
        />
      )}
      
      {/* 로딩 스켈레톤 */}
      {placeholder === 'empty' && !isLoaded && shouldShowImage && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="text-gray-400 text-sm">Loading...</div>
        </div>
      )}

      {/* 실제 이미지 */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        className={`
          transition-opacity duration-300
          ${isLoaded ? 'opacity-100' : 'opacity-0'}
          ${error ? 'hidden' : 'block'}
          w-full h-full object-cover
        `}
        onLoad={() => setIsLoaded(true)}
        onError={() => setError(true)}
      />

      {/* 에러 상태 */}
      {error && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-gray-500 text-center">
            <div className="text-2xl mb-2">📷</div>
            <div className="text-sm">이미지를 불러올 수 없습니다</div>
          </div>
        </div>
      )}
    </div>
  )
}

// WebP 지원 감지 및 최적화된 이미지 소스 생성
export function getOptimizedImageSrc(src: string, width?: number): string {
  // 외부 이미지의 경우 그대로 반환
  if (src.startsWith('http')) {
    return src
  }

  // 내부 이미지의 경우 최적화 적용
  const baseUrl = src.replace(/\.[^/.]+$/, '') // 확장자 제거
  const extension = src.split('.').pop()?.toLowerCase()

  // 크기별 최적화
  const sizeModifier = width ? `_${width}w` : ''
  
  // WebP 지원 여부에 따라 형식 결정
  const format = isWebPSupported() ? 'webp' : extension || 'jpg'
  
  return `${baseUrl}${sizeModifier}.${format}`
}

// WebP 지원 여부 확인
function isWebPSupported(): boolean {
  if (typeof window === 'undefined') return false
  
  const canvas = document.createElement('canvas')
  canvas.width = 1
  canvas.height = 1
  
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0
}

// 반응형 이미지를 위한 srcSet 생성
export function generateSrcSet(src: string, widths: number[] = [320, 640, 960, 1280, 1920]): string {
  return widths
    .map(width => `${getOptimizedImageSrc(src, width)} ${width}w`)
    .join(', ')
}

// 일반적인 sizes 속성 값들
export const commonSizes = {
  full: '100vw',
  half: '50vw',
  third: '33vw',
  quarter: '25vw',
  mobile: '(max-width: 768px) 100vw, 50vw',
  tablet: '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
  desktop: '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw'
}
