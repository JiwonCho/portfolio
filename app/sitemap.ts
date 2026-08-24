import type { MetadataRoute } from 'next';

import { projects } from '@/entities/project';
import { siteConfig } from '@/shared/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: siteConfig.url, lastModified, changeFrequency: 'monthly', priority: 1 },
    {
      url: `${siteConfig.url}/contact`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    ...projects.map((project) => ({
      url: `${siteConfig.url}/projects/${project.slug}`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
  ];
}
