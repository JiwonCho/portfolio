'use client';

import { useEffect, useState } from 'react';

/** 헤더(h-16)와 scroll-mt-20 / scroll-padding-top(5rem)에 맞춘 스파이 라인 */
const HEADER_OFFSET = 80;

/**
 * 뷰포트 상단(헤더 아래)을 가로지른 마지막 섹션 id.
 * IntersectionObserver 대신 스크롤 좌표로 판정해, 긴 섹션·점프 스크롤에서도 메뉴가 어긋나지 않게 한다.
 */
export function useActiveSection(sectionIds: readonly string[], offset = HEADER_OFFSET) {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? '');

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const resolveActiveId = () => {
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) return elements[elements.length - 1].id;

      let current = elements[0].id;
      for (const element of elements) {
        if (element.getBoundingClientRect().top <= offset + 1) {
          current = element.id;
        }
      }
      return current;
    };

    let frame = 0;
    const update = () => {
      const next = resolveActiveId();
      setActiveId((prev) => (prev === next ? prev : next));
    };

    const onScrollOrResize = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };

    frame = requestAnimationFrame(() => {
      frame = 0;
      update();
    });
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);
    window.addEventListener('hashchange', onScrollOrResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      window.removeEventListener('hashchange', onScrollOrResize);
    };
  }, [sectionIds, offset]);

  return activeId;
}
