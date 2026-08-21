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
  /** TODO(자료 필요): 대표 썸네일 (16:9) — public/projects/{slug}.png */
  thumbnail?: string;
}
