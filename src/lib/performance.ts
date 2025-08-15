/**
 * 성능 최적화 유틸리티 함수들
 */

// 메모이제이션을 위한 캐시
const memoCache = new Map<string, any>();

/**
 * 함수 결과를 메모이제이션하는 래퍼
 */
export function memoize<T extends (...args: any[]) => any>(
  fn: T,
  getKey?: (...args: Parameters<T>) => string
): T {
  return ((...args: Parameters<T>) => {
    const key = getKey ? getKey(...args) : JSON.stringify(args);
    
    if (memoCache.has(key)) {
      return memoCache.get(key);
    }
    
    const result = fn(...args);
    memoCache.set(key, result);
    
    return result;
  }) as T;
}

/**
 * 캐시를 클리어하는 함수 (개발 환경에서 유용)
 */
export function clearMemoCache(): void {
  memoCache.clear();
}

/**
 * 배열을 청크 단위로 나누는 함수 (페이지네이션 최적화)
 */
export function chunk<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

/**
 * 디바운스 함수 - 검색이나 필터링에 유용
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * 스로틀 함수 - 스크롤 이벤트 등에 유용
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * 지연 로딩을 위한 교차 관찰자 생성
 */
export function createIntersectionObserver(
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
): IntersectionObserver | null {
  if (typeof window === 'undefined') {
    return null;
  }

  return new IntersectionObserver(callback, {
    rootMargin: '50px',
    threshold: 0.1,
    ...options,
  });
}

/**
 * 이미지 프리로딩
 */
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * 배치 이미지 프리로딩
 */
export async function preloadImages(srcs: string[]): Promise<void> {
  const promises = srcs.map(preloadImage);
  await Promise.allSettled(promises);
}

/**
 * Critical CSS 인라인을 위한 스타일 추출
 */
export function extractCriticalStyles(content: string): string[] {
  const criticalClasses = [
    // 기본 레이아웃 클래스들
    'bg-white', 'text-gray-900', 'min-h-screen',
    // 네비게이션 클래스들
    'fixed', 'top-0', 'w-full', 'z-50',
    // 타이포그래피 클래스들
    'text-3xl', 'text-xl', 'font-bold', 'leading-relaxed',
    // 여백 클래스들
    'p-4', 'p-6', 'p-8', 'm-4', 'm-6', 'm-8',
    'px-4', 'py-4', 'mx-auto', 'my-4',
    // 플렉스 클래스들
    'flex', 'flex-col', 'items-center', 'justify-between',
    // 그리드 클래스들
    'grid', 'grid-cols-1', 'gap-4', 'gap-6',
    // 반응형 클래스들
    'md:text-4xl', 'lg:text-5xl', 'md:px-6', 'lg:px-8'
  ];

  return criticalClasses.filter(className => 
    content.includes(className)
  );
}

/**
 * 성능 메트릭 수집
 */
export function measurePerformance(name: string): () => void {
  if (typeof window === 'undefined' || !window.performance) {
    return () => {};
  }

  const startTime = performance.now();
  
  return () => {
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    // 개발 환경에서만 로그 출력
    if (process.env.NODE_ENV === 'development') {
      console.log(`⚡ ${name}: ${duration.toFixed(2)}ms`);
    }
    
    // Performance API를 사용해 메트릭 기록
    if (window.performance.mark) {
      window.performance.mark(`${name}-start`);
      window.performance.mark(`${name}-end`);
      window.performance.measure(name, `${name}-start`, `${name}-end`);
    }
  };
}

/**
 * 번들 크기 최적화를 위한 동적 import 래퍼
 */
export async function dynamicImport<T>(
  importFn: () => Promise<T>
): Promise<T> {
  try {
    return await importFn();
  } catch (error) {
    console.error('Dynamic import failed:', error);
    throw error;
  }
}
