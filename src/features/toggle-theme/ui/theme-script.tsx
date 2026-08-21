import { themeInitScript } from '../lib/theme-storage';

/** <head> 최상단에서 동기 실행되어 첫 페인트 전에 테마 클래스를 확정한다. */
export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />;
}
