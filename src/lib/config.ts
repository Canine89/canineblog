export const siteConfig = {
  // 블로그 기본 정보
  title: "편집자P의 AI/AGENT 편집실",
  description: "공부하고, 쓰고, 익혀라",

  // 블로그 주인 정보
  author: {
    name: "편집자P",
    email: "hgpark@goldenrabbit.co.kr",
    bio: "개발이 취미인 컴공과 출신 IT 도서 기획/편집자이자 IT 애호가. 활동명 편집자P로 더 많이 알려져 있습니다. 사내에서 사용하는 각종 자동화 앱을 파이썬, 자바스크립트로 개발하여 적극 활용하고 있습니다. IT 지식을 더 쉽게 나누기 위해 책을 쓰고, 유튜브와 쇼츠를 제작하며, ai100.co.kr 홈페이지를 운영하고 있습니다.",
    avatar: "/avatar.jpg", // 프로필 이미지가 없으면 null로 설정
    social: {
      github: "https://github.com/canine89",
      threads: "https://www.threads.com/@limedaddy_8924",
      youtube: "https://www.youtube.com/@editorp89",
      instructor: "https://docs.google.com/document/d/1bZ1TlO8acV-tytns-vXeQ_EP_RXNXvG2kYiKZQzku8g/edit?tab=t.0",
    }
  },

  // 블로그 설정
  blog: {
    postsPerPage: 6,
    defaultLanguage: "ko",
    defaultTimezone: "Asia/Seoul",
  },

  // 사이트 설정
  site: {
    url: "https://canineblog.vercel.app/", // Vercel 배포 후 실제 도메인으로 변경
    language: "ko",
    theme: "light", // light, dark, auto
  },

  // Google 서비스 설정
  google: {
    adsenseId: "ca-pub-1531500505272848",
    analyticsId: "G-XXXXXXXXXX", // Google Analytics 4 측정 ID로 교체 필요
  }
} 
