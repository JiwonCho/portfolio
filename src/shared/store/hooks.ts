'use client';

import { useDispatch, useSelector, useStore } from 'react-redux';

import type { RootState } from './root-reducer';
import type { AppDispatch, AppStore } from './store';

/**
 * react-redux 는 RSC 환경에서 훅을 제공하지 않는다.
 * 'use client' 로 경계를 그어 서버에서 이 모듈이 평가되지 않게 한다.
 */
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
