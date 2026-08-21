'use client';

import { motion } from 'framer-motion';

import {
  CareerList,
  careerHistory,
  careerSummary,
  experiencePhases,
  serviceScopes,
  TimelineItem,
} from '@/entities/experience';
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
          title="퍼블리셔 12년, 프론트엔드 5년째"
          description="2010년 웹 표준·웹 접근성 퍼블리싱으로 시작해 지금은 여행 커머스의 프론트엔드를 맡고 있습니다. 아래 막대는 타이드스퀘어에서의 연도별 티켓 비중입니다."
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

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="text-lg font-semibold">그 이전 — {careerSummary.title}</h3>
              <span className="font-mono text-xs text-muted-foreground">
                {careerSummary.period} · {careerSummary.duration}
              </span>
            </div>
            <p className="text-balance-ko max-w-3xl text-sm leading-relaxed text-muted-foreground">
              {careerSummary.description}
            </p>
          </div>

          <CareerList
            careers={careerHistory}
            certifications={careerSummary.certifications}
          />
        </div>
      </div>
    </Section>
  );
}
