# Notion 스타일 정적 블로그

Next.js로 만든 Notion 스타일의 정적 블로그 생성 툴입니다. 마크다운으로 작성한 콘텐츠가 아름다운 웹페이지로 변환됩니다.

## ✨ 주요 기능

- **📝 마크다운 지원** - 모든 마크다운 문법 지원 (GFM 포함)
- **🎨 Notion 스타일 UI** - 깔끔하고 모던한 디자인
- **⚡ 정적 사이트 생성** - 빠른 로딩과 SEO 최적화
- **🏷️ 태그 시스템** - 콘텐츠 분류 및 검색
- **💻 코드 하이라이팅** - 프로그래밍 코드 구문 강조
- **📱 반응형 디자인** - 모든 디바이스에서 최적화
- **🚀 Vercel 배포 최적화** - 정적 사이트에 특화된 배포

## 🛠️ 기술 스택

- **Next.js 14** - React 프레임워크
- **TypeScript** - 타입 안전성
- **Tailwind CSS** - 스타일링
- **Gray Matter** - 마크다운 메타데이터 파싱
- **Remark/Rehype** - 마크다운 처리
- **Date-fns** - 날짜 포맷팅

## 🚀 시작하기

### 1. 프로젝트 클론
```bash
git clone <repository-url>
cd blog-googlead
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 개발 서버 실행
```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 📝 콘텐츠 작성

### 포스트 추가하기

1. `content/` 디렉토리에 `.md` 파일 생성
2. YAML 프론트매터로 메타데이터 작성
3. 마크다운으로 콘텐츠 작성

```markdown
---
title: "포스트 제목"
date: "2024-01-15"
tags: ["태그1", "태그2"]
excerpt: "포스트 요약"
---

# 포스트 내용

마크다운으로 작성한 콘텐츠가 자동으로 HTML로 변환됩니다.
```

### 지원하는 마크다운 문법

- **제목**: `#`, `##`, `###` 등
- **강조**: `**굵게**`, `*기울임*`, `~~취소선~~`
- **링크**: `[텍스트](URL)`
- **이미지**: `![alt](URL)`
- **코드**: `` `인라인 코드` ``
- **코드 블록**: ``` ``` ```
- **리스트**: `-`, `1.`, `2.` 등
- **인용문**: `> 인용문`
- **테이블**: 마크다운 테이블 문법
- **체크리스트**: `- [ ]`, `- [x]`

## 🏗️ 프로젝트 구조

```
blog-googlead/
├── content/           # 마크다운 포스트
├── src/
│   ├── app/          # Next.js App Router
│   │   ├── posts/    # 포스트 페이지
│   │   └── tags/     # 태그 페이지
│   └── lib/          # 유틸리티 함수
├── public/           # 정적 파일
└── package.json
```

## 🚀 배포하기

### Vercel 배포 (권장)

1. [Vercel](https://vercel.com)에 가입
2. GitHub 저장소 연결
3. 자동 배포 설정

```bash
# Vercel CLI로 배포
npm install -g vercel
vercel
```

### 정적 내보내기

```bash
npm run build
npm run export
```

## 🎨 커스터마이징

### 스타일 변경

- `src/app/globals.css`에서 CSS 수정
- `src/app/layout.tsx`에서 레이아웃 변경
- Tailwind CSS 클래스로 스타일링

### 기능 추가

- `src/lib/markdown.ts`에서 마크다운 처리 로직 수정
- 새로운 페이지는 `src/app/`에 추가
- 컴포넌트는 `src/components/`에 추가

## 📊 성능 최적화

- **정적 사이트 생성** - 빌드 타임에 모든 페이지 생성
- **이미지 최적화** - Next.js Image 컴포넌트 사용
- **코드 분할** - 자동 코드 분할
- **SEO 최적화** - 메타데이터 자동 생성

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 🙏 감사의 말

- [Next.js](https://nextjs.org/) - 훌륭한 React 프레임워크
- [Tailwind CSS](https://tailwindcss.com/) - 유틸리티 퍼스트 CSS 프레임워크
- [Vercel](https://vercel.com/) - 최고의 배포 플랫폼

---

**Notion 스타일 정적 블로그**로 멋진 콘텐츠를 만들어보세요! 🚀
