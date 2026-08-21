import { createSlice, type PayloadAction, type WithSlice } from '@reduxjs/toolkit';

import { rootReducer, type AppThunk } from '@/shared/store';

import { applyThemeToDocument, readThemeFromDocument, type Theme } from '../lib/theme-storage';

interface ThemeState {
  value: Theme;
}

const themeSlice = createSlice({
  name: 'theme',
  initialState: (): ThemeState => ({ value: readThemeFromDocument() }),
  reducers: {
    themeChanged(state, action: PayloadAction<Theme>) {
      state.value = action.payload;
    },
  },
  selectors: {
    selectTheme: (state) => state.value,
  },
});

// 타입 선언 병합은 인터페이스가 실제로 선언된 모듈을 지정해야 한다 (런타임 import 아님)
declare module '@/shared/store/root-reducer' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface LazyLoadedSlices extends WithSlice<typeof themeSlice> {}
}

const injectedThemeSlice = themeSlice.injectInto(rootReducer);

export const { themeChanged } = themeSlice.actions;
export const { selectTheme } = injectedThemeSlice.selectors;

/** 테마 전환 — 상태 갱신과 DOM/localStorage 반영을 한 액션으로 묶는다. */
export const toggleTheme = (): AppThunk => (dispatch, getState) => {
  const next: Theme = selectTheme(getState()) === 'dark' ? 'light' : 'dark';
  dispatch(themeChanged(next));
  applyThemeToDocument(next);
};
