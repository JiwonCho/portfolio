import type { ExperiencePhase, ServiceScope } from './types';

export const experiencePhases: ExperiencePhase[] = [
  {
    id: 'phase-2022',
    period: '2022 – 2023',
    title: '퍼블리싱 · 운영 대응',
    ticketCount: 295,
    ticketBreakdown: 'DT 270 / TPT 17',
    summary:
      '프리비아 항공·숙소 영역의 마크업과 운영 이슈 대응이 중심이었습니다. GNB·햄버거 메뉴·퀵서치·헤더 같은 공통 영역과 크로스브라우징, 정책 반영 작업을 담당했습니다.',
    highlights: [
      '공통 영역(GNB · 햄버거 메뉴 · 퀵서치 · 헤더) 마크업',
      '항공 FAQ · 수하물 규정 등 정책 반영',
      '첫 개발성 과제 — 항공 오마카세 v1.0, 신규 바우처(the Red ST) 출시 대응',
    ],
  },
  {
    id: 'phase-2024',
    period: '2024',
    title: '대량 전시 · 컴포넌트 개발 진입',
    ticketCount: 426,
    ticketBreakdown: 'RVYN 306 / DT 116',
    summary:
      '연간 처리량이 3배로 뛴 해입니다. 반복 전시 작업의 처리 속도를 끌어올리는 동시에, 프리비아 해외패키지 신규 구축에 초기 구조 설계부터 참여하며 퍼블리싱에서 개발로 무게중심을 옮겼습니다.',
    highlights: [
      '해외패키지 신규 프로젝트 구축 참여(2024-07~) — SC / BLC / UI 3계층 컨벤션 정의',
      '서비스별로 흩어져 있던 메인 컴포넌트를 공용 디자인 시스템 패키지로 승격',
      '항공사·카드사 제휴 기획전 및 EM 템플릿 대량 제작',
      '자동 VOID 기능 · GA 이벤트 개발',
    ],
  },
  {
    id: 'phase-2025',
    period: '2025',
    title: '프론트엔드 개발 전환',
    ticketCount: 433,
    ticketBreakdown: 'DT 240 / TPT 157',
    summary:
      'tourvis-front 리포지토리 첫 커밋(2025-01-08) 이후 그 해에만 951건을 커밋했습니다. 투어비스와 프리비아 두 브랜드의 프런트를 동시에 맡기 시작한 시점입니다.',
    highlights: [
      '투어&티켓 상품상세 · 상품설명 · 이용후기 · 옵션선택 PC/MO 재구축',
      'USJ 패스 상품군 전담 — 맞춤 패스 찾기 · 비교함 · 입장시간 · 추가옵션',
      '프리비아 투어&티켓 메인을 레거시에서 Next.js App Router로 전면 리팩토링',
      'Braze 커스텀 인앱·인웹 메시지 템플릿 단독 구축',
      '네이버여행 제휴 예약 플로우 · 쿠폰/바우처 상품화 · 픽업 구글맵 연동',
    ],
  },
  {
    id: 'phase-2026',
    period: '2026',
    title: '아키텍처 · 품질 · 글로벌',
    ticketCount: 181,
    ticketBreakdown: '8월 11일 기준',
    summary:
      '기능 구현을 넘어 서비스 품질 지표를 직접 다루는 단계입니다. Next.js와 Nuxt 2를 오가며 두 브랜드 · 네 개 코드베이스를 동시에 다뤘습니다.',
    highlights: [
      'SEO(canonical URL · H1 · noindex · 사이트맵) 및 상품상세 LCP 개선',
      'server-only 위반 · 환경변수 중복 리팩토링으로 서버 전용 값 노출 차단',
      '프론트 API 요청 로그 포맷 규격화',
      '구글 TTD 글로벌 채널 · AI 요약/생성형 프로모션 FE',
      '예약상세 이용일 변경(다이나믹 프라이싱) 계획서부터 구현까지',
    ],
  },
];

export const serviceScopes: ServiceScope[] = [
  {
    name: '프리비아 (PRIVIA)',
    nature: '현대카드 계열 여행 플랫폼 — 항공·숙소·패키지·투어&티켓 전 영역',
    mentions: '421',
  },
  {
    name: '투어비스 (TOURVIS)',
    nature: '타이드스퀘어 자사 여행 브랜드 — 투어&티켓·호텔·패키지',
    mentions: '128',
  },
  {
    name: '투어&티켓 (투티)',
    nature: '액티비티·입장권 커머스. 최근 3년 주력 도메인',
    mentions: '121',
  },
  { name: '국내·해외 숙소', nature: '호텔 상세, 리뷰, 객실 상세, 숙박세일페스타 전시', mentions: '85' },
  {
    name: '해외패키지',
    nature: 'PC/MO 메인·검색·상품상세·예약, 공용 디자인 시스템, 웹 컴포넌트 퀵서치',
    mentions: '12',
  },
  {
    name: '제휴 채널',
    nature: '네이버여행, 지마켓, 구글 TTD, 스마트스토어, GYG, 트립닷컴, 아폴로',
    mentions: '30+',
  },
  {
    name: 'B2B · 복지몰',
    nature: 'BTMS(출장 관리), 베네피아, 휴가샵, 현대이지웰, 투어비스비즈',
    mentions: '20+',
  },
];
