<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

# 프로젝트 규칙 — 포트폴리오 사이트

## 스택

Next.js 16 (App Router) · React 19 · TypeScript(strict) · Tailwind CSS v4 · shadcn/ui
· Redux Toolkit 2 · framer-motion 13 · pnpm 11 · Node 22.x

## UI 규칙 (필수)

1. **UI 프리미티브는 shadcn 에서 가져온다.** `pnpm dlx shadcn@latest add <component>`
   → `components.json` 이 FSD 에 맞춰져 있어 `src/shared/ui/` 에 생성된다.
   `src/shared/ui/` 의 파일은 생성 코드다. 프로젝트 고유 로직을 넣지 않는다.
   (예외: 직접 작성한 `section.tsx`, `brand-icons.tsx` — 파일 상단에 명시해 두었다)
2. **색은 시맨틱 토큰만 쓴다.** `bg-slate-900` `text-blue-600` 같은 팔레트 클래스 금지.
   `dark:` 접두사로 색을 따로 지정할 필요도 없다.
   Hero 는 테마와 무관하게 항상 어두우므로 전용 토큰(`bg-hero` `text-hero-muted`
   `border-hero-line` `bg-hero-cell-active` `bg-hero-glow` `text-hero-accent`)을 쓴다.
3. **테마 색은 `app/globals.css` 한 곳에서만 정의한다.** `:root` / `.dark` 블록이 유일한 지점.
4. **아이콘은 `lucide-react`.** 이모지를 UI 요소로 쓰지 않는다. 기본 크기 `size-4`.
   lucide v1 에는 브랜드 아이콘이 없다 → `src/shared/ui/brand-icons.tsx` 를 쓴다.
5. **클래스 결합은 `cn()`** — `import { cn } from '@/shared/lib'`

검증:

```bash
rg '(bg|text|border|ring)-(slate|gray|zinc|neutral|stone|blue|red|amber|green|indigo)-\d' src app --glob '!src/shared/ui/**'
```

## 아키텍처 — Feature-Sliced Design

```
app  →  views  →  widgets  →  features  →  entities  →  shared
```

- 상위 레이어는 하위 레이어만 import 한다. 역방향 금지.
- import 는 공개 API(`index.ts`)를 경유한다. 슬라이스 내부끼리는 상대 경로.
- Next 예약어 회피: FSD `app` → Next 의 `app/`, FSD `pages` → `src/views/`.
- 경로 별칭 `@/*` → `./src/*`.

## Redux

- 루트 리듀서는 `shared/store/root-reducer.ts` 에 **비어 있는 채로** 만든다.
- feature 가 `slice.injectInto(rootReducer)` 로 주입하고,
  `declare module '@/shared/store/root-reducer'` 선언 병합으로 `RootState` 에 타입을 얹는다.
- 타입 훅(`useAppSelector` 등)은 `shared/store/hooks.ts` 에 `'use client'` 로 격리한다.
  react-redux 는 RSC 환경에서 훅을 제공하지 않는다.
- DOM/localStorage 부수효과는 리듀서가 아니라 thunk 에서 처리한다 (`toggleTheme` 참고).

## React 19 훅 규칙

- `useEffect` 본문에서 동기 `setState` 를 호출하지 않는다 (콜백/타이머 안에서만).
- 렌더 중 `ref.current` 를 읽지 않는다. 지연 초기화는 `useState(() => ...)`.
- 하이드레이션 감지는 `useIsHydrated()` (`useSyncExternalStore` 기반).

## 콘텐츠

화면 문구는 컴포넌트가 아니라 `src/entities/*/model/*.data.ts` 에 있다.
경력 내용을 고칠 때 컴포넌트를 열지 않는다.

## 검증

작업 후 아래를 통과시킨다.

```bash
pnpm typecheck && pnpm lint && pnpm build
```
