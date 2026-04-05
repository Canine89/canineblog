/** CSS view-transition-name: safe subset of [a-zA-Z0-9_-] */
export function sanitizePostIdForViewTransition(id: string): string {
  return id.replace(/[^a-zA-Z0-9_-]/g, '-')
}

export function postThumbVtName(postId: string): string {
  return `post-thumb-${sanitizePostIdForViewTransition(postId)}`
}

export function postTitleVtName(postId: string): string {
  return `post-title-${sanitizePostIdForViewTransition(postId)}`
}

/** 본문 영역 공통 fade (목록→상세 시 나머지 콘텐츠) */
export const POST_ARTICLE_FADE_VT = 'post-article-fade' as const
