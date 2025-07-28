---
title: 'macOS에서 shift+space로 한/영 변환 시 팝업 계속 떠서 열 받을 때'
excerpt: 'macOS Sonoma에서 shift+space로 한/영 변환할 때 나타나는 팝업을 제거하는 방법을 알아봅니다.'
tags: ['macOS', '한영변환', '키보드', '팝업제거', '시스템설정']
category: 'dev'
---

# macOS에서 shift+space로 한/영 변환 시 팝업 계속 떠서 열 받을 때

**환경**: macOS Sonoma 14.1  
**문제**: shift+space를 적용하고 싶은데 그놈의 popup이 계속 나와서 열 받는다.  
**해결**: 했음

## shift+space로 한/영 변환

기본적으로는 [이 사이트](https://seorenn.tistory.com/547)를 보면 되는데… 여기서 하나 놓친게 있어서 포스팅 남김. plist를 수정하면 되는데 60번이 아니라 61번을 수정해야 함. 왜냐하면 61번이 '입력 메뉴에서 다음 메뉴 선택'이라는 아주 짜증나는 옵션과 관련되어 있는데 이게 'language switch popup'을 띄우기 때문임.

### 01. plist 수정 화면 열기

다음 명령어를 눌러서 plist 수정 화면을 열고…

> xcode 깔려 있어야 함

```bash
open ~/Library/Preferences/com.apple.symbolichotkeys.plist
```

### 02. 61번 항목 수정

다음 화면에서 61번 > value > parameters를 순서대로 열고 **item 2를 131072로 수정한다.**

![plist 수정 화면](/images/2023-12-06-plist-01.png)

### 03. 재부팅

재부팅하면 그 꼴보기 싫은 'language switch popup' 없이 한/영 전환을 shift+space로 할 수 있게 됨.

## 요약

1. **문제**: macOS에서 shift+space로 한/영 변환 시 팝업이 계속 나타남
2. **원인**: plist의 61번 항목이 'language switch popup'을 활성화
3. **해결**: `com.apple.symbolichotkeys.plist`에서 61번 > value > parameters > item 2를 131072로 수정
4. **결과**: 재부팅 후 팝업 없이 shift+space로 한/영 변환 가능

이 방법으로 macOS에서 깔끔하게 한/영 변환을 사용할 수 있습니다! 