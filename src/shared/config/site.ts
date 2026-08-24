/**
 * 사이트 전역 설정.
 * TODO(자료 필요) 로 표시된 값은 실제 값으로 교체해야 한다.
 */
export const siteConfig = {
  name: "조지원 · Frontend Engineer",
  shortName: "Jiwon Cho",
  description: "여행 커머스(투어비스·프리비아)의 상품 탐색–예약–결제 전 구간을 담당하는 프론트엔드 엔지니어. Next.js·TypeScript 기반 모노레포와 Nuxt 예약·결제 서비스를 함께 다룹니다.",
  url: "https://jiwon-cho-portfolio.vercel.app",
  locale: "ko_KR",
  keywords: ["프론트엔드 개발자", "프론트엔드 포트폴리오", "Next.js", "React", "TypeScript", "여행 커머스", "조지원"],
} as const;

export const socialLinks = {
  email: "dunguri2@gmail.com",
  github: "https://github.com/JiwonCho",
  /** TODO(자료 필요): 기술 블로그 URL (velog / tistory / medium) */
  blog: "",
  /** TODO(자료 필요): LinkedIn URL */
  linkedin: "",
} as const;

export const documentLinks = {
  resume: {
    href: "/resume.pdf",
    filename: "조지원_이력서_20260824.pdf",
    label: "이력서 다운로드",
  },
  career: {
    href: "/career.html",
    filename: "조지원_경력서_20260824.html",
    label: "경력기술서 다운로드",
  },
} as const;

export const navItems = [
  { id: "about", label: "About", href: "#about" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "contact", label: "Contact", href: "#contact" },
] as const;

export const sectionIds = ["hero", ...navItems.map((item) => item.id)] as const;
