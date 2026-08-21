'use client';

import { motion } from 'framer-motion';

import { profile } from '@/entities/profile';
import { SkillGroupCard, skillGroups } from '@/entities/skill';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Section, SectionHeader } from '@/shared/ui/section';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
} as const;

export function AboutSection() {
  return (
    <Section id="about">
      <div className="flex flex-col gap-14">
        <SectionHeader
          eyebrow="About"
          title="기능을 만들기 전에, 경계를 먼저 정합니다"
          description="퍼블리싱으로 시작해 프론트엔드 엔지니어링으로 역할을 확장했습니다. 마크업·운영 대응에서 공용 컴포넌트 체계와 컴포넌트 아키텍처 설계로, 다시 서버 전용 코드 분리·로그 규격화·AI 기술 문서화로 범위를 넓혀 왔습니다."
        />

        <div className="grid gap-4 sm:grid-cols-2">
          {profile.philosophy.map((item, index) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 font-mono text-xs text-primary">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <CardTitle className="text-balance-ko text-base leading-snug">
                      {item.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-balance-ko text-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">기술 스택</h3>
            <p className="text-balance-ko text-sm text-muted-foreground">
              tourvis-front · privia-front 모노레포와 tna-privia-front(Nuxt)의 실제 의존성과 커밋
              이력에서 확인한 항목입니다. 채워진 배지는 주력으로 쓰는 기술입니다.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group, index) => (
              <motion.div
                key={group.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                <SkillGroupCard group={group} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
