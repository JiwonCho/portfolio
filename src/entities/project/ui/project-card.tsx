'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, GitBranch } from 'lucide-react';

import { Badge } from '@/shared/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/shared/ui/card';
import { cn } from '@/shared/lib';

import type { Project } from '../model/types';
import { PROJECT_BRANDS } from '../model/types';

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
} as const;

function brandLabel(brand: Project['brand']) {
  return PROJECT_BRANDS.find((item) => item.id === brand)?.label ?? brand;
}

export function ProjectCard({ project, className }: { project: Project; className?: string }) {
  return (
    <motion.article
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, y: -12, transition: { duration: 0.2 } }}
      className={cn('h-full', className)}
    >
      <Card className="group relative h-full gap-4 transition-colors hover:border-primary/40">
        <CardHeader className="gap-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-muted-foreground">{project.no}</span>
            <Badge variant="secondary" className="font-normal">
              {brandLabel(project.brand)}
            </Badge>
          </div>
          <CardTitle className="text-balance-ko text-lg leading-snug">
            <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0">
              {project.title}
            </Link>
          </CardTitle>
          <p className="text-balance-ko text-sm leading-relaxed text-muted-foreground">
            {project.tagline}
          </p>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          <dl className="grid grid-cols-2 gap-x-4 gap-y-3">
            {project.metrics.slice(0, 4).map((metric) => (
              <div key={metric.label} className="flex flex-col gap-0.5">
                <dt className="sr-only">{metric.label}</dt>
                <dd className="text-base font-semibold tabular-nums">{metric.value}</dd>
                <dd className="text-[11px] leading-tight text-muted-foreground">{metric.label}</dd>
              </div>
            ))}
          </dl>

          <ul className="flex flex-wrap gap-1">
            {project.stack.slice(0, 5).map((tech) => (
              <li key={tech}>
                <Badge variant="outline" className="font-normal text-[11px]">
                  {tech}
                </Badge>
              </li>
            ))}
          </ul>
        </CardContent>

        <CardFooter className="mt-auto justify-between text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5 font-mono">
            <GitBranch className="size-3.5" aria-hidden />
            {project.repo}
          </span>
          <ArrowUpRight
            className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden
          />
        </CardFooter>
      </Card>
    </motion.article>
  );
}
