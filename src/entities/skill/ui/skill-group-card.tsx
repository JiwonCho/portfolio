import { Badge } from '@/shared/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { cn } from '@/shared/lib';

import type { SkillGroup } from '../model/types';

export function SkillGroupCard({ group, className }: { group: SkillGroup; className?: string }) {
  return (
    <Card className={cn('h-full', className)}>
      <CardHeader>
        <CardTitle className="text-base">{group.label}</CardTitle>
        {group.description ? (
          <CardDescription className="text-balance-ko">{group.description}</CardDescription>
        ) : null}
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <ul className="flex flex-wrap gap-1.5">
          {group.skills.map((skill) => (
            <li key={skill.name}>
              <Badge variant={skill.primary ? 'default' : 'outline'} className="font-normal">
                {skill.name}
              </Badge>
            </li>
          ))}
        </ul>
        <ul className="flex flex-col gap-1.5 text-xs leading-relaxed text-muted-foreground">
          {group.skills
            .filter((skill) => skill.note)
            .map((skill) => (
              <li key={skill.name} className="text-balance-ko">
                <span className="font-medium text-foreground">{skill.name}</span> — {skill.note}
              </li>
            ))}
        </ul>
      </CardContent>
    </Card>
  );
}
