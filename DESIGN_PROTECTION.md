# 🛡️ 디자인 보호 시스템 안내

이 프로젝트에는 디자인을 보호하기 위한 다중 보호 시스템이 구축되어 있습니다.

## 보호 시스템 구성

### 1. `.claudeignore` 파일
- **목적**: Claude Code가 디자인 파일에 접근하지 못하도록 차단
- **위치**: 프로젝트 루트
- **보호 범위**: CSS, 레이아웃, 컴포넌트, 정적 파일

### 2. `CLAUDE.md` 파일  
- **목적**: Claude Code에게 디자인 변경 금지 지시
- **위치**: 프로젝트 루트
- **내용**: 명시적인 변경 금지 규칙과 허용 작업 목록

### 3. `.vscode/settings.json` 파일
- **목적**: Cursor AI가 디자인 파일을 무시하도록 설정
- **위치**: `.vscode/` 폴더
- **기능**: 파일 탐색기 숨김, AI 패턴 무시, 검색 제외

### 4. Git Pre-commit Hook
- **목적**: 디자인 파일 변경 시 경고 및 확인 요청
- **위치**: `.git/hooks/pre-commit`
- **기능**: 커밋 전 보호된 파일 변경 감지

## 보호되는 파일들

### 핵심 디자인 파일
- `src/app/globals.css` - 전체 스타일시트
- `src/app/layout.tsx` - 메인 레이아웃
- `tailwind.config.js` - Tailwind 설정
- `postcss.config.mjs` - PostCSS 설정

### UI 컴포넌트
- `src/components/CategoryDropdown.tsx`
- `src/components/MobileNav.tsx`  
- `src/components/Navigation.tsx`

### 페이지 레이아웃
- `src/app/page.tsx` - 홈페이지
- `src/app/about/page.tsx` - 소개 페이지
- `src/app/books/page.tsx` - 도서 페이지
- `src/app/posts/[...slug]/page.tsx` - 포스트 페이지
- `src/app/category/[category]/page.tsx` - 카테고리 페이지
- `src/app/tags/page.tsx` - 태그 페이지

## 사용법

### 정상적인 작업 (허용됨)
```bash
# 새로운 마크다운 콘텐츠 추가
git add content/dev/new-post.md

# 기능적 수정 (스타일 변경 없이)
git add src/lib/markdown.ts

# 새로운 유틸리티 함수
git add src/lib/utils.ts
```

### 디자인 변경 시도 (차단됨)
```bash
# 이런 파일들을 수정하면 pre-commit hook이 경고
git add src/app/globals.css
git commit -m "스타일 변경"
# -> 경고 메시지와 함께 차단됨
```

### 보호 시스템 해제 방법

#### 임시 해제 (한 번만)
```bash
git commit --no-verify -m "디자인 변경"
```

#### 완전 해제
```bash
# Pre-commit hook 제거
rm .git/hooks/pre-commit

# Claude 보호 설정 제거
rm .claudeignore
rm CLAUDE.md

# Cursor 설정 제거
rm .vscode/settings.json
```

## 보호 효과

### Claude Code
- `.claudeignore`에 명시된 파일들을 읽거나 수정할 수 없음
- `CLAUDE.md`의 지시사항을 따라 디자인 변경 요청을 거부

### Cursor
- `.vscode/settings.json`의 `cursor.ai.ignorePatterns`에 의해 디자인 파일 무시
- 파일 탐색기에서 일부 파일들이 숨겨짐

### Git
- Pre-commit hook이 보호된 파일의 변경을 감지하고 확인 요청
- 실수로 인한 디자인 변경을 방지

## 문제 해결

### Claude Code가 여전히 디자인을 변경하려 한다면
1. `.claudeignore` 파일이 올바른 위치(프로젝트 루트)에 있는지 확인
2. `CLAUDE.md` 파일의 내용이 명확한지 확인
3. Claude Code를 재시작

### Cursor가 디자인 파일을 계속 제안한다면
1. `.vscode/settings.json` 파일 확인
2. Cursor 워크스페이스 재로드: `Cmd+Shift+P` → "Reload Window"

### Git Hook이 작동하지 않는다면
1. 실행 권한 확인: `ls -la .git/hooks/pre-commit`
2. 권한 부여: `chmod +x .git/hooks/pre-commit`

---

**⚠️ 중요**: 이 보호 시스템은 프로젝트의 디자인 완성도를 유지하기 위해 설치되었습니다. 정말 필요한 경우가 아니면 해제하지 마세요.