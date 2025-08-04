---
title: "Git pre-commit hook으로 블로그 디자인 보호하기 - 바이브 코딩 실수 방지 사례"
excerpt: "Git pre-commit hook을 활용해서 완성된 블로그 디자인을 보호하는 방법을 소개합니다. 바이브 코딩 중 실수로 디자인을 망가뜨리는 것을 방지하는 실제 사례와 코드까지!"
tags:
  [
    "git",
    "pre-commit",
    "design-protection",
    "automation",
    "development-workflow",
  ]
category: "dev"
---

개발하다 보면 몰입해서 코딩하다가 나중에 보니 완성된 디자인이 망가져 있는 경험이 있을 겁니다. 저 역시 블로그 디자인을 완성해놓고 새로운 기능 개발하다가 실수로 레이아웃을 깨뜨린 적이 많아서 Git pre-commit hook으로 디자인 보호 시스템을 구축했습니다.

## 바이브 코딩의 달콤한 함정

제 블로그는 디자인이 이미 완성된 상태입니다. Next.js로 구현한 개인 블로그인데 레이아웃과 스타일링에 만족하고 있었거든요. 하지만 새로운 기능을 추가하거나 콘텐츠를 업데이트하다 보면 자연스럽게 기존 코드를 수정하게 되는 상황이 발생합니다.

특히 Claude나 GPT 같은 AI 도구로 바이브 코딩을 할 때 더 자주 일어나더군요. "카테고리 드롭다운 컴포넌트에 검색 기능 추가해줘"라고 프롬프팅했다가 전체 드롭다운 로직이 바뀌어서 기존 스타일이 깨지거나 "모바일 네비게이션 햄버거 메뉴 애니메이션 개선해줘"라고 했더니 전체 모바일 레이아웃이 변경되는 일들이 있었습니다.

> **바이브 코딩 프롬프팅 팁**: 기존 디자인을 유지하고 싶다면 "기존 스타일과 레이아웃은 그대로 유지하면서 [구체적 기능]만 추가해줘"라고 명시적으로 요청하세요.

CSS 애니메이션을 추가하려다가 globals.css의 기존 스타일을 덮어쓰거나 SEO 최적화 과정에서 layout.tsx의 메타태그를 수정하다가 전체 구조가 깨지는 일도 있었습니다. 가장 인상적이었던 실수는 "tailwind.config.js에 새로운 색상 팔레트 추가해줘"라고 프롬프팅했더니 기존 색상 시스템이 완전히 바뀌어버린 사건이었습니다.

## Git pre-commit hook을 활용한 디자인 보호

pre-commit hook은 Git이 커밋을 실행하기 직전에 실행되는 스크립트입니다. 이를 활용하면 특정 파일의 변경사항을 커밋하기 전에 확인하고 제어할 수 있어서 완성된 블로그 디자인을 보호하는 데 적합한 도구라고 판단했습니다.

바이브 코딩을 자주 하는 개발자들에게는 특히 유용한데 AI가 생성한 코드를 검토 없이 바로 커밋하는 실수를 방지할 수 있거든요.

> **바이브 코딩 프롬프팅 팁**: "기존 파일을 수정하지 말고 새로운 파일로 기능을 분리해서 만들어줘"라고 요청하면 기존 코드 손상을 줄일 수 있습니다.

## 단계별 구현 방법

### 1단계 - 시작 메시지와 보호 파일 정의

먼저 스크립트가 실행되었음을 알리고 보호할 파일들을 정의하는 부분입니다.

```bash
#!/bin/bash
# .git/hooks/pre-commit

echo "🛡️  디자인 보호 Hook 실행 중..."

# 디자인 핵심 파일들 - 신중한 수정 필요
PROTECTED_FILES=(
    "src/app/globals.css"           # 전역 스타일 시스템
    "src/app/layout.tsx"            # 기본 레이아웃 구조
    "src/components/CategoryDropdown.tsx"  # 카테고리 드롭다운
    "src/components/MobileNav.tsx"        # 모바일 네비게이션
    "src/components/Navigation.tsx"       # 메인 네비게이션
    "src/app/page.tsx"              # 홈페이지 레이아웃
    "tailwind.config.js"            # Tailwind 설정
    "postcss.config.mjs"            # PostCSS 설정
)
```

첫 번째 줄의 `#!/bin/bash`는 셔뱅(shebang)이라고 하는데 이 스크립트를 bash로 실행하라는 의미입니다. `PROTECTED_FILES` 배열에는 절대 함부로 수정하면 안 되는 파일들을 나열했습니다.

> **바이브 코딩 프롬프팅 팁**: 보호할 파일 목록을 만들 때는 "내 프로젝트에서 디자인과 레이아웃에 핵심적인 파일들을 분석해서 목록으로 정리해줘"라고 요청하면 놓친 파일들을 찾을 수 있습니다.

### 2단계 - 변경된 파일 목록 가져오기

Git에서 커밋하려는 파일들의 목록을 가져오는 부분입니다.

```bash
# 커밋 대상 파일들 확인
CHANGED_FILES=$(git diff --cached --name-only)
```

`git diff --cached --name-only` 명령어는 스테이징 영역(커밋 대기 상태)에 있는 파일들의 이름만 가져옵니다. `--cached` 옵션은 스테이징된 변경사항을 확인하라는 의미이고 `--name-only`는 파일 내용 변화는 보지 말고 파일 이름만 출력하라는 뜻입니다.

이 부분이 중요한 이유는 바이브 코딩을 할 때 보통 여러 파일을 한꺼번에 수정하는 경우가 많은데 그 중에서 보호 대상 파일이 섞여 있을 수 있기 때문입니다.

### 3단계 - 보호된 파일 변경 여부 확인

변경된 파일들 중에 보호 대상 파일이 포함되어 있는지 확인하는 로직입니다.

```bash
PROTECTED_FILE_CHANGED=false

for file in "${PROTECTED_FILES[@]}"; do
    if echo "$CHANGED_FILES" | grep -q "^$file$"; then
        echo "⚠️  경고 보호된 디자인 파일이 변경되었습니다 $file"
        PROTECTED_FILE_CHANGED=true
    fi
done
```

먼저 `PROTECTED_FILE_CHANGED`라는 플래그 변수를 false로 초기화합니다. 그 다음 `for` 반복문으로 보호 파일 목록을 하나씩 확인합니다. `"${PROTECTED_FILES[@]}"`는 배열의 모든 요소를 의미하는 bash 문법입니다.

`echo "$CHANGED_FILES" | grep -q "^$file$"` 부분이 핵심인데 여기서 `grep -q`는 패턴을 찾되 결과를 출력하지 말고 찾았는지 여부만 반환하라는 의미입니다. `"^$file$"`는 정규표현식으로 라인의 시작(`^`)부터 끝(`$`)까지 정확히 해당 파일명과 일치하는지 확인합니다.

> **바이브 코딩 프롬프팅 팁**: bash 스크립트의 복잡한 부분을 이해하고 싶다면 "이 bash 코드의 각 부분을 초보자도 이해할 수 있게 단계별로 설명해줘"라고 요청하세요.

### 4단계 - 사용자 확인 및 승인 과정

보호된 파일이 변경되었을 때 사용자에게 확인받는 부분입니다.

```bash
if [ "$PROTECTED_FILE_CHANGED" = true ]; then
    echo ""
    echo "🚨 디자인 파일 변경 감지!"
    echo "이 프로젝트의 디자인은 완성된 상태로 변경 시 신중한 검토가 필요합니다."
    echo ""
    echo "다음 옵션 중 선택하세요"
    echo "1. 변경사항 되돌리기 git reset HEAD [파일명]"
    echo "2. Hook 임시 비활성화 rm .git/hooks/pre-commit"
    echo "3. 강제 커밋 실행 git commit --no-verify"
    echo ""
```

`if [ "$PROTECTED_FILE_CHANGED" = true ]`는 앞에서 설정한 플래그가 true인지 확인합니다. true라면 보호된 파일이 변경되었다는 의미이므로 사용자에게 경고 메시지를 출력하고 가능한 옵션들을 안내합니다.

이 부분은 바이브 코딩을 하다가 깜빡하고 중요한 파일을 수정했을 때 "아 잠깐 이거 진짜 바꿔도 되나?" 하고 다시 한번 생각해볼 수 있는 안전장치 역할을 합니다.

### 5단계 - 사용자 입력 처리

실제로 사용자의 선택을 받아서 처리하는 부분입니다.

```bash
    read -p "디자인 파일 변경을 진행하시겠습니까? (y/N) " -n 1 -r
    echo

    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "커밋이 취소되었습니다."
        exit 1
    else
        echo "⚠️  디자인 변경이 승인되었습니다."
    fi
fi
```

`read -p` 명령어는 사용자에게 메시지를 출력하고 입력을 받는 명령어입니다. `-n 1` 옵션은 한 글자만 입력받겠다는 의미이고 `-r` 옵션은 백슬래시 이스케이프를 처리하지 않겠다는 뜻입니다.

`if [[ ! $REPLY =~ ^[Yy]$ ]]`는 사용자가 입력한 값(`$REPLY`)이 'Y' 또는 'y'가 아니라면이라는 조건입니다. 만약 사용자가 'y' 또는 'Y'를 입력하지 않았다면 `exit 1`로 스크립트를 종료하고 커밋을 취소합니다.

> **바이브 코딩 프롬프팅 팁**: 사용자 입력 처리 로직을 더 고도화하고 싶다면 "bash에서 사용자 입력을 받는 다양한 방법과 각각의 장단점을 비교해서 설명해줘"라고 요청하세요.

### 6단계 - 완료 메시지

스크립트가 정상적으로 완료되었음을 알리는 부분입니다.

```bash
echo "✅ 디자인 보호 Hook 완료"
```

이 메시지는 모든 검증이 통과했거나 사용자가 변경을 승인했을 때 출력됩니다.

## 고급 기능 추가

### 특정 변경 내용 예외 처리

특정 패턴의 변경은 자동으로 허용하는 로직을 추가할 수 있습니다.

```bash
# layout.tsx에서 광고 및 분석 코드 관련 변경은 허용
if [[ "$file" == "src/app/layout.tsx" ]]; then
    if git diff --cached "$file" | grep -q "adsbygoogle\|gtag"; then
        echo "✅ 광고/분석 스크립트 변경은 자동 허용됩니다."
        continue
    fi
fi
```

이 코드는 3단계의 반복문 안에 추가하는 것으로 layout.tsx 파일에서 Google AdSense나 Google Analytics 관련 코드만 변경된 경우에는 자동으로 허용합니다. `git diff --cached "$file"`로 해당 파일의 변경 내용을 확인하고 `grep -q "adsbygoogle\|gtag"`로 광고나 분석 관련 코드가 포함되어 있는지 확인합니다.

> **바이브 코딩 프롬프팅 팁**: 이런 예외 처리 로직을 만들 때는 "내 프로젝트에서 자주 변경되는 코드 패턴을 분석해서 자동 허용 규칙을 만들어줘"라고 요청하면 더 정교한 규칙을 만들 수 있습니다.

### 자동 백업 시스템

변경 전 상태를 자동으로 백업하는 기능입니다.

```bash
if [ "$PROTECTED_FILE_CHANGED" = true ]; then
    echo "📦 변경 전 백업 생성 중..."
    git stash push -m "디자인 변경 전 백업 $(date)" -- "${PROTECTED_FILES[@]}"
fi
```

이 코드는 4단계의 시작 부분에 추가할 수 있습니다. `git stash push`는 현재 변경사항을 임시 저장하는 명령어이고 `-m` 옵션으로 메시지를 지정할 수 있습니다. `$(date)`는 현재 날짜와 시간을 삽입하고 `--`는 옵션과 파일명을 구분하는 구분자입니다.

## 실제 적용 사례

### 바이브 코딩 중 무의식적 수정 차단

어느 날 Claude에게 "카테고리 드롭다운에 검색 기능과 키보드 네비게이션 추가해줘"라고 프롬프팅해서 받은 코드를 적용하려고 했던 상황입니다.

```bash
git add src/components/CategoryDropdown.tsx
git commit -m "카테고리 드롭다운 기능 개선"

# 시스템 응답
🛡️  디자인 보호 Hook 실행 중...
⚠️  경고 보호된 디자인 파일이 변경되었습니다 src/components/CategoryDropdown.tsx

🚨 디자인 파일 변경 감지!
이 프로젝트의 디자인은 완성된 상태로 변경 시 신중한 검토가 필요합니다.

디자인 파일 변경을 진행하시겠습니까? (y/N) n
커밋이 취소되었습니다.
```

이때 AI가 생성한 코드를 다시 검토해보니 기존의 CSS 클래스명들이 바뀌어 있어서 전체 스타일이 깨질 뻔했더군요. Hook이 없었다면 그대로 커밋했을 텐데 덕분에 사전에 방지할 수 있었습니다.

> **바이브 코딩 프롬프팅 팁**: 이런 실수를 줄이려면 "기존 CSS 클래스명과 구조는 절대 변경하지 말고 새로운 기능만 추가해줘"라고 명시적으로 요청하세요.

### 의도적 디자인 개선 승인

반면 "다크모드 지원을 위한 색상 변수 시스템을 globals.css와 tailwind.config.js에 추가해줘"라고 프롬프팅해서 받은 코드를 적용할 때는 의도적으로 승인했습니다.

```bash
git add src/app/globals.css tailwind.config.js
git commit -m "다크모드 지원 기능 추가"

# 의도적 승인 과정
디자인 파일 변경을 진행하시겠습니까? (y/N) y
⚠️  디자인 변경이 승인되었습니다.
✅ 디자인 보호 Hook 완료
```

## 바이브 코딩에 최적화된 워크플로우 팁

### AI 도구 활용 시 안전 프롬프팅

```
기존 디자인과 스타일은 절대 변경하지 말고
[구체적 기능]만 추가해줘.
기존 CSS 클래스명 변경 금지
기존 컴포넌트 구조 유지
새로운 코드는 별도 함수나 컴포넌트로 분리
```

### 점진적 개발 프롬프팅

```
1단계: 기존 코드 분석해서 구조 파악해줘
2단계: 새 기능을 위한 최소한의 변경점 제안해줘
3단계: 기존 코드 손상 없이 기능 추가하는 방법 알려줘
```

### 검증 프롬프팅

```
이 코드 변경이 기존 스타일링에 영향을 줄 수 있는 부분을
체크해서 위험도를 평가해줘
```

## 설치 및 설정 방법

### Hook 파일 생성

프로젝트 루트 디렉토리에서 다음 명령어를 실행합니다.

```bash
touch .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

`touch` 명령어로 파일을 생성하고 `chmod +x`로 실행 권한을 부여합니다.

> **바이브 코딩 프롬프팅 팁**: 설치 과정을 자동화하고 싶다면 "이 pre-commit hook 설치 과정을 자동화하는 스크립트를 만들어줘"라고 요청할 수 있습니다.

### 전체 스크립트

아래는 완성된 전체 스크립트입니다. `.git/hooks/pre-commit` 파일에 복사해서 사용하세요.

```bash
#!/bin/bash
# .git/hooks/pre-commit

echo "🛡️  디자인 보호 Hook 실행 중..."

# 디자인 핵심 파일들 - 신중한 수정 필요
PROTECTED_FILES=(
    "src/app/globals.css"
    "src/app/layout.tsx"
    "src/components/CategoryDropdown.tsx"
    "src/components/MobileNav.tsx"
    "src/components/Navigation.tsx"
    "src/app/page.tsx"
    "tailwind.config.js"
    "postcss.config.mjs"
)

# 커밋 대상 파일들 확인
CHANGED_FILES=$(git diff --cached --name-only)
PROTECTED_FILE_CHANGED=false

for file in "${PROTECTED_FILES[@]}"; do
    # 예외 처리: layout.tsx에서 광고/분석 코드는 허용
    if [[ "$file" == "src/app/layout.tsx" ]]; then
        if git diff --cached "$file" | grep -q "adsbygoogle\|gtag"; then
            echo "✅ 광고/분석 스크립트 변경은 자동 허용됩니다."
            continue
        fi
    fi

    if echo "$CHANGED_FILES" | grep -q "^$file$"; then
        echo "⚠️  경고 보호된 디자인 파일이 변경되었습니다 $file"
        PROTECTED_FILE_CHANGED=true
    fi
done

if [ "$PROTECTED_FILE_CHANGED" = true ]; then
    echo "📦 변경 전 백업 생성 중..."
    git stash push -m "디자인 변경 전 백업 $(date)" -- "${PROTECTED_FILES[@]}"

    echo ""
    echo "🚨 디자인 파일 변경 감지!"
    echo "이 프로젝트의 디자인은 완성된 상태로 변경 시 신중한 검토가 필요합니다."
    echo ""
    echo "다음 옵션 중 선택하세요"
    echo "1. 변경사항 되돌리기 git reset HEAD [파일명]"
    echo "2. Hook 임시 비활성화 rm .git/hooks/pre-commit"
    echo "3. 강제 커밋 실행 git commit --no-verify"
    echo ""

    read -p "디자인 파일 변경을 진행하시겠습니까? (y/N) " -n 1 -r
    echo

    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "커밋이 취소되었습니다."
        exit 1
    else
        echo "⚠️  디자인 변경이 승인되었습니다."
    fi
fi

echo "✅ 디자인 보호 Hook 완료"
```

## 바이브 코딩 시대의 필수 도구

이 시스템을 도입한 후 AI 도구를 활용한 바이브 코딩이 훨씬 안전해졌습니다. 특히 깊은 집중 상태에서 코딩할 때 실수를 방지하는 효과가 컸고 AI가 생성한 코드를 검토 없이 적용하는 위험을 줄일 수 있었습니다.

바이브 코딩을 자주 하시는 분들이라면 이런 안전장치가 꼭 필요할 거예요. AI 도구가 아무리 좋아져도 기존 코드의 맥락을 완전히 이해하지는 못하니까요.

> **바이브 코딩 프롬프팅 팁**: 이 글을 참고해서 본인만의 보호 시스템을 만들고 싶다면 "내 프로젝트 구조를 분석해서 맞춤형 pre-commit hook을 만들어줘"라고 요청해보세요.

개인적으로는 이 시스템 도입 후 안심하고 AI 도구를 활용할 수 있게 되어서 오히려 더 적극적으로 바이브 코딩을 하게 되었습니다. 안전장치가 있으니까 실험적인 기능 개발도 부담 없이 시도할 수 있거든요.

---

**참고** 이 글은 실제 바이브 코딩 경험을 바탕으로 작성되었습니다. AI 도구를 활용한 개발 시에는 항상 생성된 코드를 검토하고 기존 시스템에 미치는 영향을 고려하시기 바랍니다.
