'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

import { usePrefersReducedMotion } from '@/shared/lib';

const CELL_SIZE = 68;
/** 동시에 은은하게 깜빡이는 셀 개수 */
const FLASH_COUNT = 14;

interface GridSize {
  cols: number;
  rows: number;
}

/**
 * Dark Grid — 커서가 지나간 셀이 즉시 밝아졌다가 천천히 식는다.
 *
 * 셀 하나하나를 motion 컴포넌트로 만들면 수백 개의 구독이 생기므로,
 * hover 반응은 CSS transition 으로만 처리하고(비용 0)
 * framer-motion 은 주변광처럼 무작위로 깜빡이는 소수의 셀에만 쓴다.
 */
export function HeroGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [{ cols, rows }, setSize] = useState<GridSize>({ cols: 0, rows: 0 });
  const [flashKeys, setFlashKeys] = useState<number[]>([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({
        cols: Math.ceil(width / CELL_SIZE),
        rows: Math.ceil(height / CELL_SIZE),
      });
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const total = cols * rows;

  useEffect(() => {
    if (total === 0 || prefersReducedMotion) return;

    const pick = () =>
      Array.from({ length: FLASH_COUNT }, () => Math.floor(Math.random() * total));

    // 첫 회차도 콜백에서 갱신해 이펙트 본문에서 동기 setState 하지 않는다
    const firstRun = window.setTimeout(() => setFlashKeys(pick()), 0);
    const timer = window.setInterval(() => setFlashKeys(pick()), 2600);

    return () => {
      window.clearTimeout(firstRun);
      window.clearInterval(timer);
    };
  }, [total, prefersReducedMotion]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="grid h-full w-full"
        style={{
          gridTemplateColumns: `repeat(${cols || 1}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${rows || 1}, minmax(0, 1fr))`,
        }}
      >
        {Array.from({ length: total }, (_, index) => (
          <div
            key={index}
            className="border-r border-b border-hero-line bg-transparent transition-colors duration-[1400ms] ease-out hover:bg-hero-cell-active hover:duration-0"
          />
        ))}
      </div>

      {/* 주변광 — 무작위 셀이 천천히 밝아졌다 사라진다 */}
      {cols > 0 && !prefersReducedMotion ? (
        <div
          className="pointer-events-none absolute inset-0 grid"
          style={{
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
          }}
        >
          {flashKeys.map((cellIndex, i) => (
            <motion.div
              key={`${cellIndex}-${i}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.9, 0] }}
              transition={{ duration: 2.4, delay: i * 0.14, ease: 'easeInOut' }}
              className="bg-hero-cell"
              style={{
                gridColumn: (cellIndex % cols) + 1,
                gridRow: Math.floor(cellIndex / cols) + 1,
              }}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
