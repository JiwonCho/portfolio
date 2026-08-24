'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { Menu } from 'lucide-react';

import { ThemeToggle } from '@/features/toggle-theme';
import { navItems, sectionIds, socialLinks } from '@/shared/config';
import { cn, useActiveSection } from '@/shared/lib';
import { GithubIcon } from '@/shared/ui/brand-icons';
import { Button } from '@/shared/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui/sheet';

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const activeId = useActiveSection(sectionIds);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 24);
  });

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        isScrolled ? 'border-b border-border bg-background/80 backdrop-blur-md' : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-6">
        <Link
          href="/#hero"
          className="font-mono text-sm font-semibold tracking-tight"
          aria-label="홈으로"
        >
          jiwon<span className="text-primary">.</span>cho
        </Link>

        <nav aria-label="주요 섹션" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/${item.href}`}
                  aria-current={activeId === item.id ? 'true' : undefined}
                  className={cn(
                    'relative rounded-md px-3 py-2 text-sm transition-colors',
                    activeId === item.id
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {item.label}
                  {activeId === item.id ? (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-2 -bottom-px h-px bg-primary"
                      transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                    />
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" asChild aria-label="GitHub 프로필">
            <a href={socialLinks.github} target="_blank" rel="noreferrer noopener">
              <GithubIcon />
            </a>
          </Button>
          <ThemeToggle />

          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="메뉴 열기">
                <Menu aria-hidden />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <SheetHeader>
                <SheetTitle>메뉴</SheetTitle>
              </SheetHeader>
              <nav aria-label="모바일 메뉴" className="px-4">
                <ul className="flex flex-col gap-1">
                  {navItems.map((item) => (
                    <li key={item.id}>
                      <SheetClose asChild>
                        <Link
                          href={`/${item.href}`}
                          className={cn(
                            'block rounded-md px-3 py-2.5 text-sm transition-colors hover:bg-muted',
                            activeId === item.id && 'bg-muted font-medium',
                          )}
                        >
                          {item.label}
                        </Link>
                      </SheetClose>
                    </li>
                  ))}
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
