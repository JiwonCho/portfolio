import { combineSlices } from '@reduxjs/toolkit';

/**
 * FSD 에서 shared 는 상위 레이어(features/widgets)를 import 할 수 없다.
 * 그래서 루트 리듀서를 비워 둔 채로 만들고, 각 feature 가 자신의 slice 를
 * `slice.injectInto(rootReducer)` 로 주입한다. (RTK 2 lazy-loaded slices 패턴)
 *
 * feature 쪽에서는 선언 병합으로 RootState 에 타입을 얹는다.
 *
 * ```ts
 * declare module '@/shared/store' {
 *   export interface LazyLoadedSlices extends WithSlice<typeof themeSlice> {}
 * }
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface LazyLoadedSlices {}

export const rootReducer = combineSlices().withLazyLoadedSlices<LazyLoadedSlices>();

export type RootState = ReturnType<typeof rootReducer>;
