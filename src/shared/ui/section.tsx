/**
 * 프로젝트에서 작성한 레이아웃 프리미티브.
 * (이 폴더의 나머지 파일은 shadcn 생성 코드다)
 */
import type { ReactNode } from 'react';

import { cn } from '@/shared/lib/utils';

export function Section({
  id,
  children,
  className,
  containerClassName,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}) {
  return (
    <section id={id} className={cn('scroll-mt-20 py-20 sm:py-28', className)}>
      <div className={cn('mx-auto w-full max-w-6xl px-6', containerClassName)}>{children}</div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <header className={cn('flex flex-col gap-3', className)}>
      <span className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-primary">
        {eyebrow}
      </span>
      <h2 className="text-balance-ko text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
      {description ? (
        <p className="text-balance-ko max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {description}
        </p>
      ) : null}
    </header>
  );
}
