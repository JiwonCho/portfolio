'use client';

import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

import { Badge } from '@/shared/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/ui/accordion';

import type { CareerEntry } from '../model/types';

export function CareerList({
  careers,
  certifications,
}: {
  careers: CareerEntry[];
  certifications: { name: string; issuer: string; date: string }[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-4"
    >
      <Accordion type="single" collapsible className="rounded-lg border border-border bg-card">
        {careers.map((career) => (
          <AccordionItem key={career.id} value={career.id} className="px-4">
            <AccordionTrigger className="py-4 text-left">
              <div className="flex flex-1 flex-col gap-1.5 pr-3">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="text-sm font-semibold">{career.company}</span>
                  <span className="text-xs text-muted-foreground">{career.role}</span>
                </div>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="font-mono text-xs text-muted-foreground">{career.period}</span>
                  <span className="text-xs text-muted-foreground">·</span>
                  <span className="text-xs text-muted-foreground">{career.duration}</span>
                </div>
                <p className="text-balance-ko text-xs leading-relaxed text-muted-foreground">
                  {career.summary}
                </p>
              </div>
            </AccordionTrigger>

            <AccordionContent className="pb-5">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-medium text-muted-foreground">주요직무</span>
                  <span className="text-sm">{career.focus}</span>
                </div>

                <ul className="flex flex-col gap-2">
                  {career.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="text-balance-ko relative pl-4 text-sm leading-relaxed text-muted-foreground before:absolute before:left-0 before:top-[0.68em] before:size-1 before:rounded-full before:bg-muted-foreground/60"
                    >
                      {highlight}
                    </li>
                  ))}
                </ul>

                <ul className="flex flex-wrap gap-1">
                  {career.stack.map((tech) => (
                    <li key={tech}>
                      <Badge variant="outline" className="font-normal text-[11px]">
                        {tech}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <ul className="flex flex-wrap gap-2">
        {certifications.map((cert) => (
          <li key={cert.name}>
            <span className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs text-muted-foreground">
              <Award className="size-3.5 shrink-0" aria-hidden />
              <span className="font-medium text-foreground">{cert.name}</span>
              <span>
                {cert.issuer} · {cert.date}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
