'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Expand } from 'lucide-react';

import type { ProjectImage } from '@/entities/project';
import { cn } from '@/shared/lib';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';

function GalleryItem({ image, index }: { image: ProjectImage; index: number }) {
  const isTall = image.ratio === 'tall';

  return (
    <motion.figure
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className={cn('flex flex-col gap-2', isTall ? 'sm:col-span-1' : 'sm:col-span-2')}
    >
      <Dialog>
        <DialogTrigger asChild>
          <button
            type="button"
            className="group relative block w-full overflow-hidden rounded-lg border border-border bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            aria-label={`${image.alt} — 크게 보기`}
          >
            <div className={cn('relative w-full', isTall ? 'aspect-[9/16]' : 'aspect-video')}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes={isTall ? '(min-width: 640px) 33vw, 100vw' : '(min-width: 640px) 66vw, 100vw'}
                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
            <span
              aria-hidden
              className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-md bg-background/80 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
            >
              <Expand className="size-3.5" />
            </span>
          </button>
        </DialogTrigger>

        <DialogContent className="max-w-5xl p-2 sm:p-3">
          <DialogTitle className="sr-only">{image.alt}</DialogTitle>
          {image.caption ? (
            <DialogDescription className="sr-only">{image.caption}</DialogDescription>
          ) : null}
          <div className="relative max-h-[80svh] w-full overflow-auto rounded-md">
            <Image
              src={image.src}
              alt={image.alt}
              width={1920}
              height={1080}
              sizes="(min-width: 1024px) 80vw, 100vw"
              className="h-auto w-full rounded-md object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>

      {image.caption ? (
        <figcaption className="text-balance-ko text-xs leading-relaxed text-muted-foreground">
          {image.caption}
        </figcaption>
      ) : null}
    </motion.figure>
  );
}

export function ProjectGallery({ images }: { images: ProjectImage[] }) {
  if (images.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {images.map((image, index) => (
        <GalleryItem key={image.src} image={image} index={index} />
      ))}
    </div>
  );
}
