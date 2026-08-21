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
