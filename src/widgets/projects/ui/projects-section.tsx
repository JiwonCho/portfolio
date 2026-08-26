'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { FolderSearch } from 'lucide-react';

import { ProjectCard } from '@/entities/project';
import { ProjectFilterBar, selectFilteredProjects } from '@/features/filter-projects';
import { useAppSelector } from '@/shared/store';
import { Section, SectionHeader } from '@/shared/ui/section';

export function ProjectsSection() {
  const filteredProjects = useAppSelector(selectFilteredProjects);

  return (
    <Section id="projects" className="bg-muted/30">
      <div className="flex flex-col gap-10">
        <SectionHeader
          eyebrow="Projects"
          title="실제 소스와 설계 문서를 다시 읽어 정리한 18건"
          description="티켓 제목이 아니라 레포의 소스·주석·계획서를 기준으로 적었습니다. 각 카드의 수치는 파일명·경로 패턴으로 센 레포 집계값이라, 규모감으로만 읽어 주세요. 카드를 누르면 배경 → 구현 → 규모 → 파일 경로 순으로 상세를 볼 수 있습니다."
        />

        <ProjectFilterBar resultCount={filteredProjects.length} />

        {filteredProjects.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-border py-20 text-center">
            <FolderSearch className="size-8 text-muted-foreground" aria-hidden />
            <p className="text-sm text-muted-foreground">
              조건에 맞는 프로젝트가 없습니다. 필터를 바꿔 보세요.
            </p>
          </div>
        ) : (
          <motion.ul layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.li key={project.slug} layout className="list-none">
                  <ProjectCard project={project} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        )}
      </div>
    </Section>
  );
}
