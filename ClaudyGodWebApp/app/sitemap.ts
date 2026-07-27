import type { MetadataRoute } from 'next';
import { SITE_URL as BASE } from '@/lib/config/site';
import { releases } from '@/data/releases';

/* ── Static page routes ───────────────────────────────────────────────────── */
const staticRoutes: MetadataRoute.Sitemap = [
  { url: `${BASE}/`, priority: 1.0, changeFrequency: 'weekly', lastModified: new Date() },
  { url: `${BASE}/music`, priority: 0.95, changeFrequency: 'weekly', lastModified: new Date() },
  { url: `${BASE}/videos`, priority: 0.9, changeFrequency: 'weekly', lastModified: new Date() },
  {
    url: `${BASE}/about`,
    priority: 0.85,
    changeFrequency: 'monthly',
    lastModified: new Date('2025-01-01'),
  },
  {
    url: `${BASE}/ministry`,
    priority: 0.85,
    changeFrequency: 'monthly',
    lastModified: new Date('2025-01-01'),
  },
  { url: `${BASE}/events`, priority: 0.9, changeFrequency: 'weekly' },
  { url: `${BASE}/bookings`, priority: 0.82, changeFrequency: 'monthly' },
  { url: `${BASE}/news`, priority: 0.8, changeFrequency: 'daily', lastModified: new Date() },
  { url: `${BASE}/store`, priority: 0.75, changeFrequency: 'weekly', lastModified: new Date() },
  { url: `${BASE}/donate`, priority: 0.72, changeFrequency: 'monthly', lastModified: new Date() },
  { url: `${BASE}/prayer`, priority: 0.65, changeFrequency: 'monthly' },
  { url: `${BASE}/volunteer`, priority: 0.6, changeFrequency: 'monthly' },
  { url: `${BASE}/help`, priority: 0.45, changeFrequency: 'monthly' },
  {
    url: `${BASE}/contact`,
    priority: 0.65,
    changeFrequency: 'monthly',
    lastModified: new Date('2025-01-01'),
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticRoutes,
    ...releases.map((release) => ({
      url: `${BASE}/music/${release.slug}`,
      priority: 0.85,
      changeFrequency: 'monthly' as const,
    })),
  ];
}
