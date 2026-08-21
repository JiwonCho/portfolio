import Link from 'next/link';

import { profile } from '@/entities/profile';
import { navItems, siteConfig } from '@/shared/config';

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-sm font-semibold">
            jiwon<span className="text-primary">.</span>cho
          </span>
          <p className="text-xs text-muted-foreground">
            {profile.role} · {profile.company} {profile.team}
          </p>
        </div>

        <nav aria-label="푸터 메뉴">
          <ul className="flex flex-wrap gap-4">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/${item.href}`}
                  className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} {siteConfig.shortName}
        </p>
      </div>
    </footer>
  );
}
