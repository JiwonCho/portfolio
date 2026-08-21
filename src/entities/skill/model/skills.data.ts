import type { SkillGroup } from './types';

export const skillGroups: SkillGroup[] = [
  {
    id: 'core',
    label: '언어 · 코어',
    description: '두 브랜드 · 네 개 코드베이스를 오가며 사용한 프레임워크입니다.',
    skills: [
      { name: 'TypeScript', primary: true, note: '전 코드베이스 기본 언어' },
      { name: 'React 18 / 19', primary: true, note: '서버·클라이언트 컴포넌트 경계 설계' },
      {
        name: 'Next.js 14 · 16',
        primary: true,
        note: 'App Router · Pages Router 병행, 레거시 → App Router 전면 리팩토링',
      },
      { name: 'Nuxt 2 / Vue 2', primary: true, note: '프리비아 투티 예약·결제 영역' },
      { name: 'JavaScript' },
      { name: 'HTML / CSS' },
    ],
  },
  {
    id: 'state',
    label: '상태 관리',
    description: '전역 상태 오염을 막는 격리 설계에 관심이 많습니다.',
    skills: [
      { name: 'TanStack Query v4/v5', primary: true },
      { name: 'Zustand', primary: true },
      { name: 'Redux Toolkit', primary: true, note: '상품 ID별 브랜치로 그룹상품 상태 격리' },
      { name: 'Jotai' },
      { name: 'SWR' },
      { name: 'immer' },
      { name: 'Vuex' },
    ],
  },
  {
    id: 'style',
    label: '스타일링',
    description: '',
    skills: [
      { name: 'Tailwind CSS v4', primary: true },
      { name: 'Radix UI', primary: true, note: 'CVA + tailwind-merge (shadcn 계열)' },
      { name: 'Emotion' },
      { name: 'styled-components' },
      { name: 'SCSS' },
      { name: 'MUI' },
    ],
  },
  {
    id: 'quality',
    label: '품질 · 테스트',
    description: '경계와 변환 계층에는 테스트를 붙여 회귀를 막습니다.',
    skills: [
      { name: 'Jest + Testing Library', primary: true, note: '어댑터·옵션 slice·정책 유틸' },
      { name: 'Playwright', primary: true, note: '결제 E2E' },
      { name: 'Storybook', primary: true, note: '공용 UI 패키지 스토리 109개' },
      { name: 'react-hook-form + Zod', primary: true },
      { name: 'ESLint · Prettier · Stylelint' },
    ],
  },
  {
    id: 'ops',
    label: '모니터링 · 분석',
    description: '',
    skills: [
      { name: 'Sentry', primary: true, note: '무시 규칙·차단 URL 필터로 노이즈 정리' },
      { name: 'GA4 / GTM', primary: true, note: '이관 시 이벤트 전수 대조' },
      { name: 'pino 구조화 로깅', note: 'API 요청 로그 포맷 규격화' },
      { name: 'Matomo' },
    ],
  },
  {
    id: 'arch',
    label: '아키텍처 · 빌드',
    description: '여러 개발자가 따를 구조를 정의하는 일을 반복해 맡았습니다.',
    skills: [
      { name: 'pnpm workspace 모노레포', primary: true, note: '앱 6개 + 공용 패키지' },
      {
        name: 'FSD',
        primary: true,
        note: 'app/entities/features/widgets/shared + eslint-plugin-boundaries',
      },
      { name: 'SC / BLC / UI 3계층 컨벤션', primary: true, note: 'App Router 클라이언트 경계 고정' },
      { name: 'Lit + Rollup 웹 컴포넌트', primary: true, note: 'React 트리 밖 퀵서치 단일 번들' },
      { name: 'Nunjucks + Gulp + SCSS', note: 'Braze 템플릿 빌드 파이프라인' },
    ],
  },
  {
    id: 'integration',
    label: '외부 연동',
    description: '',
    skills: [
      { name: 'PayPal', primary: true, note: 'USD 주문 생성 · 서버 캡처' },
      { name: 'Google Maps (+ Plus Code)', primary: true },
      { name: 'Braze', primary: true, note: '커스텀 인앱·인웹 메시지 단독 구축' },
      { name: 'Mapbox GL' },
      { name: 'Supabase' },
      { name: 'Hono' },
      { name: 'ioredis' },
      { name: 'react-pdf' },
      { name: 'Swiper' },
    ],
  },
  {
    id: 'standards',
    label: '웹 표준 · 접근성',
    description: '퍼블리싱 11년 8개월 동안의 축이었고, 지금은 SEO·시맨틱·렌더링 품질로 이어집니다.',
    skills: [
      {
        name: '웹 접근성',
        primary: true,
        note: '민간개발자 웹 접근성 전문교육 수료(한국생산성본부) · 공공·금융·대기업 사이트 접근성 대응',
      },
      { name: 'SEO', primary: true, note: 'canonical · H1 · noindex · sitemap · JSON-LD 구조화 데이터' },
      { name: 'Core Web Vitals', primary: true, note: 'LCP 개선 · 스켈레톤으로 CLS 제거 · 이미지 ratio 최적화' },
      { name: '시맨틱 마크업', note: '헤딩 트리 정리, 대체 텍스트 보강' },
      { name: '크로스브라우징', note: 'iOS 백화·dvh·주소창 대응' },
    ],
  },
  {
    id: 'ai',
    label: 'AI 활용',
    description: '',
    skills: [
      {
        name: '기술 지식 문서(tech knowledge) 체계',
        primary: true,
        note: 'AI 코딩 에이전트가 참조할 문서를 직접 작성·운영',
      },
      { name: '리포지토리 스킬 규칙 정비' },
      { name: 'AI 요약 · 생성형 프로모션 FE' },
    ],
  },
];
