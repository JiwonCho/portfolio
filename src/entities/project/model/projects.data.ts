import type { Project } from './types';

/**
 * 경력서 05 / Deep Dive 16건을 그대로 옮긴 데이터.
 * 수치는 레포 집계값이며, 사내 티켓 키(DT-, TPT-, RVYN-)는 외부 공개용에서 제외했다.
 */
export const projects: Project[] = [
  {
    slug: 'package-three-layer-architecture',
    no: '16',
    title: 'SC / BLC / UI 3계층 컴포넌트 아키텍처',
    tagline: "'use client' 가 위로 번지지 않도록, 컴포넌트의 역할을 이름으로 강제한 규칙",
    brand: 'privia-package',
    repo: 'privia-front-package',
    tags: ['architecture', 'platform'],
    stack: ['Next.js App Router', 'React', 'TypeScript', 'Storybook', 'Lit', 'Rollup'],
    featured: true,
    background:
      "프리비아 해외패키지를 Next.js App Router로 신규 구축하는 프로젝트에 초기 구조 설계 단계부터 참여했습니다. App Router에서는 서버 컴포넌트와 클라이언트 컴포넌트가 한 트리에 섞이는데, 규칙 없이 만들면 'use client' 가 위쪽으로 번져 서버 렌더링 이점이 사라지고 같은 UI가 서비스마다 중복 구현됩니다. 그래서 컴포넌트의 역할을 이름으로 강제하는 규칙을 먼저 세웠습니다.",
    implementation: [
      {
        title: 'SC — Server Component',
        body: 'async 서버 컴포넌트로 데이터 패치만 담당하고 재검증 주기를 선언합니다. 패치 함수는 *.fetch.ts 로 같은 폴더에 붙여 두어, 이 화면이 무슨 API를 쓰는지 파일만 봐도 드러나게 했습니다.',
      },
      {
        title: 'BLC — Business Logic Component',
        body: "'use client' 경계. SC가 넘긴 초기 데이터를 상태로 받아 사용자 상호작용과 도메인 로직을 담당합니다. 추가 조회는 *.action.ts 서버 액션으로, 복잡한 로직은 use*BLC.ts 훅으로 다시 분리합니다.",
      },
      {
        title: 'UI — 순수 프레젠테이션',
        body: "상태도 패치도 없이 props 로만 제어되는 컴포넌트를 공용 디자인 시스템 패키지에 둡니다. 덕분에 'use client' 경계가 BLC 한 겹에서 멈추고, UI는 어느 서비스에서든 재사용되며, 서버 데이터 흐름이 SC에 모입니다. 파일명만 봐도 그 컴포넌트가 무엇을 해도 되고 무엇을 하면 안 되는지 알 수 있는 게 이 규칙의 목적이었습니다.",
      },
      {
        title: '공용 디자인 시스템으로 승격',
        body: '서비스마다 따로 만들던 메인 화면 컴포넌트(FAQ · 공지 · 상품 아이템/슬라이더/탭 · 프로모션 · 상단 슬라이더)를 공용 UI 패키지로 올리고 호텔 쪽 중복 구현을 걷어냈습니다. 현재 패키지·투티·호텔·항공·공통 5개 앱이 함께 씁니다.',
      },
      {
        title: 'Lit 기반 웹 컴포넌트 퀵서치',
        body: '패키지 검색창을 다른 서비스에서도 써야 해서 React 트리 밖에서 동작하는 웹 컴포넌트로 따로 빌드했습니다. Rollup으로 단일 번들을 만들어 정적 스크립트로 복사하는 빌드 단계를 두어, React를 쓰지 않는 페이지에도 스크립트 태그 하나로 삽입됩니다.',
      },
      {
        title: '헤더 · 검색 UX',
        body: '전역 헤더/서브 헤더 sticky 처리와 스크롤 시 화면이 흔들리던 문제를 잡고, sticky 상태에서 스크롤이 발생하면 퀵서치가 축소형으로 접히며 열려 있던 패널도 함께 닫히도록 했습니다. 스크롤 핸들러는 throttle, 헤더 노출 판정은 IntersectionObserver 로 처리했습니다.',
      },
      {
        title: '모바일 · 접근성 디테일',
        body: '다이얼로그·액션시트 높이 단위를 vh 에서 dvh 로 옮기고 주소창 변화를 반영하는 커스텀 프로퍼티를 훅으로 주입했습니다. 홈쇼핑사 로고는 API에 대체 텍스트가 없어 파일명으로 판별해 alt 를 채웠습니다.',
      },
    ],
    metrics: [
      { value: '111종', label: '공용 UI 패키지 컴포넌트 (PC 55 · MO 56)' },
      { value: '109개', label: 'Storybook 스토리' },
      { value: '5개 앱', label: '패키지 · 투티 · 호텔 · 항공 · 공통' },
      { value: '151건', label: '본인 커밋 (2024-07 ~ 2026-08)' },
    ],
    paths: [
      'src/app/pc/_components/PackagePcMainFaqSC/ (SC + *.fetch.ts + BLC/*.action.ts)',
      'src/app/pc/detail/[representProductCode]/[productCode]/_components/PackagePcProductDetailBLC/',
      'src/lit-component/ (package-pc-quick-search · keyword-suggest-list · departure-date-calendar-filter)',
      'rollup.config.mjs · prepare_wc.sh · src/stories/',
      'packages/@privia/ui/components/{pc,mo}/',
    ],
  },
  {
    slug: 'usj-pass-domain',
    no: '01',
    title: 'USJ 전용 상품 페이지 · 맞춤 패스 필터',
    tagline: '권종 × 어트랙션 × 입장시간 × 확약권이 얽힌 상품군을 전용 상태 트리로 분리',
    brand: 'tourvis',
    repo: 'tourvis-front-activity',
    tags: ['domain', 'architecture'],
    stack: ['Next.js', 'React', 'TypeScript', 'Redux Toolkit', 'Jest'],
    featured: true,
    background:
      '유니버설 스튜디오 재팬 패스는 권종(익스프레스 4/5/7/8) × 어트랙션 조합 × 입장시간 × 에어리어 확약권이 얽혀 일반 상품상세 UI로는 선택 자체가 불가능한 상품군입니다. 일반 옵션 플로우와 분리된 전용 페이지·전용 상태 트리를 세웠습니다.',
    implementation: [
      {
        title: '전용 옵션 선택 페이지',
        body: '데이터 로딩·초기화·이벤트·모달·상태·스크롤락을 훅 6개로 분리해 단일 컴포넌트가 비대해지지 않게 했습니다. 모달만 캘린더·입장시간·패스 상세·비교하기·확인·추가옵션·재고알림·스와이프 가이드 8종입니다.',
      },
      {
        title: '「내게 맞는 패스 찾기」 필터',
        body: '① 동반 아동 키 3구간(102–121 / 122–131 / 132cm 이상) ② 슈퍼 닌텐도 월드 확약권 포함·미포함 ③ 인기 어트랙션 다중 선택 ④ 익스프레스 권종. 기본 접힘 배너로 두고 인라인 필터·풀 폼 두 진입점을 공유 컴포넌트 하나로 처리했습니다.',
      },
      {
        title: '필터 · 정렬 로직',
        body: 'filterAndSortPasses 가 인기 어트랙션 100% 일치 → 아이 키 조건을 만족하는 어트랙션 3개 이상 → 닌텐도 확약권 유무 → 권종 접두어 순으로 걸러낸 뒤, calculateFilterMatchScore 의 일치도 점수로 재정렬합니다.',
      },
      {
        title: '어트랙션 그룹핑 · 표기 정규화',
        body: '옵션 API와 상품상세 매핑의 표기가 달라(™ 유무, 띄어쓰기, 영문 병기, 「[접수시간]」 접두) 같은 어트랙션이 다른 것으로 잡히는 문제가 있었습니다. 어트랙션↔에어리어 매핑 테이블과 역매핑을 만들고 공백 제거 후 재매칭하는 폴백을 둬 표기 흔들림을 흡수했습니다. 에어리어 정렬은 compareUsjArea 로 슈퍼 닌텐도 월드 → 해리 포터 → 그 외 순서를 고정했습니다.',
      },
      {
        title: '예외 처리',
        body: '시작시간만 있는 타임슬롯(명탐정 코난), 어트랙션명이 비어 오는 EXP 옵션, MO /option 슬러그 URL 404, 비회원 /reserve 중간 페이지 404 를 각각 처리했습니다.',
      },
    ],
    metrics: [
      { value: '132개', label: '파일' },
      { value: '31,700줄', label: '코드 (약)' },
      { value: '500건+', label: '관련 커밋' },
      { value: '4종', label: 'Jest 테스트 (옵션 slice · 재고 알림 · 옵션 리셋)' },
    ],
    paths: [
      'app/(mo)/(new)/product/[productId]/_components/TntMoUsjOptionSelectPage/',
      '…/TntMoUsjProductDetailModal/ · …/TntMoUsjProductDetailPanel/',
      'app/lib/components/usj/TntUsjPassFilterForm.tsx',
      'app/lib/utils/usjFilterScoringUtils.ts · app/lib/constants/usjConstants.ts',
    ],
  },
  {
    slug: 'group-product-in-page-booking',
    no: '03',
    title: '그룹상품 페이지 — 페이지 이탈 없는 묶음상품 예약',
    tagline: '상품 ID별 Redux 브랜치로 전역 옵션 상태를 격리하면서 컴포넌트는 그대로 재사용',
    brand: 'tourvis',
    repo: 'tourvis-front-activity',
    tags: ['architecture', 'domain'],
    stack: ['Next.js', 'Redux Toolkit', 'React Context', 'Swiper', 'TypeScript'],
    featured: true,
    background:
      '여러 상품을 하나로 묶어 파는 그룹상품은 기존에 새 탭 링크·전면 전환으로만 개별 상품에 접근했습니다. 묶음 안에서 비교하다 매번 페이지를 떠나야 하니 전환이 끊겼습니다. 상세 안에서 안내 확인부터 예약까지 끝내도록 재설계했습니다.',
    implementation: [
      {
        title: '상태 오염 차단이 가장 어려운 부분이었습니다',
        body: 'MO는 단일 상품의 옵션 플로우 컴포넌트를 그대로 쓰되, 전역 옵션 slice 3종이 오염되지 않도록 groupProductOptionBooking 슬라이스를 만들어 매핑 상품 ID별 브랜치에 동일 reducer를 중첩하고, 액션은 전달 함수로만 해당 브랜치에 흘려보냈습니다. Context Provider로 컴포넌트가 "전역이냐 그룹 브랜치냐"를 구분하게 해 여러 매핑 상품을 반복 예약해도 상태가 섞이지 않습니다.',
      },
      {
        title: 'PC는 아예 접점을 없앴습니다',
        body: '한 화면 스크롤·아코디언 전용 레이아웃과 로컬 상태로 분리해, 단일 상품 Redux와 접점 자체를 제거했습니다.',
      },
      {
        title: '옵션 카드 레이어 4종의 중복 호출 제거',
        body: '코스소개 · 주요 이용안내 · 취소/환불 · 상품 상세정보가 모두 같은 상품 API 응답을 쓰기 때문에, product_id 당 1회만 패치하는 캐시를 두고 네 팝업이 동일 엔트리를 재사용합니다.',
      },
      {
        title: '이용안내 탭 — 가로 스와이프와 세로 스크롤 분리',
        body: '칩 탭(Swiper) + 본문 전용 scrollspy 구성. 탭 줄을 세로 스크롤 루트 밖 형제 노드로 빼 가로 스와이프와 본문 스크롤이 서로 먹지 않게 하고, 탭이 한 줄에 들어갈 때와 넘칠 때의 정렬 규칙을 분기했습니다.',
      },
      {
        title: '정책 처리와 부수 정합',
        body: '그룹 API에 환불 필드가 없어 대표 상품의 환불 규정을 임시 소스로 쓰고 "각 옵션 카드에서 취소/환불 규정을 꼭 확인해 주세요" 고지를 함께 노출, 백엔드 필드 도입 시 교체하도록 문서에 남겼습니다. 일부 회차만 매진인데 옵션 전체를 매진으로 보던 버그, 장바구니·최근 본 상품·공급사 채팅 그룹 ID 전달, 쿠폰 할인가 개별 상품 기준 적용도 함께 정리했습니다.',
      },
    ],
    metrics: [
      { value: '28개', label: '그룹 전용 파일' },
      { value: '5,472줄', label: '코드' },
      { value: '123건', label: '커밋' },
      { value: '528줄', label: '요구사항·API 레퍼런스 문서 (+ 19단계 구현 로그)' },
    ],
    paths: [
      'docs/tourvis-group-product-front.md · docs/tourvis-group-product-api-reference.md',
      'app/pc/(new)/product/[productId]/_components/GroupProduct/',
      'app/(mo)/(new)/product/[productId]/_components/GroupProduct/GroupMoProductOptionFlowLayer.tsx',
      'app/lib/redux/slices/groupProductOptionBookingSlice/ · app/lib/redux/optionFlow/',
    ],
  },
  {
    slug: 'japan-bus-tour-soldout-alternative',
    no: '02',
    title: '일본 버스투어 매진일 대체상품 추천',
    tagline: '매진일도 선택 가능한 캘린더 + 실재고 기반 대체 상품 제안으로 이탈 구간을 되살림',
    brand: 'tourvis',
    repo: 'tourvis-front-activity',
    tags: ['domain', 'quality'],
    stack: ['Next.js', 'React', 'TypeScript'],
    featured: true,
    background:
      '일본 근교 버스투어는 성수기 매진이 잦은데, 기존 DATE 상품 캘린더는 가용일 응답에 없는 날짜를 아예 비활성으로 막았습니다. 사용자는 매진 여부를 확인할 수도, 대안을 볼 수도 없이 이탈했습니다.',
    implementation: [
      {
        title: '계획서를 직접 작성했습니다 (307줄)',
        body: '캘린더 정책, Case 분기, 데이터 소스, 리스크·오픈 이슈, 지역별 대상 상품 ID 부록까지 정리했습니다. 기획 원문을 프런트 관점 요구사항으로 번역하는 작업이 절반이었습니다.',
      },
      {
        title: '캘린더 — 회귀 없이 정책만 교체',
        body: '운영 시트에 등록된 상품에 한해 예약 가능 기간 전체를 렌더하고 매진일도 선택 가능하게 열었습니다. 시트 미등록 상품은 기존 동작을 그대로 유지해 회귀를 차단했습니다.',
      },
      {
        title: 'Case 분기 — 가용일이 아니라 옵션으로 판별',
        body: '날짜 선택 시 원 상품의 옵션 API를 호출해 판매 가능한 옵션 유무로 나눕니다. 있으면 기존 옵션 리스트, 없으면 「선택한 날짜는 마감되었습니다」 + 「{M}월 {D}일 예약 가능한 인기 상품 모음」에 해당 날짜 실재고가 있는 후보만 시트 우선순위로 노출합니다. 가용일 API만으로는 "날짜는 열려 있는데 옵션은 전부 마감"을 잡지 못해 옵션 기반 판별로 설계했습니다.',
      },
      {
        title: '다건 조회 최적화 — 레이아웃 시프트 제거',
        body: '후보 상품마다 옵션 API를 호출해야 해서 (productId, date) 키 캐시를 두고, useLayoutEffect 로 paint 전에 캐시를 반영해 레이아웃 시프트를 막았습니다. 결과 확정 플래그를 따로 둬 빈 목록이 한 프레임 스치는 현상도 제거했습니다.',
      },
    ],
    metrics: [
      { value: '5개 지역', label: '후쿠오카 · 오사카 · 삿포로 · 오키나와 · 나고야' },
      { value: '14개', label: 'PC/MO 캘린더·옵션 모달·추천 카드·캐시 파일' },
      { value: '307줄', label: '직접 작성한 계획서' },
    ],
    paths: [
      'docs/japan-bus-tour-soldout-alternative-calendar-prd.md',
      'app/pc/(new)/product/[productId]/_lib/japanBusTourSoldoutAlternativeSheet.ts',
      '…/_lib/japanBusTourAlternativeRecommendationsCache.ts',
      '…/hooks/useJapanBusTourAlternativeRecommendations.ts',
    ],
  },
  {
    slug: 'refund-policy-v2',
    no: '04',
    title: '취소·환불 규정 V2 · 옵션별 취소정책',
    tagline: 'API 응답과 화면 사이에 표시용 변환 계층을 세워 5개 화면이 같은 규칙으로 동작',
    brand: 'tourvis',
    repo: 'tourvis-front-activity',
    tags: ['payment', 'architecture'],
    stack: ['Next.js', 'TypeScript'],
    featured: true,
    background:
      'V1 환불 규정은 상품 단위 고정 문구였습니다. V2는 옵션마다 정책이 갈리고 기준시점·수수료 유형·과금 단위·통화가 제각기 내려옵니다. 상품상세뿐 아니라 예약·결제·주문상세·취소 화면까지 같은 규칙으로 보여야 했습니다.',
    implementation: [
      {
        title: '표시용 변환 계층을 따로 만들었습니다',
        body: 'API 응답을 화면이 그대로 쓸 수 있는 행·옵션·조건그룹 타입으로 변환하고, 정책을 환불불가 / 환불가능 / 조건부로 분류한 뒤 상품 기본 정책과 같은 옵션끼리 묶습니다.',
      },
      {
        title: '문구 생성 — 백엔드 문안 우선',
        body: '수수료 유형(정률·정액), 과금 단위(건당·인당), 통화 심볼 5종을 조합해 표기를 만들되, API가 조건·수수료 문구를 내려주면 그것을 우선합니다. 백엔드 문안이 바뀌어도 프런트 배포 없이 반영됩니다.',
      },
      {
        title: '정렬 규칙',
        body: '「취소 수수료 없음 → 수수료 오름차순 → 환불불가」가 되도록 정렬키에 ±Infinity를 배치했습니다. 수수료 테이블을 눈으로 훑을 때 손해 순서가 자연스럽게 읽힙니다.',
      },
      {
        title: '기준시점 정합과 V1 폴백',
        body: '예약일 기준/이용일 기준 표기를 구분하고, 시간 단위 정책에서 "이후 1일"로 잘못 나가던 표기를 "24시간 이후"로 교정했습니다. 주문 API에 V2 상세가 있으면 V2, 없으면 V1을 유지하도록 판별을 한 곳에 모아 예약·결제·주문/취소 화면 전체가 같은 기준으로 동작하게 했습니다.',
      },
    ],
    metrics: [
      { value: '2종', label: '변환 유틸' },
      { value: '13개', label: '동시 수정한 화면 파일' },
      { value: '5개 화면', label: '상품상세 · 예약 · 결제 · 주문 · 취소' },
    ],
    paths: [
      'app/lib/utils/refund-v2-utils.ts · app/lib/utils/refund-utils.ts',
      'app/_components/refund/RefundV2RulesBody.tsx',
      'app/(mo)/(new)/…/ContentsComponents/RefundTypeGroup.tsx',
      'app/(mo)/(legacy)/components/BookingCancelRefundTable.tsx',
    ],
  },
  {
    slug: 'naver-travel-guest-booking',
    no: '05',
    title: '네이버여행 비회원 예약 동선 신규 구축',
    tagline: '회원 전제로 짜인 주문 화면을 걷어내고 알림톡 링크 하나로 완결되는 경로를 새로 세움',
    brand: 'tourvis',
    repo: 'tourvis-front-activity',
    tags: ['global', 'payment'],
    stack: ['Next.js', 'Server Actions', 'Redux Toolkit', 'Jest'],
    featured: true,
    background:
      '네이버여행에서 들어온 예약자는 투어비스 회원이 아닙니다. 로그인도 마이페이지도 없이 알림톡 링크 하나로 들어와 예약 정보를 채우고 예약 내역을 확인해야 합니다. 회원 전제로 짜인 기존 주문 화면을 그대로 쓸 수 없어 전용 동선을 새로 구축했습니다.',
    implementation: [
      {
        title: '예약정보 입력 페이지',
        body: '서버 컴포넌트에서 주문 템플릿을 먼저 조회해 폼을 구성하고, 유효하지 않은 링크는 「알림톡 주소를 확인해 주세요」 화면으로 분기합니다. 폼 상태·동의 처리·저장·제출 상태를 훅 4개로 나누고, 저장은 Server Action으로 처리했습니다.',
      },
      {
        title: '어댑터 계층을 단위 테스트로 고정',
        body: '네이버 응답 스키마와 폼 스키마가 달라 변환 어댑터를 두고 Jest 테스트로 고정했습니다. 동의 체크박스·저장 버튼·어댑터 3종에 테스트를 붙였습니다.',
      },
      {
        title: '개인정보 처리 · N개 옵션 대응',
        body: '네이버에서 이미 받은 동의에 근거한 절차임을 명시하고, 개인정보·민감정보 동의 모달을 분리해 별도 고지했습니다. 한 주문에 옵션이 여러 개일 때 payload가 깨지던 문제를 옵션 배열 기준으로 재구성했습니다.',
      },
      {
        title: '예약상세 — 컴포넌트는 재사용, 정책은 제거',
        body: '비회원 토큰 기반으로 네이버 응답을 기존 주문상세 컴포넌트가 쓰는 형태로 변환해 재사용하되, 채널 특성상 맞지 않는 취소·환불 정보와 「같은 상품 예약하기」는 제거했습니다. 상품상세 링크는 이용후기 등록 고객에게만 열고, 링크가 없는 증정 상품은 엉뚱한 페이지로 보내지 않도록 처리했습니다.',
      },
    ],
    metrics: [
      { value: '32개', label: '파일' },
      { value: '4,533줄', label: '코드' },
      { value: '80건', label: '커밋' },
      { value: '3종', label: 'Jest 테스트' },
    ],
    paths: [
      'app/(mo)/(legacy)/cas/order-memo/[orderId]/ (page · hooks 4 · components 8 · actions · __tests__ 3)',
      'app/(mo)/(legacy)/cas/order/[token]/',
      'app/lib/fetch/server/fetch-naver-travel-order-memo.ts · …/fetch-server-naver-order.ts',
      'app/lib/redux/slices/bookingMemoFormV2NaverSlice/',
    ],
  },
  {
    slug: 'usj-dynamic-pricing',
    no: '06',
    title: 'USJ 다이나믹 프라이싱 · 유동 추가옵션 정책',
    tagline: '실시간 가격과 판매 불가 구간을 하나의 훅에서 PC·MO 두 상태 트리로 갈라 보냄',
    brand: 'tourvis',
    repo: 'tourvis-front-activity',
    tags: ['payment', 'domain'],
    stack: ['Next.js', 'Server Actions', 'Redux Toolkit', 'Jest'],
    featured: false,
    background:
      'USJ 패스는 정찰가가 아니라 이용일·회차·수량에 따라 가격이 실시간으로 바뀝니다. 게다가 조합에 따라 아예 판매 불가인 구간이 있어, "가격을 다시 물어보고 · 못 파는 경우를 구분"하는 경로가 필요했습니다.',
    implementation: [
      {
        title: '조회 훅 — 불필요한 호출 차단',
        body: '옵션에 다이나믹 프라이싱 플래그가 켜진 경우에만 (이용일 · 라벨 · 회차 · 수량)으로 서버 액션을 호출합니다. 응답이 판매 불가면 「이용 조건 미충족」 상태로 전환해 금액 대신 사유를 보여 줍니다. 수량 0, 상품 ID 없음, 정적가 상품은 조기 반환합니다.',
      },
      {
        title: 'PC · MO 상태 동기화',
        body: '같은 훅이 MO 옵션 상세 슬라이스와 PC 상품 상태 슬라이스에 동일 payload를 동시에 디스패치합니다. 채널마다 다른 상태 트리를 쓰면서도 로딩·가격·판매불가 표시가 한 소스에서 갈라져 나갑니다.',
      },
      {
        title: '유동 추가옵션 정책',
        body: '수량형 추가옵션의 적용 횟수를 N = ⌈Q ÷ V⌉ (Q: 대상 라벨 수량 합, V: 과금 스텝)로 계산해 라벨 수량이 바뀌면 추가옵션 수량·금액이 함께 따라오게 했습니다. 단가는 정책으로 건드리지 않습니다.',
      },
      {
        title: 'UX 판단 — 회색이 뜻하는 것을 나눔',
        body: '정책이 켜지면 스테퍼로 수량을 못 바꾸는데, 이를 "비활성"으로 회색 처리하니 고를 수 없는 옵션처럼 보였습니다. 라벨 재고로 막힌 경우만 회색을 쓰고 정책으로 고정된 카드는 흰 배경을 유지하도록 스타일 규칙을 나눴습니다.',
      },
    ],
    metrics: [
      { value: '4종', label: 'Redux 슬라이스' },
      { value: '6종', label: 'PC/MO 수량 UI' },
      { value: '933줄', label: '이용일 변경 재계산 시나리오 계획서' },
    ],
    paths: [
      'app/api/v2/product/[productId]/options/[optionId]/dynamic-price/route.ts',
      'app/lib/fetch/server/fetch-server-tnt-dynamic-price.ts',
      'app/lib/utils/attrPolicy.ts (+ __tests__)',
      'docs/dynamic-attr-policy-implementation-summary.md',
    ],
  },
  {
    slug: 'global-en-paypal',
    no: '07',
    title: 'EN 글로벌 페이지 구축 및 PayPal 결제 연동',
    tagline: '로그인·쿠폰·포인트 전제를 걷어낸 영어 전용 비회원 예약·결제 경로 16개 라우트',
    brand: 'tourvis',
    repo: 'tourvis-front-all',
    tags: ['global', 'payment', 'architecture'],
    stack: ['Next.js 16', 'React 19', 'FSD', 'PayPal', 'Playwright', 'eslint-plugin-boundaries'],
    featured: true,
    background:
      '구글 맵 TTD로 유입되는 해외 고객을 받기 위한 영어 전용 · 비회원 예약 · PayPal(USD) 결제 서비스입니다. 국내 서비스는 로그인·쿠폰·포인트·회원등급이 전제라, 그 전제를 걷어낸 별도 경로가 필요했습니다.',
    implementation: [
      {
        title: 'PRD · 설계 가이드 · 구현 계획서를 먼저 썼습니다',
        body: '타깃·언어 정책·제외 기능·라우팅 전략·결제 통화까지 문서에서 결론을 내고 코드로 옮겼습니다.',
      },
      {
        title: '라우트 16개',
        body: '상품상세 · 검색 · 예약 · 예약메모 · 예약완료 · 주문상세 · 주문취소 · 취소정보 · 문의 · 비회원 로그인 · 토큰 설정 route handler. 회원 전용 진입 체크를 걷어내고 게스트 정보(이름·이메일·전화)를 직접 수집, 주문번호+이메일로 조회하는 게스트 주문 조회를 뒀습니다.',
      },
      {
        title: 'PayPal 결제',
        body: '주문 생성 단계에서 USD 금액을 소수 2자리로 고정해 purchase unit을 만들고, 승인 후 Server Action이 결제사 캡처 API를 호출합니다. 결제 UI는 시트·브랜디드 체크아웃·CTA·로고로 쪼개 모바일/데스크톱 배치를 따로 조립할 수 있게 했습니다.',
      },
      {
        title: '에러 분기',
        body: '가예약 실패까지 PayPal 제네릭 알럿으로 덮여 원인을 알 수 없던 문제를 분리하고, 사전 인증 실패 시 결제가 진행되지 않도록 차단했습니다. 결제 E2E 테스트를 붙였습니다.',
      },
      {
        title: 'FSD 위에서 작업',
        body: 'Next.js 16 · React 19 · FSD 레이어(app / entities / features / widgets / shared)에 eslint-plugin-boundaries 로 의존 방향을 강제한 구조 위에서 진행했습니다.',
      },
    ],
    metrics: [
      { value: '16개', label: 'EN 라우트' },
      { value: '9개', label: 'PayPal 전용 파일' },
      { value: '42건', label: '결제 관련 커밋' },
      { value: '3종', label: '직접 작성한 설계 문서' },
    ],
    paths: [
      'app/en/ (activity/product · search · booking/new · booking/memo · booking/success · order · inquiry)',
      'features/payment/hooks/usePayPal.ts · features/payment/actions/captureTnaPayPalOrder.ts',
      'docs/global-service-prd.md · docs/global-service-design-guide.md',
    ],
  },
  {
    slug: 'static-promo-bundle-loader',
    no: '08',
    title: '정적 프로모션 번들 뷰 페이지 구축',
    tagline: '생성기가 뽑은 HTML/CSS/JS 번들을 React 변환 없이 GNB·SEO 위에 얹는 로더',
    brand: 'tourvis',
    repo: 'tourvis-front-all',
    tags: ['platform', 'quality'],
    stack: ['Next.js', 'generateMetadata', 'next/script', 'JSON-LD'],
    featured: false,
    background:
      '마케팅 프로모션 페이지는 생성기가 HTML·CSS·JS 번들로 뽑아냅니다. 이걸 매번 React 컴포넌트로 옮기면 배포가 느리고, 그냥 정적 파일로 띄우면 GNB·푸터·SEO가 빠집니다. 둘 다 만족하는 로더를 만들었습니다.',
    implementation: [
      {
        title: '번들 규격을 문서로 먼저 고정했습니다 (475줄)',
        body: '폴더 구조(메타 · 본문 · 스타일 · 스크립트 · 이미지), 템플릿별 루트 클래스 스코프 규칙, 금지 항목(문서 태그·인라인 스타일·Tailwind CDN·루트 절대경로), 메타 스키마(제목 30자 이상, 설명 120~150자, OG 이미지 상대경로, 구조화 데이터 배열). 생성기 쪽이 이 규격만 지키면 복사만으로 배포됩니다.',
      },
      {
        title: '서버 로더와 경로 재작성',
        body: '번들 파일 4개를 병렬로 읽고, 스크립트는 없으면 null 로 폴백합니다. 번들 안의 images/… 상대경로를 CSS url() 과 HTML src 양쪽에서 public 절대경로로 치환해, 배포 물리 경로가 바뀌어도 번들을 손대지 않아도 됩니다.',
      },
      {
        title: '렌더 — 하이드레이션 충돌 회피',
        body: '스타일·본문을 주입하고 스크립트는 next/script 의 afterInteractive 로 실행합니다. 메타는 generateMetadata 가 번들 메타를 읽어 구성하므로 프로모션마다 SEO·OG·JSON-LD가 자동으로 붙습니다.',
      },
      {
        title: '두 계열 지원',
        body: '마케팅 캠페인 경로와 여행 가이드 경로를 지원하고, 신규 건은 여행 가이드로 유도했습니다. 여행 가이드 쪽은 슬러그 SEO 레지스트리와 sitemap.ts 를 붙여 프로모션이 늘어도 색인이 따라오게 했습니다.',
      },
    ],
    metrics: [
      { value: '9개', label: '운영 중인 번들' },
      { value: '475줄', label: '번들 규격 문서' },
    ],
    paths: [
      'app/marketing/STATIC_PROMO_BUNDLE_GUIDE.md',
      'app/marketing/[slug]/_static-promo/lib/load-static-promo-bundle.ts',
      'app/travel-guide/[slug]/_static-promo/ · public/travel-guide/promotions/{slug}/',
    ],
  },
  {
    slug: 'privia-tnt-main-refactoring',
    no: '09',
    title: '프리비아 투어&티켓 메인 전면 리팩토링',
    tagline: '레거시 스택 메인을 Next.js App Router · Tailwind · Radix 기반으로 PC/MO 동시 재구축',
    brand: 'privia-tnt',
    repo: 'privia-front-tnt',
    tags: ['architecture', 'quality'],
    stack: ['Next.js App Router', 'Tailwind CSS', 'Radix UI', 'Server Actions', 'GA4'],
    featured: true,
    background:
      '프리비아 투티 메인은 레거시 스택으로 남아 있어 인벤토리 하나 바꾸는 데도 손이 많이 갔습니다. 2025년 3~4월에 걸쳐 PC·MO 메인을 다시 세웠습니다. 프리비아 패키지·투어비스와 한 모노레포를 쓰는 구조라, 공용 패키지를 건드리지 않고 갈아끼우는 게 조건이었습니다.',
    implementation: [
      {
        title: '퀵서치 재구축',
        body: 'PC·MO 각각 재구축했습니다. 최근 검색어 저장을 Server Action으로 옮기고, 검색어 없이 엔터·검색 버튼을 눌렀을 때 안내 다이얼로그를 띄우도록 했습니다. 입력 전 init 상태를 따로 둬 진입 시 불필요한 포커스가 가지 않게 했습니다.',
      },
      {
        title: '다이얼로그 체계',
        body: '여행지 전체보기·픽토그램 전체 카테고리를 독립형 Dialog / MO FullDialog로 분리했습니다. 서버·클라이언트 속성 불일치로 뜨던 하이드레이션 경고도 이 과정에서 정리했습니다.',
      },
      {
        title: '오마카세 개인화 CLS 개선',
        body: '개인화 응답이 늦게 오면서 레이아웃이 밀리는 문제를 스켈레톤으로 잡았습니다.',
      },
      {
        title: '인벤토리 · 전시 폴백',
        body: '상품 전시 순서를 인벤토리 구분자 기준으로 재정렬하고, 운영에서 특정 인벤토리가 비어 내려올 때 화면이 깨지지 않도록 빈 인벤토리를 생성해 채우는 폴백을 넣었습니다. 전시 상품이 0개인 스와이퍼 영역은 아예 렌더하지 않습니다.',
      },
      {
        title: '모노레포 제약 대응과 GA 정합',
        body: '패키지 빌드 시 경로가 깨지는 컴포넌트는 투티 전용으로 분리하고 공용 패키지 쪽에서는 GA 코드를 제거해 중복 수집을 막았습니다. 이관 과정에서 누락·상이했던 GA 이벤트를 전수 대조해 맞췄습니다.',
      },
    ],
    metrics: [
      { value: '24개', label: 'PC·MO 메인 컴포넌트 신규 작성' },
      { value: '70건+', label: '집중 커밋 (2025-03~04)' },
    ],
    paths: [
      'apps/privia-front-tnt/src/app/pc/(new)/main/ (TntPcMainPageContent · TntPcProductSlider · TntPcMainFaqSC)',
      'apps/privia-front-tnt/src/app/(mo)/(new)/main/',
      'docs/TNT_구축환경_정리.md · GA_GTM_개선_작업계획서.md',
    ],
  },
  {
    slug: 'privia-review-section',
    no: '10',
    title: '이용후기 · 포토이용후기 섹션 신규 구축',
    tagline: '투어비스 후기 시스템을 프리비아로 이식 — 비회원 선노출 설계와 선택적 인증',
    brand: 'privia-tnt',
    repo: 'privia-front-tnt',
    tags: ['domain', 'quality'],
    stack: ['Next.js', 'Server Actions', 'Sentry', 'JSON-LD', 'SCSS Modules'],
    featured: true,
    background:
      '프리비아 투티 상품상세에는 후기가 없었습니다. 투어비스 쪽 후기 시스템을 프리비아 브랜드로 가져오되, 상세가 레거시 라우트라 Tailwind를 못 쓰고 모듈 SCSS만 가능한 제약 아래 붙여야 했습니다.',
    implementation: [
      {
        title: '분석 · 계획 문서를 먼저 썼습니다',
        body: 'API·로직 분석 622줄, 단계별 구축 계획 341줄, 포토후기 팝업 분석 178줄. Phase 1(비회원 조회·표시)과 Phase 2(회원 연동·도움됨)를 나눠 회원 의존 없이 먼저 띄울 수 있게 설계했습니다.',
      },
      {
        title: '구조 원칙 — 삼분',
        body: '서버 컴포넌트는 패치, 클라이언트 컴포넌트는 인터랙션, 로직은 커스텀 훅으로 나눴습니다. 후기 Server Action 8종(목록·집계·개수·포토, 각각 태그 분기 버전)을 만들고 실패 시 빈 배열·null을 반환하며 Sentry로 남기게 했습니다.',
      },
      {
        title: '선택적 인증',
        body: '브랜드는 PRIVIA로 고정하고, 로그인 쿠키가 있으면 Bearer로 붙이되 없어도 조회는 되도록 두었습니다. 비로그인 사용자도 후기를 볼 수 있어야 하기 때문입니다.',
      },
      {
        title: '화면과 정합',
        body: '상단 평점·키워드 요약, 후기 리스트 무한스크롤, 포토후기 그리드와 스와이퍼 모달(PC/MO 별도), 번역하기, 「도움이 되었어요」 토글. PC 포토 팝업과 섹션의 도움됨 카운트를 동기화하고, 이미지를 용도별 타입(썸네일·정사각·와이드)으로 나눠 최적화했습니다. 모바일에서 모달을 닫으면 이전 스크롤 위치로 복귀합니다.',
      },
      {
        title: 'SEO',
        body: '후기 평점을 포함한 JSON-LD를 붙이고 헤딩 트리 구조를 정리했습니다. 최근에는 외부 채널 후기를 분리 노출하고, 채널 정렬을 프런트에서 백엔드로 이관했습니다.',
      },
    ],
    metrics: [
      { value: '40개+', label: '컴포넌트 · 훅 · 유틸 · 타입 파일' },
      { value: '5종', label: '자체 작성 설계·분석 문서' },
      { value: '1,300줄+', label: '문서 분량' },
      { value: '8종', label: '후기 Server Action' },
    ],
    paths: [
      'src/_lib/serverActions/server-action-review.ts · src/_lib/types/review.ts',
      'src/_lib/hooks/useReviewHelpfulToggle.ts · useReviewTranslator.ts',
      '…/product/detail/[productId]/_components/TntMoReviewSection · TntMoPhotoReview',
      'docs/REVIEW_AND_PHOTOREVIEW_ANALYSIS.md · docs/이용후기_포토이용후기_단계별_구축_계획서.md',
    ],
  },
  {
    slug: 'reservation-date-change',
    no: '11',
    title: '예약상세 이용일 변경 — 공급사 연동 + 차액 정산',
    tagline: '비동기 웹훅으로 나중에 확정되는 8단계 플로우의 모든 중간 상태를 프런트가 표현',
    brand: 'privia-tnt',
    repo: 'tna-privia-front (Nuxt 2 / Vue 2)',
    tags: ['payment', 'domain'],
    stack: ['Nuxt 2', 'Vue 2', 'JavaScript'],
    featured: true,
    background:
      'USJ 입장권·닌텐도 세트처럼 날짜마다 가격이 다른 상품은 이용일을 바꾸면 차액이 생깁니다. 공급사 API를 거쳐 변경을 신청하고, 차액이 양수면 결제를 먼저 받고, 음수면 운영이 환불하며, 결과는 비동기 웹훅으로 나중에 확정됩니다. 프런트가 그 사이의 모든 상태를 표현해야 했습니다.',
    implementation: [
      {
        title: '작업 계획서 964줄을 직접 작성했습니다',
        body: '8단계 플로우, 차액 부호별 분기표, 재진입 상태표, 백엔드 시퀀스 다이어그램, 기존 코드베이스 매핑, 재사용 가능한 패턴 정리까지. FE 스펙 문서와 충돌하면 스펙을 따른다는 우선순위도 문서에 못박았습니다.',
      },
      {
        title: '플로우',
        body: '변경 가능일 조회 → 차액 미리보기 → 변경 신청(응답은 항상 대기 상태) → 차액이 양수면 결제 화면으로 즉시 이동, 아니면 「변경 처리 중」 → 상태 폴링(3~5초, 최대 60초) → 확정/실패.',
      },
      {
        title: '상품 하드코딩을 피했습니다',
        body: '대상 판별을 주문의 reschedule_enabled 플래그 하나로 일반화해, 공급사가 늘거나 자체 처리로 바뀌어도 프런트를 고치지 않아도 되게 했습니다.',
      },
      {
        title: '재진입 처리가 까다로웠습니다',
        body: '대기 상태에서 페이지를 다시 열면 결제가 필요한 건지 그냥 기다리면 되는 건지 구분이 안 됐습니다. 재진입 시 상태 API를 1회 조회하고 결제 필요 여부는 서버 값을 우선해 로컬 상태와 병합하도록 정리했습니다.',
      },
      {
        title: '타임아웃 · late response 가드',
        body: '공급사 응답이 늦어 BFF가 먼저 끊기는 케이스에 가드를 넣고, 폴링 타임아웃 이후 늦게 도착한 응답이 화면을 되돌리지 않게 했습니다.',
      },
      {
        title: '금액 산식 보정',
        body: '추가결제·전체취소가 섞이면 예약상세의 결제·환불·최종결제 금액이 어긋났습니다. 산식을 실결제 기준으로 다시 잡고, 과입금 취소수수료 면제와 전표 출력 시 환불 제외를 반영했습니다.',
      },
    ],
    metrics: [
      { value: '964줄', label: '작업 계획서' },
      { value: '449줄', label: 'FE 스펙' },
      { value: '4종 + 8종', label: '전용 컴포넌트 · 유틸' },
    ],
    paths: [
      'components/MVP/Reschedule/RescheduleDynamicCalendar.vue · RescheduleQuotePreview.vue',
      'components/MVP/Mypage/Popup/RescheduleDatePopup.vue · ReschedulePopupInner.vue',
      'mixins/rescheduleDetailMixin.js · utils/rescheduleApi.js · reschedulePolicy.js',
      'docs/예약상세-이용일변경-다이나믹프라이싱-작업계획서.md · docs/fe-spec.md',
    ],
  },
  {
    slug: 'hyundai-card-payment',
    no: '12',
    title: '현대카드 결제 수단 · 선할인 정책 구현',
    tagline: '카드 상품이 늘 때마다 갈라지던 바우처 표기를 한 곳에서 통일',
    brand: 'privia-tnt',
    repo: 'tna-privia-front (Nuxt 2 / Vue 2)',
    tags: ['payment'],
    stack: ['Nuxt 2', 'Vue 2'],
    featured: false,
    background:
      '프리비아는 현대카드 계열 서비스라 카드 상품별 바우처 결제와 카드 조건부 선할인이 결제 로직의 큰 축입니다. 카드 상품이 새로 나올 때마다 결제 수단이 늘고, 할인 노출 조건은 마케팅 정책에 따라 계속 바뀝니다.',
    implementation: [
      {
        title: '바우처 결제 수단 추가',
        body: 'the Orange, the Green Edition4, Pink Edition3를 순차 반영했습니다. PC/MO 팝업, 결제 코드, 유의사항 문구, 조회 중 로딩 상태를 각각 붙이고, 바우처 조회에서 나던 CORS는 동일 오리진 요청으로 우회했습니다. 카드 상품이 늘면서 바우처명 표기가 화면마다 달라져, 카드 종류·카드 상품 코드 기준으로 표기를 한 곳에서 통일했습니다.',
      },
      {
        title: '선할인 노출 조건 정비',
        body: '종료된 선할인을 제거하고 현대카드 5% 선할인만 남기되, 할인율과 무관하게 라벨은 항상 보이도록 PC·MO 동작을 맞췄습니다. 고객 식별자가 없을 때 선할인 항목을 강제로 만들어 내던 로직을 제거해 실제로는 못 받는 할인이 표시되던 문제를 잡았습니다.',
      },
      {
        title: 'M포인트 청구할인 분리',
        body: '혜택카드 조건에 묶여 있던 M포인트 청구할인 노출을 떼어내 혜택카드가 아니어도 조건에 맞으면 보이도록 했습니다.',
      },
      {
        title: '렌더 가드',
        body: '비로그인 상태에서 상품·장바구니가 없는데 결제 컴포넌트가 먼저 렌더되며 터지던 문제에 가드를 넣어 둘 다 준비됐을 때만 렌더하도록 했습니다.',
      },
    ],
    metrics: [
      { value: '10종+', label: 'PC/MO 바우처 결제 팝업' },
      { value: '3종', label: '지속 수정한 결제 모델·화면' },
    ],
    paths: [
      'components/MVP/Reserve/Payment.vue · Mobile/MobilePayment.vue · Mobile/PaymentModel.js',
      'components/MVP/Reserve/Popup/{Orange,Green3,Red4,RedStripe,Summit}VoucherPayPopup.vue',
      'components/MVP/Reserve/Popup/ConfirmHccCardPopup.vue · api/common.js',
    ],
  },
  {
    slug: 'search-extended-api-migration',
    no: '13',
    title: '상품 검색 Extended API 마이그레이션',
    tagline: '호출처 10곳을 전수 조사한 뒤 평면 파라미터를 쿼리 배열 구조로 전환',
    brand: 'privia-tnt',
    repo: 'tna-privia-front · privia-front-tnt',
    tags: ['platform', 'quality'],
    stack: ['Nuxt 2', 'Next.js', 'JavaScript', 'TypeScript'],
    featured: false,
    background:
      '결과 내 재검색을 지원하려면 검색 조건을 평면 파라미터가 아니라 쿼리 배열로 보내야 했습니다. 검색 API를 신규 Extended 버전으로 갈아타는 작업인데, 호출처가 화면 곳곳에 흩어져 있어 먼저 전수 조사부터 했습니다.',
    implementation: [
      {
        title: '마이그레이션 계획서 764줄',
        body: '프록시 구조, 호출처 10곳 전수 목록(용도·파라미터별), 기존 요청 바디 구조, 전환 매핑, 검증 항목을 정리한 뒤 착수했습니다.',
      },
      {
        title: '구조 전환',
        body: '평면 검색 조건을 쿼리 배열 구조로 재구성하고, 쿠폰·채널·커서 기반 페이징 파라미터를 반영했습니다. 검색결과·무한스크롤·필터·가격 UI를 운영 동등 수준으로 검증했습니다.',
      },
      {
        title: '레거시 제거',
        body: '이번 전환을 계기로 구예약자 화면 전체와 관련 라우트를 걷어냈습니다. 남겨야 할 비회원 예약 조회는 유지했습니다.',
      },
      {
        title: '퀵서치 자동완성',
        body: '외부 도메인 직접 호출로 CORS가 나던 구간을 동일 오리진 프록시 경로로 전환하고, 서버가 이미 정렬해 주는데 프런트에서 다시 걸던 퍼지 매칭 조건을 제거했습니다.',
      },
      {
        title: '검색 UX 결함 정리',
        body: '모바일에서 결과가 0건이면 기타 필터 체크 상태가 사라지던 문제, 이용일 캘린더가 열리지 않던 렌더 오류(날짜 범위 필드 null), 검색 API 오류 시 빈 화면 대신 대체 화면 노출, 이용일 선택 범위 1년 제한, 투어 출발시간 새벽 구간 추가. 응답 필드가 선택적으로 빠지는 케이스에 방어 로직을 넣었습니다.',
      },
    ],
    metrics: [
      { value: '10곳', label: '전환한 호출처' },
      { value: '764줄', label: '마이그레이션 계획서' },
    ],
    paths: [
      'docs/product-search-extended-api-migration-plan.md',
      'components/MVP/Product/SearchResult.vue · Mobile/MobileSearchResult.vue',
      'apps/privia-front-tnt/src/app/(mo)/(new)/main (퀵서치·최근검색)',
    ],
  },
  {
    slug: 'product-detail-improvements',
    no: '14',
    title: '상품상세 개선 묶음 — 쿠폰 · 옵션별 취소환불 · SEO/안정성',
    tagline: '전환에 직결되는 요소를 하나씩 올린 연속 작업',
    brand: 'privia-tnt',
    repo: 'privia-front-tnt · tna-privia-front',
    tags: ['quality', 'payment', 'domain'],
    stack: ['Next.js', 'Nuxt 2', 'Sentry', 'JSON-LD'],
    featured: false,
    background:
      '메인 리팩토링 이후 상품상세를 붙잡고 전환에 직결되는 요소를 하나씩 올렸습니다. 아래 넷은 티켓이 나뉘어 있지만 같은 화면을 계속 다듬은 연속 작업입니다.',
    implementation: [
      {
        title: '쿠폰 다운로드',
        body: '로그인·비로그인을 나눠, 비로그인은 회원번호 0으로 발급 가능 쿠폰을 조회해 쿠폰 영역 자체의 노출 여부를 결정합니다. 시스템 알럿이 모달과 충돌해 레이아웃 렌더와 모달 오픈이 아예 막히던 문제를 알럿 지연으로 풀고, 이중 모달 포커스 순서와 다이얼로그 레이어 순서를 정리했습니다.',
      },
      {
        title: '옵션별 취소 · 환불',
        body: '상품상세(Next)와 예약·결제(Nuxt) 양쪽에 함께 적용했습니다. 조건부 취소 규정에서 수수료율이 같은 옵션끼리 묶고 다른 정책은 구분해 보여 주며, 선택 옵션이 2개 이상이면서 서로 정책이 다를 때만 옵션 목록을 노출하도록 조건을 좁혔습니다. 공급사 직접 취소 규정 UI는 포팅 문서(201줄)로 정리해 두 레포에 같은 기준으로 반영했습니다.',
      },
      {
        title: '기능 이식 가이드 (1,747줄)',
        body: 'USJ 포함/선택 어트랙션 확인 기능을 투어비스에서 프리비아로 이식하며 구현 흐름·컴포넌트·상태·주의사항을 가이드 문서로 남겼습니다.',
      },
      {
        title: 'SEO · 성능 · 안정성',
        body: '판매중단·매진·종료 상품에 검색 색인 제외를 적용하고, 상품 메타 타이틀은 운영이 지정한 값을 우선하며 브랜드명 중복을 뺐습니다. JSON-LD에 FAQ·평점 데이터를 추가하고 이미지는 리사이저 파라미터로 최적화했습니다. iOS 백화 현상, 후기 탭 앵커 오동작을 잡고 Sentry에 무시 규칙·차단 URL 필터를 걸어 노이즈를 줄였습니다.',
      },
    ],
    metrics: [
      { value: '279건', label: 'privia-front-tnt 커밋 (2025-03~2026-08)' },
      { value: '290건', label: 'tna-privia-front 커밋 (2022-02~2026-08)' },
      { value: '1,747줄', label: '기능 이식 가이드' },
    ],
    paths: [
      'src/_lib/serverActions/server-action-coupon-download.ts · server-action-coupon-list.ts',
      'docs/provider-direct-option-refund-ui-porting.md',
      'docs/USJ_포함선택_어트랙션_확인_기능_가이드.md · docs/JSON-LD-SEO.md',
    ],
  },
  {
    slug: 'braze-message-template-system',
    no: '15',
    title: 'Braze 커스텀 인앱 · 인웹 메시지 템플릿 시스템',
    tagline: '기획 · 퍼블리싱 · 스크립트 · 빌드 환경까지 레포 전체를 단독으로 구축',
    brand: 'marketing',
    repo: 'braze-publishing',
    tags: ['platform', 'architecture'],
    stack: ['Nunjucks', 'Gulp 5', 'SCSS', 'Braze Bridge API', 'JavaScript'],
    featured: true,
    background:
      'Braze는 고객 참여·마케팅 자동화 플랫폼으로, 앱·웹 화면 위에 인앱/인웹 메시지를 띄웁니다. 기본 제공 템플릿은 브랜드 톤과 배치 규칙을 맞출 수 없어 Custom HTML 메시지로 직접 만들어야 했습니다. Custom HTML 메시지는 Braze가 만든 iframe 안에서 실행되는 독립 문서라, 외부 CSS·JS를 참조할 수 없어 한 파일에 전부 인라인되어야 하고, 클릭 성과 집계와 닫기는 Braze 브릿지 API로만 가능하며, iframe의 크기·위치는 자식 문서가 부모를 거꾸로 제어해야 합니다.',
    implementation: [
      {
        title: '템플릿 빌드 파이프라인을 직접 구성했습니다',
        body: 'Nunjucks + Gulp 5 + SCSS. 레이아웃 · 컴포넌트 · 스크립트 · 스타일을 각각 부분 템플릿으로 쪼개고, 브랜드·유형·상황 조합마다 필요한 조각만 조립해 자체 완결 단일 HTML로 뽑아냅니다. 외부 참조가 하나도 없어야 하므로 CSS·JS를 전부 인라인합니다.',
      },
      {
        title: '부모 iframe 제어',
        body: 'Braze가 생성한 메시지 iframe을 자식 문서에서 최상위 window로 거슬러 잡아 뷰포트별로 재배치합니다. 750px 미만은 전체 화면 고정, 이상은 브랜드별 우측 하단 오프셋(투어비스 318px / 프리비아 395px)으로 다르게 앉힙니다. 콘텐츠 실제 높이를 측정해 iframe 높이를 맞추고, 그 값을 CSS 변수로 부모 문서에 되돌려 기존 스낵바·플로팅 요소와 겹치지 않게 했습니다.',
      },
      {
        title: '대시보드 프리뷰 대응',
        body: '마케터가 Braze 대시보드에서 미리 볼 때는 부모 문서 접근이 막힙니다. cross-origin 접근 시 예외가 나는 성질을 이용해 대시보드 환경을 판별하고, 그때는 자기 자신을 루트로 삼도록 폴백을 뒀습니다. 제작자가 대시보드에 올리기 전에 로컬에서 그대로 확인할 수 있는 것이 이 구조의 핵심 이점입니다.',
      },
      {
        title: '초기 깜빡임 제거',
        body: '레이아웃 계산 전에 노출돼 메시지가 튀는 문제를, 초기 투명 처리 후 아이콘 이미지 프리로드 완료 → 크기 계산 → 클래스 부여 → 페이드인 순서로 잡았습니다.',
      },
      {
        title: 'Braze 기본 동작 오버라이드',
        body: 'Braze는 메시지 표시 중 본문 스크롤을 잠급니다. 배너·스낵바형은 스크롤이 되어야 하므로 해당 클래스를 걷어내고, 루트 클래스도 커스텀 애니메이션 세트로 갈아끼웠습니다.',
      },
      {
        title: '브릿지 연동과 노출 제외 규칙',
        body: '브릿지 준비 이벤트에서 data-button-id 가 붙은 요소에 핸들러를 걸어 클릭을 Braze에 기록(성과 집계)하고, 퇴장 애니메이션 300ms 뒤에 메시지를 닫습니다. 프로모션·기획전 페이지 위에 메시지가 겹치면 안 돼서 브랜드별 URL 키워드 차단 목록으로 해당 경로에서는 렌더를 건너뛰고 스크롤 잠금도 되돌립니다.',
      },
      {
        title: '운영 편의',
        body: '템플릿 목록을 JSON으로 관리해 인덱스 페이지를 자동 생성합니다. 브랜드 · 유형 · 상황별 표에서 완료/수정중/대기 상태와 미리보기 링크를 한눈에 보고, 마케터·기획자가 링크만으로 확인할 수 있습니다.',
      },
    ],
    metrics: [
      { value: '17종', label: '산출 템플릿 (투어비스 10 · 프리비아 7)' },
      { value: '4유형', label: '메시지형 · 메시지+버튼형 · 배너/범용형 · 모달형' },
      { value: '단독', label: '레포 단독 작성자 — 기획부터 빌드까지' },
    ],
    paths: [
      'gulpfile.babel.js · src/html/_templates/_layout/_layoutType{1..4,4R}.njk',
      '_templates/_script/_scriptDashBoard.njk · _scriptIframeReady.njk · _scriptBlockPage.njk',
      '_templates/_component/ (_messageCont · _messageButton · _bottomCTA · _modalIcon)',
      'src/html/InWebMessage/{tourvis,privia}/ · _templates/_json/_filelist.json',
    ],
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export function findProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
