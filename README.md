# 조지원 포트폴리오

여행 커머스(투어비스·프리비아) 프론트엔드 엔지니어 포트폴리오 사이트.
경력서(`docs/조지원_경력서_20260812.html`)의 Deep Dive 16건을 구조화 데이터로 옮겨 렌더한다.

## 스택

| 구분 | 선택 | 이유 |
| --- | --- | --- |
| Framework | Next.js 16 (App Router) · React 19 | SSG 기반 SEO·LCP, 서버 컴포넌트 경계 설계 |
| Language | TypeScript (strict) | — |
| UI | shadcn/ui (radix-nova) + Tailwind CSS v4 | 프리미티브는 shadcn, 색은 시맨틱 토큰만 |
| 전역 상태 | Redux Toolkit 2 + react-redux 9 | 테마 · 프로젝트 필터 · 폼 상태 |
| 애니메이션 | framer-motion 13 | Hero 인터랙션, 스크롤 리빌 |
| 아키텍처 | Feature-Sliced Design | `app → views → widgets → features → entities → shared` |
| 패키지 매니저 | pnpm 11 | — |
| Node | 22.x (`.nvmrc`) | — |

## 실행

```bash
pnpm install
pnpm dev            # http://localhost:3000
pnpm typecheck      # next typegen && tsc --noEmit
pnpm lint
pnpm build
```

> Node 22가 기본이 아니면 `nvm use 22.23.2` 를 먼저 실행한다.

## 디렉터리 구조 (FSD)

```
app/                                  # Next.js 라우트 (FSD 의 app 레이어)
  layout.tsx  page.tsx  not-found.tsx
  projects/[slug]/page.tsx            # 프로젝트 상세 (SSG, 16건)
  sitemap.ts  robots.ts  opengraph-image.tsx
  globals.css                         # 테마 토큰 정의 — 색을 바꾸는 유일한 지점

src/
  views/            # 라우트 하나에 대응하는 화면 조립
    home/  project-detail/
  widgets/          # 여러 feature/entity 를 조합한 화면 블록
    header/  hero/  about/  projects/  experience/  contact/  footer/
  features/         # 사용자가 수행하는 동작
    toggle-theme/  filter-projects/  copy-email/  send-message/  preview-project-image/
  entities/         # 도메인 데이터의 타입·데이터·표현
    profile/  skill/  experience/  project/
  shared/           # 도메인 지식 없는 범용 UI·유틸
    ui/  lib/  config/  store/
```

규칙:

- 상위 레이어는 **하위 레이어만** import 한다. 역방향 금지.
- import 는 슬라이스 공개 API(`index.ts`)를 경유한다. `@/entities/project` ✅ / `@/entities/project/ui/project-card` ❌
- 슬라이스 내부끼리는 상대 경로를 쓴다.
- 경로 별칭 `@/*` → `./src/*`.

## Redux — shared 가 features 를 모르게 하는 구조

`shared/store` 는 하위 레이어이므로 feature 의 slice 를 직접 알 수 없다.
루트 리듀서를 비워 둔 채로 만들고, 각 feature 가 자기 slice 를 주입한다.

```ts
// src/shared/store/root-reducer.ts
export interface LazyLoadedSlices {}
export const rootReducer = combineSlices().withLazyLoadedSlices<LazyLoadedSlices>();

// src/features/toggle-theme/model/theme.slice.ts
declare module '@/shared/store/root-reducer' {
  export interface LazyLoadedSlices extends WithSlice<typeof themeSlice> {}
}
const injectedThemeSlice = themeSlice.injectInto(rootReducer);
export const { selectTheme } = injectedThemeSlice.selectors;
```

선언 병합으로 `RootState` 에 타입이 얹히므로 `useAppSelector` 가 그대로 추론된다.

> `react-redux` 는 RSC 환경에서 훅을 제공하지 않는다.
> 타입 훅은 `shared/store/hooks.ts` 에 `'use client'` 로 격리해 두었다.

## 콘텐츠 수정 지점

| 대상 | 파일 |
| --- | --- |
| 이름·소개·통계 | `src/entities/profile/model/profile.data.ts` |
| 기술 스택 | `src/entities/skill/model/skills.data.ts` |
| 경력 타임라인 · 서비스 범위 | `src/entities/experience/model/experience.data.ts` |
| 퍼블리셔 경력 (2010–2021) | `src/entities/experience/model/experience.data.ts` 의 `careerHistory` |
| 프로젝트 16건 | `src/entities/project/model/projects.data.ts` |
| 프로젝트 화면 이미지 | `public/projects/{slug}/` + 위 파일의 `thumbnail` / `gallery` (규격은 `public/projects/README.md`) |
| 사이트 메타 · 외부 링크 | `src/shared/config/site.ts` |
| 테마 색 | `app/globals.css` 의 `:root` / `.dark` |

`TODO(자료 필요)` 로 표시된 값은 실제 값으로 교체해야 한다.
남은 항목은 `docs/필요자료-체크리스트.md` 참고.

## Contact 폼

Server Action(`src/features/send-message/api/send-message.action.ts`)이
Web3Forms 로 전송한다. 액세스 키는 **서버 전용** 환경변수로만 읽는다.

```bash
cp .env.example .env.local
# WEB3FORMS_ACCESS_KEY=... 채우기
```

키가 없으면 전송 대신 mailto 폴백을 안내한다.

## 접근성 · 성능

- 글자 단위 리빌은 컨테이너에 `aria-label`, 조각에 `aria-hidden` 을 두어 스크린리더가 문장 단위로 읽는다.
- `prefers-reduced-motion: reduce` 에서 그리드 깜빡임·리빌 애니메이션을 끈다.
- Hero 그리드의 hover 반응은 CSS transition 으로만 처리해 셀 수백 개에 리스너가 붙지 않는다.
- 테마는 `<head>` 인라인 스크립트가 첫 페인트 전에 확정한다(FOUC 방지).
- 모든 페이지가 SSG 로 프리렌더된다.
