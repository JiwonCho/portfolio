'use client';

import { motion } from 'framer-motion';

import { experiencePhases, serviceScopes, TimelineItem } from '@/entities/experience';
import { profile } from '@/entities/profile';
import { Badge } from '@/shared/ui/badge';
import { Card, CardContent } from '@/shared/ui/card';
import { Section, SectionHeader } from '@/shared/ui/section';

export function ExperienceSection() {
  const maxTicketCount = Math.max(...experiencePhases.map((phase) => phase.ticketCount));

  return (
    <Section id="experience">
      <div className="flex flex-col gap-14">
        <SectionHeader
          eyebrow="Experience"
          title="역할이 확장된 4단계"
          description="연도별 담당 티켓 수와 업무 성격의 변화입니다. 막대는 해당 연도 티켓 비중을 나타냅니다."
        />

        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-2 rounded-lg border border-border bg-card p-4">
              <span className="text-sm font-semibold">
                {profile.company} · {profile.team}
              </span>
              <Badge variant="outline" className="font-mono text-[11px] font-normal">
                {profile.period}
              </Badge>
              <Badge variant="secondary" className="font-normal">
                {profile.role}
              </Badge>
            </div>

            <ol className="flex flex-col">
              {experiencePhases.map((phase, index) => (
                <TimelineItem
                  key={phase.id}
                  phase={phase}
                  maxTicketCount={maxTicketCount}
                  index={index}
                />
              ))}
            </ol>
          </div>

          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:sticky lg:top-24 lg:self-start"
          >
            <Card>
              <CardContent className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <h3 className="text-sm font-semibold">담당 서비스 범위</h3>
                  <p className="text-xs text-muted-foreground">
                    티켓 제목에 등장한 서비스명 빈도입니다.
                  </p>
                </div>
                <ul className="flex flex-col divide-y divide-border">
                  {serviceScopes.map((scope) => (
                    <li key={scope.name} className="flex flex-col gap-1 py-3 first:pt-0 last:pb-0">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-sm font-medium">{scope.name}</span>
                        <span className="font-mono text-xs tabular-nums text-muted-foreground">
                          {scope.mentions}
                        </span>
                      </div>
                      <span className="text-balance-ko text-xs leading-relaxed text-muted-foreground">
                        {scope.nature}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.aside>
        </div>
      </div>
    </Section>
  );
}
