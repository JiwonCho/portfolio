export const PROJECT_CATEGORIES = [
  { id: 'all', label: '전체' },
  { id: 'architecture', label: '아키텍처 · 설계' },
  { id: 'domain', label: '도메인 · 커머스' },
  { id: 'quality', label: '성능 · SEO · 품질' },
  { id: 'payment', label: '예약 · 결제 · 정책' },
  { id: 'global', label: '글로벌 · 제휴 채널' },
  { id: 'platform', label: '플랫폼 · 생산성' },
] as const;

export type ProjectCategoryId = (typeof PROJECT_CATEGORIES)[number]['id'];
export type ProjectTag = Exclude<ProjectCategoryId, 'all'>;

export const PROJECT_BRANDS = [
  { id: 'all', label: '전체' },
  { id: 'tourvis', label: '투어비스' },
  { id: 'privia-tnt', label: '프리비아 투티' },
  { id: 'privia-package', label: '해외패키지' },
  { id: 'marketing', label: '마케팅 메시지' },
] as const;

export type ProjectBrandId = (typeof PROJECT_BRANDS)[number]['id'];
export type ProjectBrand = Exclude<ProjectBrandId, 'all'>;

export interface ProjectSection {
  title: string;
  body: string;
}

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface ProjectImage {
  /** public 기준 절대 경로 — 예: /projects/usj-pass-domain/01-pass-filter.webp */
  src: string;
  /** 스크린리더용 설명. 어떤 화면인지 문장으로 적는다 */
  alt: string;
  /** 이미지 아래 캡션 — 무엇을 보여 주는 장면인지 */
  caption?: string;
  /** wide = PC 화면(16:9), tall = 모바일 화면(9:16) */
  ratio?: 'wide' | 'tall';
}

export interface Project {
  slug: string;
  /** Deep Dive 순번 */
  no: string;
  title: string;
  /** 카드에 노출되는 한 줄 설명 */
  tagline: string;
  brand: ProjectBrand;
  /** 실제 리포지토리 이름 */
  repo: string;
  tags: ProjectTag[];
  stack: string[];
  featured: boolean;
  /** 배경 — 왜 이 일을 해야 했는가 */
  background: string;
  /** 구현 — 어떻게 풀었는가 */
  implementation: ProjectSection[];
  /** 규모 — 집계값 */
  metrics: ProjectMetric[];
  /** 카드 대표 썸네일 (16:9). 없으면 카드가 텍스트 전용 레이아웃으로 렌더된다 */
  thumbnail?: string;
  /** 상세 페이지 갤러리. 없으면 갤러리 섹션 자체가 렌더되지 않는다 */
  gallery?: ProjectImage[];
}
