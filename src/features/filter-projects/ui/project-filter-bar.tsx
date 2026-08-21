'use client';

import { RotateCcw, Star } from 'lucide-react';

import { PROJECT_BRANDS, PROJECT_CATEGORIES } from '@/entities/project';
import { cn } from '@/shared/lib';
import { useAppDispatch, useAppSelector } from '@/shared/store';
import { Button } from '@/shared/ui/button';
import { Separator } from '@/shared/ui/separator';

import {
  brandSelected,
  categorySelected,
  featuredOnlyToggled,
  filtersReset,
  selectBrand,
  selectCategory,
  selectFeaturedOnly,
  selectHasActiveFilter,
} from '../model/project-filter.slice';

export function ProjectFilterBar({ resultCount }: { resultCount: number }) {
  const dispatch = useAppDispatch();
  const category = useAppSelector(selectCategory);
  const brand = useAppSelector(selectBrand);
  const featuredOnly = useAppSelector(selectFeaturedOnly);
  const hasActiveFilter = useAppSelector(selectHasActiveFilter);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-muted-foreground">영역</span>
        <ul className="flex flex-wrap gap-1.5">
          {PROJECT_CATEGORIES.map((item) => (
            <li key={item.id}>
              <Button
                variant={category === item.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => dispatch(categorySelected(item.id))}
                aria-pressed={category === item.id}
              >
                {item.label}
              </Button>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-muted-foreground">서비스</span>
        <ul className="flex flex-wrap gap-1.5">
          {PROJECT_BRANDS.map((item) => (
            <li key={item.id}>
              <Button
                variant={brand === item.id ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => dispatch(brandSelected(item.id))}
                aria-pressed={brand === item.id}
              >
                {item.label}
              </Button>
            </li>
          ))}
        </ul>
      </div>

      <Separator />

      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant={featuredOnly ? 'default' : 'outline'}
          size="sm"
          onClick={() => dispatch(featuredOnlyToggled())}
          aria-pressed={featuredOnly}
        >
          <Star className={cn(featuredOnly && 'fill-current')} aria-hidden />
          대표 프로젝트만
        </Button>

        {hasActiveFilter ? (
          <Button variant="ghost" size="sm" onClick={() => dispatch(filtersReset())}>
            <RotateCcw aria-hidden />
            초기화
          </Button>
        ) : null}

        <span className="ml-auto text-sm tabular-nums text-muted-foreground">
          {resultCount}건
        </span>
      </div>
    </div>
  );
}
