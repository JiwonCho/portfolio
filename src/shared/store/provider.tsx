'use client';

import { useState, type ReactNode } from 'react';
import { Provider } from 'react-redux';

import { makeStore, type AppStore } from './store';

/**
 * App Router 에서는 요청마다 스토어를 새로 만들어야 서버 간 상태가 섞이지 않는다.
 * useState 의 지연 초기화로 클라이언트 세션당 1회만 생성한다.
 */
export function StoreProvider({ children }: { children: ReactNode }) {
  const [store] = useState<AppStore>(() => makeStore());

  return <Provider store={store}>{children}</Provider>;
}
