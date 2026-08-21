'use client';

import { useSyncExternalStore } from 'react';

const emptySubscribe = () => () => {};

/**
 * 하이드레이션 완료 여부. useEffect + setState 없이 감지한다.
 * 서버/클라이언트 초기 렌더가 달라지는 UI(테마 아이콘 등)에 사용한다.
 */
export function useIsHydrated() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}
