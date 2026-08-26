import Link from 'next/link';
import { ArrowLeft, ExternalLink, GitBranch } from 'lucide-react';

import { PROJECT_BRANDS, PROJECT_CATEGORIES, type Project } from '@/entities/project';
import { ProjectGallery } from '@/features/preview-project-image';
import { Badge } from '@/shared/ui/badge';
import { GithubIcon } from '@/shared/ui/brand-icons';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import { Separator } from '@/shared/ui/separator';

function labelOf(list: readonly { id: string; label: string }[], id: string) {
  return list.find((item) => item.id === id)?.label ?? id;
}

export function ProjectDetailPage({ project }: { project: Project }) {
  return (
    <article className="mx-auto w-full max-w-4xl px-6 pb-24 pt-28">
      <Button variant="ghost" size="sm" asChild className="-ml-2 mb-8">
        <Link href="/#projects">
          <ArrowLeft aria-hidden />
          프로젝트 목록
        </Link>
      </Button>

      <header className="flex flex-col gap-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs text-muted-foreground">Deep Dive {project.no}</span>
          <Badge variant="secondary" className="font-normal">
            {labelOf(PROJECT_BRANDS, project.brand)}
          </Badge>
          {project.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="font-normal">
              {labelOf(PROJECT_CATEGORIES, tag)}
            </Badge>
          ))}
        </div>

        <h1 className="text-balance-ko text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          {project.title}
        </h1>
        <p className="text-balance-ko text-base leading-relaxed text-muted-foreground">
          {project.tagline}
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5 font-mono">
            <GitBranch className="size-3.5" aria-hidden />
            {project.repo}
          </span>
          <span className="inline-flex flex-wrap gap-1">
            {project.stack.map((tech) => (
              <Badge key={tech} variant="ghost" className="font-normal text-[11px]">
                {tech}
              </Badge>
            ))}
          </span>
        </div>
      </header>

      {project.links?.length ? (
        <div className="mt-6 flex flex-wrap gap-2">
          {project.links.map((link) => (
            <Button key={link.href} variant="outline" size="sm" asChild>
              <a href={link.href} target="_blank" rel="noreferrer noopener">
                {link.type === 'repo' ? <GithubIcon /> : <ExternalLink aria-hidden />}
                {link.label}
              </a>
            </Button>
          ))}
        </div>
      ) : null}

      <Separator className="my-10" />

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">배경</h2>
        <p className="text-balance-ko leading-relaxed text-muted-foreground">
          {project.background}
        </p>
      </section>

      {project.gallery?.length ? (
        <section className="mt-12 flex flex-col gap-4">
          <h2 className="text-lg font-semibold">화면</h2>
          <ProjectGallery images={project.gallery} />
        </section>
      ) : null}

      <section className="mt-12 flex flex-col gap-6">
        <h2 className="text-lg font-semibold">구현</h2>
        <ol className="flex flex-col gap-5">
          {project.implementation.map((item, index) => (
            <li key={item.title} className="flex gap-4">
              <span className="mt-1 shrink-0 font-mono text-xs text-primary">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="text-balance-ko text-base font-semibold leading-snug">
                  {item.title}
                </h3>
                <p className="text-balance-ko text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-12 flex flex-col gap-4">
        <h2 className="text-lg font-semibold">규모</h2>
        <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {project.metrics.map((metric) => (
            <Card key={metric.label}>
              <CardContent className="flex flex-col gap-1">
                <dt className="order-2 text-[11px] leading-tight text-muted-foreground">
                  {metric.label}
                </dt>
                <dd className="order-1 text-xl font-semibold tabular-nums">{metric.value}</dd>
              </CardContent>
            </Card>
          ))}
        </dl>
        <p className="text-xs leading-relaxed text-muted-foreground">
          파일 수·줄 수·커밋 수는 파일명·경로 패턴으로 센 레포 집계값이라 해당 기능만의 순수
          코드량은 아니며, 커밋 수에는 머지 커밋과 공동 작업분이 섞여 있습니다.
        </p>
      </section>

      <Separator className="my-12" />

      <Button variant="outline" asChild>
        <Link href="/#projects">
          <ArrowLeft aria-hidden />
          다른 프로젝트 보기
        </Link>
      </Button>
    </article>
  );
}
