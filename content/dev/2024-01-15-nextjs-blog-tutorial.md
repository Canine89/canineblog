---
title: 'Next.js로 정적 블로그 만들기'
excerpt: 'Next.js와 구글 애드센스를 활용한 정적 블로그 구축 방법을 알아봅니다.'
tags: ['Next.js', 'React', '블로그', '정적사이트']
category: 'dev'
---

# Next.js로 정적 블로그 만들기

안녕하세요! 오늘은 Next.js를 사용해서 정적 블로그를 만드는 방법에 대해 알아보겠습니다.

## 왜 Next.js를 선택했나요?

Next.js는 다음과 같은 장점들이 있습니다:

- **빠른 성능**: 정적 사이트 생성(SSG)을 통해 빠른 로딩 속도
- **SEO 최적화**: 서버 사이드 렌더링과 정적 생성으로 검색 엔진 최적화
- **개발자 경험**: TypeScript 지원, 자동 코드 분할 등
- **배포 용이성**: Vercel과의 완벽한 통합

## 주요 기능

### 1. 마크다운 지원

이 블로그는 마크다운 파일을 사용해서 포스트를 작성합니다. `gray-matter`를 사용해서 frontmatter를 파싱하고, `remark`를 사용해서 마크다운을 HTML로 변환합니다.

### 2. 구글 애드센스 통합

구글 애드센스 광고를 다양한 위치에 삽입할 수 있습니다:

- 헤더 광고
- 사이드바 광고  
- 인라인 광고
- 푸터 광고

### 3. 반응형 디자인

Tailwind CSS를 사용해서 모바일 친화적인 반응형 디자인을 구현했습니다.

## 코드 예시

```typescript
// 포스트 데이터 가져오기
import { getSortedPostsData } from '@/lib/posts';

export default function BlogPage() {
  const posts = getSortedPostsData();
  
  return (
    <div>
      {posts.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  );
}
```

## 다음 단계

앞으로 다음과 같은 기능들을 추가할 예정입니다:

- [ ] 검색 기능
- [ ] 카테고리 필터링
- [ ] 댓글 시스템
- [ ] 소셜 미디어 공유
- [ ] 다크 모드

감사합니다! 