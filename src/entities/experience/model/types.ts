export interface ExperiencePhase {
  id: string;
  period: string;
  title: string;
  /** 해당 기간 티켓 수 — 타임라인 막대 비중 계산에 쓴다 */
  ticketCount: number;
  ticketBreakdown: string;
  summary: string;
  highlights: string[];
}

export interface ServiceScope {
  name: string;
  nature: string;
  mentions: string;
}

/** 타이드스퀘어 이전 — 웹 퍼블리셔 · 프론트엔드 경력 (2010 – 2021) */
export interface CareerEntry {
  id: string;
  company: string;
  period: string;
  duration: string;
  role: string;
  /** 이력서의 「주요직무」 */
  focus: string;
  /** 접힌 상태에서도 보이는 한 줄 — 대표 브랜드·프로젝트 (초기 HTML 에 포함되어야 한다) */
  summary: string;
  /** 담당한 대표 브랜드 · 프로젝트 */
  highlights: string[];
  /** 해당 시기에 쓴 기술 */
  stack: string[];
}
