'use client';

import { Moon, Sun } from 'lucide-react';

import { useAppDispatch, useAppSelector } from '@/shared/store';
import { Button } from '@/shared/ui/button';
import { useIsHydrated } from '@/shared/lib';

import { selectTheme, toggleTheme } from '../model/theme.slice';

export function ThemeToggle() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);
  const isHydrated = useIsHydrated();

  // 하이드레이션 전에는 아이콘을 확정할 수 없으므로 자리만 잡아 둔다
  const isDark = isHydrated ? theme === 'dark' : true;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => dispatch(toggleTheme())}
      aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
    >
      {isDark ? <Moon aria-hidden /> : <Sun aria-hidden />}
    </Button>
  );
}
