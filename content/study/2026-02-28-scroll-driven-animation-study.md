---
title: "스크롤 기반 애니메이션 스터디 — Scroll-driven vs Scroll-triggered"
date: "2026-02-28"
excerpt: "스크롤 연동 애니메이션과 스크롤 트리거 애니메이션의 차이, Intersection Observer API, Staggered Animation, Easing 함수, 그리고 성능 최적화까지 정리한 프론트엔드 애니메이션 스터디 노트."
tags: ["scroll-animation", "intersection-observer", "frontend", "css", "javascript", "react", "performance"]
category: "study"
---

## 1. 개념 정리

### Scroll-driven Animation (스크롤 연동 애니메이션)

스크롤 위치나 진행률에 따라 요소의 스타일이 연속적으로 변하는 애니메이션 기법이다. 스크롤바를 내릴수록 텍스트 색상이 바뀌거나, 글자 내부가 채워지거나, 배경이 전환되는 등의 효과가 이에 해당한다. Apple 제품 페이지가 대표적인 사례다.

관련 용어들:

- **Scroll Progress Animation** — 스크롤 진행률(0%~100%)에 요소 스타일을 매핑하는 방식
- **Text Reveal / Text Fill Animation** — 스크롤에 따라 텍스트가 채워지거나 색이 변하는 효과
- **Scrollytelling** — 스크롤 기반으로 스토리를 전달하는 인터랙티브 내러티브 기법

### Scroll-triggered Animation (스크롤 트리거 애니메이션)

특정 스크롤 위치에 도달했을 때 애니메이션이 **한 번 발동**되는 방식이다. 스크롤 연동과 달리 "트리거 → 재생"의 구조를 갖는다.

관련 용어들:

- **Scroll Reveal** — 스크롤해서 특정 위치에 도달하면 요소가 나타나는 효과의 통칭
- **Animate on Scroll (AOS)** — 같은 개념이며 동명의 라이브러리 이름이기도 함
- **Entrance Animation** — 요소가 뷰포트에 진입할 때 재생되는 애니메이션 (fade-in, slide-up, scale-up 등)

### 두 개념의 차이

| 구분 | Scroll-driven | Scroll-triggered |
|------|--------------|-----------------|
| 동작 방식 | 스크롤 위치에 **연속적으로** 반응 | 특정 위치 도달 시 **한 번** 발동 |
| 스크롤 되감기 시 | 애니메이션도 역방향으로 되돌아감 | 보통 한 번 재생 후 유지 |
| 대표 사례 | Apple 제품 페이지, 패럴랙스 | Dropbox 브랜드 페이지, 랜딩 페이지 |
| 주요 API | `animation-timeline: scroll()` | `IntersectionObserver` |

---

## 2. 핵심 기술: Intersection Observer API

Scroll Reveal의 핵심은 **Intersection Observer API**다. 요소가 뷰포트(또는 지정한 루트)에 얼마나 들어왔는지를 비동기적으로 감지한다.

### 기본 사용법

```js
const observer = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target); // 한 번만 트리거
    }
  },
  {
    threshold: 0.15,   // 요소의 15%가 보이면 트리거
    rootMargin: '0px'  // 뷰포트 기준 마진 조정 가능
  }
);

observer.observe(document.querySelector('.target'));
```

### 주요 옵션

- **threshold** — 0~1 사이 값. 요소가 몇 % 보여야 트리거할지 결정 (0.15 = 15%)
- **rootMargin** — 뷰포트 감지 영역을 확장/축소. `"-100px"`이면 화면 안쪽 100px에 들어와야 트리거
- **root** — 감지 기준 요소. 기본값은 뷰포트

### React 커스텀 훅으로 추상화

```jsx
function useInView(options = {}) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: options.threshold || 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, isInView];
}

// 사용
const [ref, isInView] = useInView({ threshold: 0.2 });
```

---

## 3. Staggered Animation (순차 등장 효과)

Dropbox 컬러칩처럼 요소들이 **하나씩 시간차를 두고** 등장하는 패턴이다. 핵심은 각 요소에 순서 기반의 `delay`를 부여하는 것이다.

### 구현 원리

```
[칩1: delay 0ms] → [칩2: delay 60ms] → [칩3: delay 120ms] → ...
```

### CSS transition 방식

```jsx
{colors.map((color, index) => (
  <div
    style={{
      transform: isInView ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.85)',
      opacity: isInView ? 1 : 0,
      transition: `
        transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 60}ms,
        opacity 0.45s ease ${index * 60}ms
      `,
    }}
  />
))}
```

### CSS animation 방식

```css
@keyframes chipReveal {
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.85);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.chip.revealed {
  animation: chipReveal 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

/* JS로 각 칩에 딜레이 부여 */
.chip:nth-child(1) { animation-delay: 0ms; }
.chip:nth-child(2) { animation-delay: 60ms; }
.chip:nth-child(3) { animation-delay: 120ms; }
/* ... */
```

---

## 4. Easing 함수 선택

애니메이션의 **느낌**을 결정하는 핵심 요소다.

| Easing | cubic-bezier 값 | 느낌 |
|--------|----------------|------|
| **Spring (탄성)** | `(0.34, 1.56, 0.64, 1)` | 살짝 오버슈팅 후 제자리. "뿅" 느낌 |
| **Smooth out** | `(0.22, 1, 0.36, 1)` | 부드럽게 감속. 자연스러운 등장 |
| **Snappy** | `(0.16, 1, 0.3, 1)` | 빠르게 튀어나와 즉시 멈춤 |
| **Ease out expo** | `(0.19, 1, 0.22, 1)` | 극적인 감속. 고급스러운 느낌 |

Spring easing의 두 번째 값(`1.56`)이 1을 초과하면 목표 위치를 **살짝 지나쳤다가 돌아오는** 오버슈팅 효과가 생긴다. 이것이 "뿅뿅" 튀어나오는 느낌의 핵심이다.

---

## 5. 대표 라이브러리

### GSAP ScrollTrigger

업계 표준급 라이브러리. 스크롤 연동과 스크롤 트리거 모두 지원하며, 가장 풍부한 기능과 브라우저 호환성을 제공한다.

```js
gsap.from('.chip', {
  scrollTrigger: {
    trigger: '.color-section',
    start: 'top 80%',
  },
  y: 40,
  scale: 0.85,
  opacity: 0,
  duration: 0.55,
  stagger: 0.06,
  ease: 'back.out(1.7)',
});
```

### Framer Motion (React)

React 생태계에서 가장 인기 있는 애니메이션 라이브러리. 선언적 API가 직관적이다.

```jsx
<motion.div
  initial={{ opacity: 0, y: 40, scale: 0.85 }}
  whileInView={{ opacity: 1, y: 0, scale: 1 }}
  viewport={{ once: true, amount: 0.15 }}
  transition={{
    type: 'spring',
    stiffness: 300,
    damping: 20,
    delay: index * 0.06,
  }}
/>
```

### AOS (Animate on Scroll)

가장 간단한 Scroll Reveal 라이브러리. HTML 속성만으로 동작한다.

```html
<div data-aos="fade-up" data-aos-delay="100">
  컬러칩
</div>
```

### CSS 네이티브 (animation-timeline)

브라우저 네이티브 API로, 별도 라이브러리 없이 스크롤 연동 애니메이션을 구현할 수 있다. 아직 브라우저 지원이 제한적이다.

```css
.element {
  animation: reveal linear both;
  animation-timeline: scroll();
  animation-range: entry 0% entry 100%;
}
```

---

## 6. 성능 최적화 팁

1. **transform과 opacity만 애니메이션한다** — `width`, `height`, `top`, `left` 등은 레이아웃 재계산(reflow)을 유발한다. `transform`과 `opacity`는 GPU 가속이 가능해 60fps를 유지할 수 있다.

2. **will-change 속성을 적절히 사용한다** — 브라우저에 미리 최적화 힌트를 줄 수 있지만, 남용하면 오히려 메모리를 과다 사용한다.

3. **한 번 트리거 후 observer를 해제한다** — `observer.unobserve(el)`로 불필요한 감시를 중단한다.

4. **passive 이벤트 리스너를 사용한다** — 스크롤 이벤트에 `{ passive: true }` 옵션을 달아 스크롤 성능 저하를 방지한다.

5. **너무 많은 요소를 동시에 애니메이션하지 않는다** — 한 화면에 50개 이상의 요소가 동시에 transition되면 프레임 드롭이 발생할 수 있다.

---

## 7. 구현 체크리스트

- [ ] Intersection Observer로 뷰포트 진입 감지
- [ ] 초기 상태 설정 (opacity: 0, translateY, scale 등)
- [ ] 각 요소에 index 기반 stagger delay 부여
- [ ] Spring 또는 ease-out 계열 easing 적용
- [ ] transform/opacity만 사용하여 GPU 가속 확보
- [ ] 한 번 트리거 후 observer 해제 (once 패턴)
- [ ] 모바일에서 애니메이션 과부하 여부 테스트
