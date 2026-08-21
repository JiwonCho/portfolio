import type { CareerEntry, ExperiencePhase, ServiceScope } from './types';

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

/**
 * 타이드스퀘어 이전 경력 — 웹 퍼블리셔 · 프론트엔드 (2010.01 – 2021.10, 11년 8개월).
 * 이력서(2021-11-16 최종수정본) 기준. 최신 순.
 */
export const careerHistory: CareerEntry[] = [
  {
    id: 'monobrain',
    company: '모노브레인',
    period: '2020.10 – 2021.10',
    duration: '1년 1개월',
    role: '퍼블리싱 차장 · 팀장',
    focus: '웹표준 · 웹접근성',
    summary: 'KERIS 디지털교과서 PM · 초등 전자저작물 스크립트·모션 총괄',
    highlights: [
      'KERIS 초등 3·4학년 사회·과학 디지털교과서 출판 — 제작 가이드 및 스크립트 총괄, PM으로 참여',
      '초등 3~6학년 전자저작물 출판 — 전자저작물에 사용된 스크립트 및 모션 전반 담당',
    ],
    stack: ['JavaScript', 'HTML/CSS', '웹접근성'],
  },
  {
    id: 'mediaforce-one',
    company: '미디어포스원',
    period: '2013.02 – 2020.07',
    duration: '7년 6개월',
    role: 'MG WP 차장',
    focus: '웹표준 · 웹접근성',
    summary:
      'NC소프트 · EPSON · 한화테크윈 · KT&G · AJ셀카 · 롯데건설 · 르노삼성 운영, 국민카드 라이프플라자몰 퍼블리싱 PL',
    highlights: [
      'NC소프트 프로모션 5년 담당(2015.05–2020.06) — 리니지·리니지2·블레이드&소울·아이온 프로모션 및 업데이트 페이지 FE 개발. 타이트한 일정에도 높은 완성도로 고객사 평가를 받음',
      'EPSON 제품군 웹 카달로그·프로모션 접근성 FE 개발(2014.09–2020.06)',
      '한화테크윈 사이트 운영(2014.02–2020.06) — 삼성테크윈부터 이어진 앱 개발 참여로 현업 개발팀과 관계를 유지하며 여러 앱 프로젝트에 합류',
      'AJ셀카 차량 견적 비교평가 시스템 개발 참여 및 전체 사이트 운영(2018.03–2020.03)',
      'KT&G lil · 사회공헌 · 복지재단 · 기업 사이트 운영(2014.02–2019.02)',
      '삼성 헬스케어 닷컴 · 롯데건설 · 삼성 래미안 분양 · 르노삼성자동차 사이트 운영',
      '국민카드 라이프 플라자 몰 구축(2015.01–05) — 퍼블리싱 PL로 업무 스케줄 및 CSS/JS 가이드 작업. 보안 이슈로 열악한 환경이었으나 팀을 이끌어 성공적으로 마무리',
      '삼성테크윈 SMART ROOM Control tablet · SSM VA10 V2.0 · PNP 모바일 앱 구축 — AngularJS 적용',
      'KT&G 청년창업 지원센터 · 2016 상상실현 페스티벌 구축',
    ],
    stack: ['AngularJS', 'PIXI.js', 'TweenMax', 'jQuery', 'CSS at-rule', '웹접근성'],
  },
  {
    id: 'cloud9',
    company: '클라우드나인',
    period: '2012.06 – 2013.01',
    duration: '8개월',
    role: '퍼블리싱 대리 · 파트장',
    focus: '웹표준 · 웹접근성',
    summary: 'KCB 파견 — allcredit 차세대, d3.js 연봉통계 그래프, 사내 TM 시스템',
    highlights: [
      '신용등급 검색 및 개인 신용관리 사이트(allcredit.co.kr) 차세대 프로젝트 — 디자인·개발 파트 간 커뮤니케이션 효율에 기여',
      '연봉검색·연봉통계·개인연봉관리 사이트 — d3.js 통계 그래프와 데이터 적용으로 개발 파트를 지원해 업무 소요 시간 단축',
      'KCB 사내 TM(TeleMarketing) 시스템 구축 — jqGrid + ajax 활용',
      'KCB 파견 근무로 현업 커뮤니케이션과 타 파트 협업 경험. 파트장으로 후임 기술 향상과 스케줄 관리 담당',
    ],
    stack: ['d3.js', 'jqGrid', 'jQuery', 'ajax'],
  },
  {
    id: 'weesgroup',
    company: '위즈그룹',
    period: '2012.02 – 2012.06',
    duration: '5개월',
    role: 'e-bi 본부 대리',
    focus: '웹표준 · 웹접근성 · 컨텐츠 관리',
    summary: 'ASP · ASP.NET 프로젝트를 병행하며 프론트엔드 개발 역할로 확장',
    highlights: [
      'e-bi 본부 제작파트에서 퍼블리싱과 함께 ASP · ASP.NET 프로젝트를 수행하며 프론트엔드 개발자로서의 역할을 익힘',
    ],
    stack: ['ASP', 'ASP.NET', 'jQuery'],
  },
  {
    id: 'easeldesign',
    company: '이젤디자인',
    period: '2011.02 – 2012.02',
    duration: '1년 1개월',
    role: '디자인파트 퍼블리싱 주임 · 계장',
    focus: '웹접근성 코딩 및 jQuery 모션',
    summary: '디자이너·개발자 사이 조율 역할, 사내 퍼블리싱 교육 운영',
    highlights: [
      '퍼블리싱과 함께 디자이너·개발자 사이의 중간자 역할을 수행하며 프로젝트 진행을 조율',
      '업무 시간 이후 사내 구성원에게 퍼블리싱과 프로젝트 수행 노하우를 가르치는 교육 시간 운영',
    ],
    stack: ['jQuery', 'HTML/CSS', '웹접근성'],
  },
  {
    id: 's-prism',
    company: '에스프리즘',
    period: '2010.01 – 2011.02',
    duration: '1년 2개월',
    role: '웹퍼블리싱 사원',
    focus: '웹접근성 코딩 및 스크립트 구현',
    summary: '대형 프로젝트 유지보수 — 업무 분할과 협업의 기본기를 익힌 시기',
    highlights: [
      '대형 프로젝트 유지보수를 맡으며 업무 분할과 협업의 중요성을 익힌 시기',
    ],
    stack: ['HTML/CSS', 'JavaScript', '웹접근성'],
  },
];

export const careerSummary = {
  period: '2010.01 – 2021.10',
  duration: '11년 8개월',
  title: '웹 퍼블리셔 · 프론트엔드',
  description:
    '에이전시에서 11년 8개월간 웹 표준·웹 접근성 기반 퍼블리싱을 담당했습니다. 게임·전자·금융·건설·공공 등 도메인을 오가며 대형 사이트의 운영과 구축을 맡았고, 파트장·팀장으로 스케줄 관리와 후임 교육을 병행했습니다. 지금 서비스 품질 지표(접근성·SEO·렌더링 성능)를 직접 다루는 배경입니다.',
  certifications: [
    { name: '민간개발자 웹 접근성 전문교육 수료', issuer: '한국생산성본부', date: '2010.07' },
    { name: 'GTQ 1급', issuer: '한국생산성본부', date: '2009.07' },
  ],
};
