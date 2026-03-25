---
title: "바이브 코딩하는 사람들, 컴포넌트 라이브러리가 바뀝니다 — HeroUI v3"
date: "2026-03-25"
excerpt: "unclejobs.ai 님 Threads 스레드 전체를 옮긴 글. HeroUI v3의 MCP·Agent Skills·LLMs.txt, compound 컴포넌트, CSS 애니메이션, 스타일 분리, HeroUI Native, 설치·Figma까지 한 번에 정리합니다."
tags: ["HeroUI", "NextUI", "바이브코딩", "Tailwind", "MCP", "React", "React-Native", "UI", "Figma"]
category: "dev"
---

아래 글은 [unclejobs.ai 님의 Threads 스레드](https://www.threads.com/@unclejobs.ai/post/DWNrKlTiSof?xmt=AQF0UoyWeaO1NrAj3-d-UWn7CsDv69LVHmGNsH5Gw8lnNw)를 블로그용으로만 다듬었습니다. 표현·주장은 원문을 따릅니다.

바이브 코딩하는 사람들, 컴포넌트 라이브러리가 바뀝니다.

HeroUI v3가 나왔습니다. 완전히 새로 썼어요. 웹 75개 이상, React Native 37개. 그리고 AI한테 컴포넌트 문서를 직접 읽게 해주는 MCP 서버까지 달려 있습니다.

Framer Motion을 전부 빼고 CSS 애니메이션으로 갈아탔고, Tailwind CSS v4 네이티브 지원에, 스타일과 동작이 완전히 분리돼서 headless로도 쓸 수 있어요.

왜 이게 바이브 코딩하는 사람한테 중요하냐. 하나씩 풀어볼게요.

## Q. AI가 컴포넌트를 맨날 틀리는 문제, 해결됐나요?

바이브 코딩의 고질적 문제가 하나 있죠. "Button 하나 만들어줘" 하면 AI가 학습 데이터에서 기억나는 대로 만들어요. 공식 API가 바뀌어도 모릅니다. prop 이름을 틀리고, deprecated된 패턴을 쓰고.

HeroUI v3는 이걸 세 겹으로 막았어요.

### 1. MCP 서버

Claude Code, Cursor, VS Code Copilot, Windsurf 같은 AI 코딩 도구에 연결합니다. AI가 컴포넌트 문서, props, 소스 코드, 테마 변수를 직접 읽어요. 학습 데이터에서 추측하는 게 아니라 원본을 참조하는 거죠.

### 2. Agent Skills

Cursor랑 Claude Code용 지식 팩이에요. 컴포넌트 패턴, variant 사용법, 테마 설정, 업그레이드 가이드가 미리 들어 있습니다. AI가 HeroUI 코드를 처음부터 맞게 써요.

### 3. LLMs.txt

구조화된 문서 파일을 `/llms.txt`랑 `/llms-components.txt`로 퍼블리시합니다. 아무 LLM 도구든 읽을 수 있는 기계 친화적 API 요약본이에요.

"HeroUI 최신 버전으로 업데이트해줘"라고 AI한테 시키면, 버전 비교하고, 체인지로그에서 브레이킹 체인지 찾아서, 코드 수정까지 알아서 해줍니다. MCP 서버가 문서를 실시간으로 읽으니까 가능한 거예요.

## Q. 컴포넌트가 어떻게 바뀐 건가요?

v2까지는 컴포넌트가 블랙박스였습니다. Card 하나 쓰면 내부 구조를 건드릴 수 없었어요. 커스터마이징은 className prop이 뚫려 있는 데까지만.

v3는 전부 compound component로 바꿨습니다. Card 안에 Header, Title, Body, Footer가 전부 독립적인 엘리먼트예요. 각각 스타일하고, 순서 바꾸고, 아예 빼버릴 수도 있습니다. Accordion부터 Toast까지 전 컴포넌트가 이 구조.

근데 간단하게 쓸 때는 간단하게 써도 돼요. `<Button>Submit</Button>` 한 줄로 시작해서, 아이콘 넣고 싶으면 안에 추가하고, 로딩 상태까지 제어하고 싶으면 더 풀어쓰면 됩니다. 필요한 만큼만 복잡하게. Progressive Disclosure예요.

## Q. Framer Motion을 빼면 애니메이션은 어떻게 해요?

전부 CSS 트랜지션이랑 키프레임으로 갈아탔습니다. 팝오버가 열릴 때 페이드인, 버튼 누를 때 살짝 줄어드는 효과. 이런 것들이 전부 data attribute에 연결된 CSS로 돌아가요.

GPU 가속이 되고, JS 애니메이션 런타임이 번들에서 사라졌으니까 가벼워졌습니다.

Framer Motion이 꼭 필요하면 같이 쓸 수도 있어요. 강제로 빼는 게 아니라 기본값이 CSS로 바뀐 겁니다. 모션 감소 설정도 자동 반영돼서, 시스템 설정이나 앱 레벨에서 한 줄로 애니메이션 전체를 끌 수 있고요.

## Q. 스타일 시스템이 어떻게 바뀌었나요?

이게 아키텍처에서 가장 큰 변화입니다.

`@heroui/styles`가 독립 CSS 패키지로 빠졌어요. `@heroui/react`는 동작만 담당합니다. 스타일을 React 없이 HTML + Tailwind만으로도 쓸 수 있고, 거꾸로 styles import를 빼면 headless 라이브러리가 돼요. 기능과 접근성은 유지되고 스타일만 내가 가져가는 겁니다.

BEM 클래스명이라서 글로벌 오버라이드도 CSS에서 바로 됩니다. className을 prop으로 내려주는 삽질이 사라져요. 디자인 시스템 오버라이드가 원래 있어야 할 자리, CSS에서 일어나는 거죠.

테마는 전부 CSS 변수예요. Tailwind v4의 네이티브 CSS 변수 레이어 위에서 돌아가고 색상은 OKLCH. Provider 컴포넌트도 없고, JS 테마 객체도 없습니다. CSS import 두 줄이면 끝이에요. 다크 모드는 변수 값만 바꾸면 되고, 커스텀 테마는 `data-theme="ocean"` 같은 attribute 하나로 적용합니다. Theme Builder에서 시각적으로 색상 고르고, 라운딩 조절한 뒤 CSS를 내면 돼요.

## Q. React Native도 나왔다고요?

HeroUI Native가 같이 나왔습니다. 37개 컴포넌트. 웹이랑 완전히 별도의 라이브러리인데, 쓰는 느낌은 거의 같아요. 같은 컴포넌트 이름, 같은 dot notation, 같은 prop 패턴. 웹에서 Alert를 쓰는 방식이랑 네이티브에서 Alert 쓰는 방식이 거의 동일합니다.

디자인 토큰도 공유돼요. `accent`, `surface`, `danger` 같은 색상이 웹과 네이티브에서 동일하게 풀립니다. 브랜드 일관성을 두 시스템 따로 관리할 필요가 없어졌어요.

독특한 기능이 하나 있는데, Adaptive Presentation Modes예요. Popover, Select, Menu가 prop 하나로 popover, bottom-sheet, dialog 사이를 전환합니다. 같은 컴포넌트인데 맥락에 따라 다르게 보여주는 거예요. 다른 React Native 라이브러리에 이 기능은 없습니다.

네이티브도 MCP 서버랑 Agent Skills가 따로 있어서 AI 도구가 네이티브 컴포넌트 문서를 직접 읽어요.

## Q. 컴포넌트 75개, 뭐가 있어요?

카테고리별로 정리하면 이렇습니다.

**Date & Time** — Calendar, DatePicker, DateRangePicker 등 6개. 그레고리안, 불교, 페르시아 달력까지 기본 지원. 국제화가 내장돼 있어요.

**Color** — ColorPicker, ColorArea, ColorSlider 등 6개. 2D 영역에서 고르고, 슬라이더로 조절하고, hex로 입력하고, 스워치에서 선택.

**Data** — Table이 정렬, 행 선택, 컬럼 리사이징, 비동기 로딩, 가상화까지 전부 지원합니다. 1,000행도 매끄럽게 돌아가요.

**Forms** — TextField, Select, ComboBox, Checkbox, Switch, InputOTP, Slider 등 13개. React Aria 폼 검증이 통합돼 있어서 `isRequired`, `isInvalid` 전부 동작합니다.

**Overlays** — Drawer(4방향 + 드래그 닫기), Toast(자동 닫기 + Promise), Menu(서브메뉴), Modal, AlertDialog, Popover, Tooltip. 7개.

**Navigation** — Tabs, Accordion, Breadcrumbs, Pagination, Link.

**Feedback** — ProgressBar, ProgressCircle, Meter(의미론적 색상), Skeleton, Spinner.

## Q. 어떻게 설치하나요?

```bash
npm i @heroui/styles @heroui/react
```

CSS 파일에 두 줄 추가하면 끝이에요.

```css
@import "tailwindcss";
@import "@heroui/styles";
```

필요한 컴포넌트 CSS만 골라서 import할 수도 있어서, 안 쓰는 컴포넌트 스타일이 프로덕션에 안 들어갑니다.

> 원문 스레드에는 `npm i heroui/styles heroui/react`처럼 적혀 있었는데, 공식 패키지는 스코프가 `@heroui/`입니다. 설치가 안 되면 위 명령을 쓰면 됩니다.

## Q. Figma Kit도 있나요?

모든 컴포넌트가 Figma에서 1:1로 매칭됩니다. 같은 variant, 같은 네이밍, 같은 구조. 디자인 토큰이 Figma 변수에 직접 매핑돼요. Figma의 새 slots 기능으로 디자이너가 코드에서 하는 것과 같은 방식으로 조각을 배치하고 바꿀 수 있습니다.

## 마무리

바이브 코딩이 "대충 만드는 것"에서 "잘 만드는 것"으로 넘어가려면 AI가 컴포넌트를 제대로 알아야 합니다. MCP 서버로 문서를 직접 읽게 하고, Agent Skills로 패턴을 미리 가르치고, LLMs.txt로 API 요약을 기계가 읽을 수 있게 만들었어요.

여기에 compound components로 커스터마이징 자유도까지 올렸으니, "AI한테 시키면 다 비슷하게 나온다"는 문제가 상당히 줄어들 거예요.

---

**출처:** [unclejobs.ai · Threads](https://www.threads.com/@unclejobs.ai/post/DWNrKlTiSof?xmt=AQF0UoyWeaO1NrAj3-d-UWn7CsDv69LVHmGNsH5Gw8lnNw) · 공식 문서는 [HeroUI v3](https://v3.heroui.com/docs)를 참고하면 됩니다.
