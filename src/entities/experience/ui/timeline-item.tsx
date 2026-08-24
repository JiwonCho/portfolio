"use client";

import { motion } from "framer-motion";

import { cn } from "@/shared/lib";
import { Badge } from "@/shared/ui/badge";

import type { ExperiencePhase } from "../model/types";

export function TimelineItem({ phase, maxTicketCount, index, className }: { phase: ExperiencePhase; maxTicketCount: number; index: number; className?: string }) {
  const ratio = Math.round((phase.ticketCount / maxTicketCount) * 100);

  return (
    <motion.li initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }} className={cn("relative pl-8 pb-10 last:pb-0", className)}>
      {/* 타임라인 축 */}
      <span aria-hidden className="absolute left-1.25 top-2 h-full w-px bg-border last:hidden" />
      <span aria-hidden className="absolute left-0 top-1.5 size-2.75 rounded-full border-2 border-primary bg-background" />

      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-sm font-medium text-primary">{phase.period}</span>
          <h3 className="text-base font-semibold">{phase.title}</h3>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted" role="img" aria-label={`${phase.period} 티켓 ${phase.ticketBreakdown}`}>
            <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: ratio / 100 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 + index * 0.06, ease: [0.16, 1, 0.3, 1] }} style={{ transformOrigin: "left" }} className="h-full w-full rounded-full bg-primary" />
          </div>
          <Badge variant="outline" className="shrink-0 font-mono text-[11px] font-normal">
            {phase.ticketBreakdown}
          </Badge>
        </div>

        <p className="text-balance-ko text-sm leading-relaxed text-muted-foreground">{phase.summary}</p>

        <ul className="flex flex-col gap-1.5">
          {phase.highlights.map((highlight) => (
            <li key={highlight} className="text-balance-ko relative pl-4 text-sm leading-relaxed before:absolute before:left-0 before:top-[0.7em] before:size-1 before:rounded-full before:bg-muted-foreground/60">
              {highlight}
            </li>
          ))}
        </ul>
      </div>
    </motion.li>
  );
}
