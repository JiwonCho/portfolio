import { Globe, Mail } from 'lucide-react';

import { CopyEmailButton } from '@/features/copy-email';
import { ContactForm } from '@/features/send-message';
import { socialLinks } from '@/shared/config';
import { GithubIcon, LinkedinIcon } from '@/shared/ui/brand-icons';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import { Section, SectionHeader } from '@/shared/ui/section';

const links = [
  { key: 'github', label: 'GitHub', href: socialLinks.github, icon: GithubIcon },
  { key: 'blog', label: '기술 블로그', href: socialLinks.blog, icon: Globe },
  { key: 'linkedin', label: 'LinkedIn', href: socialLinks.linkedin, icon: LinkedinIcon },
] as const;

export function ContactSection() {
  const availableLinks = links.filter((link) => link.href);

  return (
    <Section id="contact" className="bg-muted/30">
      <div className="flex flex-col gap-12">
        <SectionHeader
          eyebrow="Contact"
          title="함께 만들 이야기가 있다면 알려 주세요"
          description="포지션 제안, 기술 협업, 코드 리뷰 무엇이든 좋습니다. 폼으로 보내시거나 이메일로 바로 연락 주세요."
        />

        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          <Card>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>

          <div className="flex flex-col gap-4">
            <Card>
              <CardContent className="flex flex-col gap-3">
                <span className="text-xs font-medium text-muted-foreground">이메일</span>
                <a
                  href={`mailto:${socialLinks.email}`}
                  className="break-all text-sm font-medium underline-offset-4 hover:underline"
                >
                  {socialLinks.email}
                </a>
                <div className="flex flex-wrap gap-2">
                  <CopyEmailButton email={socialLinks.email} />
                  <Button variant="ghost" size="sm" asChild>
                    <a href={`mailto:${socialLinks.email}`}>
                      <Mail aria-hidden />
                      메일 앱 열기
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {availableLinks.length > 0 ? (
              <Card>
                <CardContent className="flex flex-col gap-2">
                  <span className="text-xs font-medium text-muted-foreground">링크</span>
                  <ul className="flex flex-col gap-1">
                    {availableLinks.map((link) => (
                      <li key={link.key}>
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                          className="w-full justify-start px-2"
                        >
                          <a href={link.href} target="_blank" rel="noreferrer noopener">
                            <link.icon aria-hidden />
                            {link.label}
                          </a>
                        </Button>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ) : null}
          </div>
        </div>
      </div>
    </Section>
  );
}
