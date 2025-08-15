/**
 * 보안 관련 유틸리티 함수들
 */

/**
 * XSS 방지를 위한 HTML 이스케이프
 */
export function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

/**
 * 안전한 HTML 속성 값 생성
 */
export function sanitizeAttribute(value: string): string {
  return value.replace(/[<>"'&]/g, (match) => {
    const escapeMap: { [key: string]: string } = {
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '&': '&amp;'
    }
    return escapeMap[match]
  })
}

/**
 * URL 검증 - 안전한 URL인지 확인
 */
export function isValidUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url)
    // 허용된 프로토콜만 사용
    const allowedProtocols = ['http:', 'https:', 'mailto:', 'tel:']
    return allowedProtocols.includes(parsedUrl.protocol)
  } catch {
    return false
  }
}

/**
 * 외부 링크 안전성 검증
 */
export function isSafeExternalUrl(url: string): boolean {
  if (!isValidUrl(url)) return false
  
  try {
    const parsedUrl = new URL(url)
    
    // 블랙리스트 도메인 체크
    const blockedDomains = [
      'malware-site.com',
      'phishing-site.com'
      // 필요에 따라 추가
    ]
    
    return !blockedDomains.some(domain => 
      parsedUrl.hostname.includes(domain)
    )
  } catch {
    return false
  }
}

/**
 * 안전한 외부 링크 속성 생성
 */
export function getSafeExternalLinkProps(url: string) {
  if (!isSafeExternalUrl(url)) {
    return null
  }

  return {
    href: url,
    target: '_blank',
    rel: 'noopener noreferrer nofollow',
    'aria-label': `외부 링크: ${url} (새 창에서 열림)`
  }
}

/**
 * Content Security Policy 헤더 생성
 */
export function generateCSPHeader(): string {
  const directives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://www.googletagmanager.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: blob: https: http:",
    "media-src 'self' data: blob:",
    "connect-src 'self' https://www.google-analytics.com",
    "frame-src 'self' https://www.youtube.com https://player.vimeo.com",
    "worker-src 'self' blob:",
    "child-src 'self' blob:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests"
  ]
  
  return directives.join('; ')
}

/**
 * 보안 헤더 설정 객체
 */
export const securityHeaders = {
  // XSS 보호
  'X-XSS-Protection': '1; mode=block',
  
  // 콘텐츠 타입 스니핑 방지
  'X-Content-Type-Options': 'nosniff',
  
  // 클릭재킹 방지
  'X-Frame-Options': 'DENY',
  
  // HTTPS 강제
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  
  // 추천인 정보 제한
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  
  // 권한 정책
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  
  // CSP 헤더
  'Content-Security-Policy': generateCSPHeader()
}

/**
 * 사용자 입력 검증
 */
export function validateInput(input: string, options: {
  maxLength?: number
  allowedChars?: RegExp
  required?: boolean
} = {}): { isValid: boolean; error?: string } {
  const { maxLength = 1000, allowedChars, required = false } = options

  if (required && !input.trim()) {
    return { isValid: false, error: '필수 입력 항목입니다.' }
  }

  if (input.length > maxLength) {
    return { isValid: false, error: `최대 ${maxLength}자까지 입력 가능합니다.` }
  }

  if (allowedChars && !allowedChars.test(input)) {
    return { isValid: false, error: '허용되지 않는 문자가 포함되어 있습니다.' }
  }

  return { isValid: true }
}

/**
 * 이메일 주소 검증
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email) && email.length <= 254
}

/**
 * 안전한 JSON 파싱
 */
export function safeJsonParse<T = unknown>(json: string): T | null {
  try {
    return JSON.parse(json)
  } catch {
    return null
  }
}

/**
 * SQL 인젝션 방지를 위한 문자열 이스케이프 (필요시)
 */
export function escapeSql(value: string): string {
  return value.replace(/[\0\n\r\b\t\\'"\x1a]/g, (match) => {
    switch (match) {
      case '\0': return '\\0'
      case '\n': return '\\n'
      case '\r': return '\\r'
      case '\b': return '\\b'
      case '\t': return '\\t'
      case '\x1a': return '\\Z'
      case "'": return "\\'"
      case '"': return '\\"'
      case '\\': return '\\\\'
      default: return match
    }
  })
}

/**
 * 레이트 리미팅을 위한 간단한 메모리 저장소
 */
class MemoryRateLimiter {
  private requests: Map<string, number[]> = new Map()

  isAllowed(identifier: string, limit: number, windowMs: number): boolean {
    const now = Date.now()
    const requests = this.requests.get(identifier) || []
    
    // 윈도우 밖의 요청들 제거
    const validRequests = requests.filter(time => now - time < windowMs)
    
    if (validRequests.length >= limit) {
      return false
    }
    
    validRequests.push(now)
    this.requests.set(identifier, validRequests)
    
    return true
  }

  reset(identifier?: string): void {
    if (identifier) {
      this.requests.delete(identifier)
    } else {
      this.requests.clear()
    }
  }
}

export const rateLimiter = new MemoryRateLimiter()

/**
 * 보안 감사 로그
 */
export function securityLog(event: string, details: Record<string, unknown> = {}): void {
  if (process.env.NODE_ENV === 'development') {
    console.warn('🔒 보안 이벤트:', event, details)
  }
  
  // 프로덕션에서는 실제 로깅 서비스로 전송
  // logger.warn('Security Event', { event, ...details })
}

/**
 * 민감한 정보 마스킹
 */
export function maskSensitiveData(data: string, type: 'email' | 'phone' | 'generic' = 'generic'): string {
  switch (type) {
    case 'email':
      return data.replace(/(.{2})[^@]*(@.*)/, '$1***$2')
    case 'phone':
      return data.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
    default:
      return data.length > 4 
        ? data.substring(0, 2) + '*'.repeat(data.length - 4) + data.substring(data.length - 2)
        : '*'.repeat(data.length)
  }
}
