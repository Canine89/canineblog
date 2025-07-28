---
title: '내 espanso 설정 - 텍스트 확장 도구 활용법'
excerpt: 'macOS에서 espanso를 사용한 텍스트 확장 설정과 유용한 단축어들을 공유합니다.'
tags: ['espanso', 'macOS', '텍스트확장', '단축어', '생산성', '도구']
category: 'dev'
---

# 내 espanso 설정 - 텍스트 확장 도구 활용법

espanso는 크로스 플랫폼 텍스트 확장 도구로, 자주 사용하는 텍스트나 이모지를 빠르게 입력할 수 있게 해줍니다. 개인적으로 사용하는 설정을 공유합니다.

## 기본 설정 파일

```yaml
matches:
  # 화살표 및 방향 표시
  - trigger: "@>"
    replace: ▶
  - trigger: "@<"
    replace: ◀
  - trigger: "@,"
    replace: ▼
  - trigger: "\\>>"
    replace: 》
  - trigger: "\\<<"
    replace: 《

  # 숫자 원문자
  - trigger: "@1"
    replace: ➊
  - trigger: "@2"
    replace: ➋
  - trigger: "@3"
    replace: ➌
  - trigger: "@4"
    replace: ➍
  - trigger: "@5"
    replace: ➎
  - trigger: "@6"
    replace: ➏
  - trigger: "@7"
    replace: ➐
  - trigger: "@8"
    replace: ➑
  - trigger: "@9"
    replace: ➒

  # 기타 유용한 기호들
  - trigger: "@-"
    replace: ━
  - trigger: "\\dot"
    replace: ·
  - trigger: "->"
    replace: ➝
  - trigger: "\\..."
    replace: ... 생략 ...

  # 개발용 태그
  - trigger: "\\todo"
    replace: <todo> 01
  - trigger: "\\note"
    replace: <note></note>
  - trigger: "\\lv"
    replace: 단계

  # 긴 텍스트 샘플
  - trigger: "@lorem"
    replace: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

  # 경로 단축
  - trigger: "@desk"
    replace: "C:\\Users\\phk70\\Desktop"

  # 날짜 자동 입력
  - trigger: ":date"
    replace: "{{mytime}}"
    vars:
      - name: mytime
        type: date
        params:
          format: "%Y.%m.%d."
```

## 주요 기능별 설명

### 1. 화살표 및 방향 표시
- `@>` → ▶ (오른쪽 화살표)
- `@<` → ◀ (왼쪽 화살표)
- `@,` → ▼ (아래쪽 화살표)
- `\>>` → 》 (큰 오른쪽 화살표)
- `\<<` → 《 (큰 왼쪽 화살표)

### 2. 숫자 원문자
- `@1` ~ `@9` → ➊ ~ ➒ (원문자 숫자)

### 3. 기타 유용한 기호
- `@-` → ━ (긴 수평선)
- `\dot` → · (중점)
- `->` → ➝ (화살표)
- `\...` → ... 생략 ... (생략 표시)

### 4. 개발용 태그
- `\todo` → <todo> 01 (할 일 태그)
- `\note` → <note></note> (노트 태그)
- `\lv` → 단계 (단계 표시)

### 5. 긴 텍스트 샘플
- `@lorem` → Lorem Ipsum 텍스트 (테스트용)

### 6. 경로 단축
- `@desk` → 데스크톱 경로

### 7. 날짜 자동 입력
- `:date` → 현재 날짜 (YYYY.MM.DD. 형식)

## 사용 팁

1. **트리거 설정**: 자주 사용하는 패턴을 트리거로 설정
2. **단계적 확장**: 간단한 것부터 시작해서 점진적으로 추가
3. **카테고리별 관리**: 용도별로 그룹화하여 관리
4. **정기적 업데이트**: 사용하지 않는 설정은 제거

## 설치 및 설정

```bash
# espanso 설치 (macOS)
brew install espanso

# 설정 파일 위치
~/.config/espanso/default.yml

# 설정 적용
espanso restart
```

이 설정으로 텍스트 입력 속도를 크게 향상시킬 수 있습니다! 