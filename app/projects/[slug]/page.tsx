import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { findProjectBySlug, projects } from '@/entities/project';
import { ProjectDetailPage } from '@/views/project-detail';

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<'/projects/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const project = findProjectBySlug(slug);

  if (!project) {
    return { title: '프로젝트를 찾을 수 없습니다', robots: { index: false, follow: false } };
  }

  return {
    title: project.title,
    description: `${project.tagline} — ${project.background.slice(0, 120)}`,
    openGraph: {
      type: 'article',
      title: project.title,
      description: project.tagline,
    },
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

export default async function Page({ params }: PageProps<'/projects/[slug]'>) {
  const { slug } = await params;
  const project = findProjectBySlug(slug);

  if (!project) notFound();

  return <ProjectDetailPage project={project} />;
}
