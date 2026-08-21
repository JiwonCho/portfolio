export interface ProfileStat {
  /** 화면에 크게 표시되는 수치 */
  value: string;
  /** 수치 뒤에 붙는 단위 */
  suffix?: string;
  label: string;
  /** 근거 · 집계 기준 */
  note?: string;
}

export interface Profile {
  name: string;
  nameEn: string;
  role: string;
  company: string;
  team: string;
  period: string;
  duration: string;
  headline: string[];
  summary: string;
  philosophy: { title: string; body: string }[];
  stats: ProfileStat[];
}
