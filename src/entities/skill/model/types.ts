export interface Skill {
  name: string;
  /** 이력서에 올릴 만큼 주력으로 쓰는 기술 */
  primary?: boolean;
  /** 어느 수준으로 써 왔는지 — 단순 나열을 피하기 위한 한 줄 */
  note?: string;
}

export interface SkillGroup {
  id: string;
  label: string;
  description: string;
  skills: Skill[];
}
