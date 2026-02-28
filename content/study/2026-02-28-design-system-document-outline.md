---
title: "디자인 시스템 문서 구성 항목"
date: "2026-02-28"
excerpt: "디자인 시스템을 위한 문서 구성 가이드. 표지부터 색상·타이포·간격·컴포넌트(Atom/Molecule/Organism)·그리드·아이콘·상태 인터랙션까지 10개 섹션, 30+ 토큰, 50+ 컴포넌트 상태 구성 예시."
tags: ["design-system", "design-tokens", "atomic-design", "ui-ux", "documentation"]
category: "study"
---

## 1. 표지 (Cover)

- 프로젝트명 / 브랜드명
- 버전 정보 (v1.0)
- 작성 날짜
- 영감 출처 / 태그라인

---

## 2. 색상 시스템 (Color System)

- **기본 색상** — 배경색 (Primary, Secondary, Tertiary, Dark)
- **텍스트 색상** — 주요/보조/3차/뮤트/반전 텍스트
- **시맨틱 액센트** — Blue, Green, Red, Yellow, Purple (기능적 의미 부여)

---

## 3. 타이포그래피 (Typography)

- **폰트 패밀리** — 디스플레이, 본문/UI, 코드용 각각 지정
- **타입 스케일** — 48px → 12px까지 단계별 크기, weight, line-height 정의
- **한글/영문 각각의 폰트 매핑**

---

## 4. 간격 (Spacing)

- **스페이싱 스케일** — xs(4) ~ 4xl(64)까지 단계별 간격 토큰
- **테두리 반경** — sm(4) ~ full(999)까지 단계별 라운딩 토큰

---

## 5. 컴포넌트 / 원자 (Atoms)

| 컴포넌트 | 변형 |
|----------|------|
| **버튼** | Primary, Secondary, Outline, Ghost, Danger + 크기 변형(S/M/L) + 아이콘 버튼 |
| **입력 필드** | Default, Focused, Error 상태 |
| **뱃지/태그** | Default, Info, Success, Warning, Error, Feature, Neutral |
| **토글/체크박스/라디오** | On/Off 상태 |
| **아바타** | S(32) / M(40) / L(48) / XL(64) 크기 변형 |

---

## 6. 컴포넌트 / 분자 (Molecules)

- **검색 바** — 아이콘 + 플레이스홀더 + 키보드 단축키
- **블로그 게시글 카드** — 이미지 + 태그 + 제목 + 설명 + 날짜/읽기 시간
- **내비게이션 탭** — 활성/비활성 상태
- **코드 블록** — 언어 표시 + 복사 버튼 + 구문 강조

---

## 7. 컴포넌트 / 유기체 (Organisms)

- **헤더/내비게이션 바** — 로고 + 메뉴 + 검색/테마 토글
- **푸터** — 브랜드 + 태그라인 + 링크 컬럼 + 저작권
- **아티클 콘텐츠 블록** — 메타정보 + 제목 + 본문 + 소제목 구조

---

## 8. 그리드 및 레이아웃 (Grid & Layout)

- **레이아웃 패턴** — 단일 컬럼(아티클), 2단(사이드바), 카드 그리드
- **브레이크포인트** — Mobile(&lt;640), Tablet(640-1024), Desktop(&gt;1024)

---

## 9. 아이콘 (Iconography)

- 아이콘 세트 선정 (Lucide)
- 자주 사용하는 아이콘 16종 + 사이즈/선 두께 가이드

---

## 10. 상태 및 인터랙션 (States & Interactions)

| 영역 | 항목 |
|------|------|
| **버튼 상태** | Default, Hover, Active, Focus, Disabled |
| **입력 필드 상태** | Default, Focused, Error, Success, Disabled |
| **카드 인터랙션** | Default, Hover(shadow), Selected(accent border) |
| **모션/트랜지션** | Micro(150ms), Standard(250ms), Expressive(400ms) + easing 함수 |

---

## 추가로 고려된 요소

- **디자인 토큰 변수화** — 색상, 간격, 반경 등을 변수로 관리
- **아토믹 디자인 패턴 적용** (Atom → Molecule → Organism)
- **다국어 지원** — 영문/한글 버전 병렬 제작, 각 언어에 맞는 폰트 매핑

---

총 10개 섹션, 30+ 디자인 토큰, 50+ 컴포넌트 상태로 구성되어 있습니다.
