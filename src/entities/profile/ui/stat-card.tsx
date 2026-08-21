import { cn } from '@/shared/lib';
import type { ProfileStat } from '../model/types';

export function StatCard({ stat, className }: { stat: ProfileStat; className?: string }) {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <div className="flex items-baseline gap-0.5">
        <span className="text-3xl font-semibold tracking-tight tabular-nums sm:text-4xl">
          {stat.value}
        </span>
        {stat.suffix ? (
          <span className="text-base font-medium text-muted-foreground">{stat.suffix}</span>
        ) : null}
      </div>
      <span className="text-sm font-medium">{stat.label}</span>
      {stat.note ? (
        <span className="text-xs leading-relaxed text-muted-foreground">{stat.note}</span>
      ) : null}
    </div>
  );
}
