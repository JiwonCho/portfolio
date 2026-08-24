export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'portfolio-theme';

/** 하이드레이션 이전에 <head> 에서 실행되는 스크립트. 테마 깜빡임(FOUC)을 막는다. */
export const themeInitScript = `(function(){try{var k='${THEME_STORAGE_KEY}';var s=localStorage.getItem(k);var t=s==='light'||s==='dark'?s:'dark';document.documentElement.classList.toggle('dark',t==='dark');document.documentElement.style.colorScheme=t;}catch(e){document.documentElement.classList.add('dark');}})();`;

/** 스토어 생성 시점의 테마 — 위 스크립트가 이미 적용해 둔 DOM 상태에서 읽는다. */
export function readThemeFromDocument(): Theme {
  if (typeof document === 'undefined') return 'dark';
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

export function applyThemeToDocument(theme: Theme) {
  if (typeof document === 'undefined') return;
  document.documentElement.classList.toggle('dark', theme === 'dark');
  document.documentElement.style.colorScheme = theme;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // 프라이빗 모드 등에서 저장이 막혀도 테마 전환 자체는 동작해야 한다
  }
}
