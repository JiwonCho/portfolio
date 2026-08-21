'use client';

import { motion, type Variants } from 'framer-motion';

import { cn, usePrefersReducedMotion } from '@/shared/lib';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    transition: { staggerChildren: 0.028, delayChildren: delay },
  }),
};

const letterVariants: Variants = {
  hidden: { opacity: 0, y: 42, rotateX: -45 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { type: 'spring', damping: 14, stiffness: 120 },
  },
};

interface TextRevealProps {
  text: string;
  className?: string;
  /** 애니메이션 시작 지연(초) */
  delay?: number;
  as?: 'span' | 'div';
}

/**
 * 글자 단위 리빌 애니메이션.
 * 낱글자를 span 으로 쪼개면 스크린리더가 한 글자씩 읽으므로,
 * 컨테이너에 aria-label 을 두고 조각들은 aria-hidden 으로 감춘다.
 * 단어 단위로 한 번 더 감싸 줄바꿈이 단어 경계에서만 일어나게 한다.
 */
export function TextReveal({ text, className, delay = 0, as = 'span' }: TextRevealProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const words = text.split(' ');

  if (prefersReducedMotion) {
    return <span className={className}>{text}</span>;
  }

  const MotionTag = as === 'div' ? motion.div : motion.span;

  return (
    <MotionTag
      className={cn('inline-flex flex-wrap', className)}
      variants={containerVariants}
      custom={delay}
      initial="hidden"
      animate="visible"
      aria-label={text}
      style={{ perspective: 600 }}
    >
      {words.map((word, wordIndex) => (
        <span key={`${word}-${wordIndex}`} className="inline-flex whitespace-nowrap" aria-hidden>
          {Array.from(word).map((letter, letterIndex) => (
            <motion.span
              key={`${letter}-${letterIndex}`}
              variants={letterVariants}
              className="inline-block will-change-transform"
            >
              {letter}
            </motion.span>
          ))}
          {wordIndex < words.length - 1 ? (
            <motion.span variants={letterVariants} className="inline-block">
              &nbsp;
            </motion.span>
          ) : null}
        </span>
      ))}
    </MotionTag>
  );
}
