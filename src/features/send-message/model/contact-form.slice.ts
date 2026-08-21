import { createSlice, type PayloadAction, type WithSlice } from '@reduxjs/toolkit';

import { rootReducer } from '@/shared/store';

export type ContactStatus = 'idle' | 'submitting' | 'success' | 'error';

interface ContactFormState {
  status: ContactStatus;
  message: string | null;
}

const initialState: ContactFormState = { status: 'idle', message: null };

const contactFormSlice = createSlice({
  name: 'contactForm',
  initialState,
  reducers: {
    submitStarted(state) {
      state.status = 'submitting';
      state.message = null;
    },
    submitSucceeded(state, action: PayloadAction<string>) {
      state.status = 'success';
      state.message = action.payload;
    },
    submitFailed(state, action: PayloadAction<string>) {
      state.status = 'error';
      state.message = action.payload;
    },
    formReset() {
      return initialState;
    },
  },
  selectors: {
    selectContactStatus: (state) => state.status,
    selectContactMessage: (state) => state.message,
  },
});

// 타입 선언 병합은 인터페이스가 실제로 선언된 모듈을 지정해야 한다 (런타임 import 아님)
declare module '@/shared/store/root-reducer' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface LazyLoadedSlices extends WithSlice<typeof contactFormSlice> {}
}

const injectedContactFormSlice = contactFormSlice.injectInto(rootReducer);

export const { submitStarted, submitSucceeded, submitFailed, formReset } =
  contactFormSlice.actions;
export const { selectContactStatus, selectContactMessage } = injectedContactFormSlice.selectors;
