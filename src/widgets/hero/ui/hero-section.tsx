'use client';

import { useRef, type MouseEvent } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, ArrowRight, Download, FileText, Mail } from 'lucide-react';

import { profile } from '@/entities/profile';
import { documentLinks } from '@/shared/config';
import { usePrefersReducedMotion } from '@/shared/lib';
import { Button } from '@/shared/ui/button';

import { HeroGrid } from './hero-grid';
import { TextReveal } from './text-reveal';

const SPRING = { damping: 26, stiffness: 140, mass: 0.6 } as const;

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // 섹션 중앙을 (0,0) 으로 하는 커서 오프셋(px)
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const glowX = useSpring(pointerX, SPRING);
  const glowY = useSpring(pointerY, SPRING);

  // 콘텐츠는 커서 반대 방향으로 아주 조금만 밀린다 (패럴랙스)
  const contentX = useTransform(glowX, (value) => value * -0.012);
  const contentY = useTransform(glowY, (value) => value * -0.012);

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(event.clientX - rect.left - rect.width / 2);
    pointerY.set(event.clientY - rect.top - rect.height / 2);
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden bg-hero text-hero-foreground"
    >
      <HeroGrid />

      {/* 커서를 따라오는 글로우 */}
      <motion.div
        aria-hidden
        style={{ x: glowX, y: glowY }}
        className="pointer-events-none absolute left-1/2 top-1/2 -ml-[320px] -mt-[320px] size-[640px] rounded-full bg-hero-glow blur-[130px]"
      />

      {/* 가장자리 비네트 — 그리드가 화면 밖으로 자연스럽게 사라진다 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,var(--hero)_80%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background"
      />

      <motion.div
        style={{ x: contentX, y: contentY }}
        className="pointer-events-none relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-28 sm:py-32"
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="pointer-events-auto flex"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-hero-line bg-hero-cell px-3 py-1.5 text-xs font-medium text-hero-muted backdrop-blur-sm">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-hero-accent opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-hero-accent" />
            </span>
            {profile.company} · {profile.team} · {profile.period}
          </span>
        </motion.div>

        <div className="flex flex-col gap-4">
          <div className="text-xs font-medium uppercase tracking-[0.28em] text-hero-accent sm:text-sm">
            <TextReveal text="Frontend Engineer Portfolio" delay={0.15} />
          </div>

          <h1 className="flex flex-col gap-1 text-4xl font-bold leading-[1.15] tracking-tight sm:text-6xl lg:text-7xl">
            <TextReveal text={profile.headline[0]} delay={0.35} />
            {/*
              배경 그라디언트 + bg-clip-text 를 쓰지 않는다.
              글자를 그리는 건 transform 이 걸린 자식 span 들이라,
              iOS Safari 에서 합성 레이어가 된 자손에는 클립된 배경이 칠해지지 않는다
              (= 글자가 통째로 투명해진다). 단색 토큰으로 칠한다.
            */}
            <TextReveal
              text={`${profile.headline[1]} ${profile.name}`}
              delay={0.6}
              className="text-hero-accent"
            />
          </h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="text-balance-ko max-w-2xl text-sm leading-relaxed text-hero-muted sm:text-base"
        >
          {profile.summary}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="pointer-events-auto flex flex-wrap gap-3"
        >
          <Button size="lg" asChild className="h-11 px-5 text-sm">
            <Link href="#projects">
              프로젝트 보기
              <ArrowRight aria-hidden />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="h-11 border-hero-line bg-hero-cell px-5 text-sm text-hero-foreground backdrop-blur-sm hover:bg-hero-cell-active hover:text-hero-foreground"
          >
            <a href={documentLinks.resume.href} download={documentLinks.resume.filename}>
              {documentLinks.resume.label}
              <Download aria-hidden />
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="h-11 border-hero-line bg-hero-cell px-5 text-sm text-hero-foreground backdrop-blur-sm hover:bg-hero-cell-active hover:text-hero-foreground"
          >
            <a href={documentLinks.career.href} download={documentLinks.career.filename}>
              {documentLinks.career.label}
              <FileText aria-hidden />
            </a>
          </Button>
          <Button
            size="lg"
            variant="ghost"
            asChild
            className="h-11 px-5 text-sm text-hero-muted hover:bg-hero-cell hover:text-hero-foreground"
          >
            <Link href="#contact">
              연락하기
              <Mail aria-hidden />
            </Link>
          </Button>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="mt-4 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-hero-line pt-8 sm:grid-cols-4"
        >
          {profile.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <dt className="order-2 text-xs font-medium text-hero-muted">{stat.label}</dt>
              <dd className="order-1 flex items-baseline gap-0.5 text-2xl font-semibold tabular-nums sm:text-3xl">
                {stat.value}
                {stat.suffix ? (
                  <span className="text-sm font-medium text-hero-muted">{stat.suffix}</span>
                ) : null}
              </dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute inset-x-0 bottom-6 z-10 mx-auto flex w-fit items-center gap-2 text-xs text-hero-muted transition-colors hover:text-hero-foreground"
      >
        <span>스크롤</span>
        <motion.span
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="size-3.5" aria-hidden />
        </motion.span>
      </motion.a>
    </section>
  );
}
