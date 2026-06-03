import type { MetadataRoute } from 'next';

const BASE = 'https://claudygod.com';

/* ── Static page routes ───────────────────────────────────────────────────── */
const staticRoutes: MetadataRoute.Sitemap = [
  { url: `${BASE}/`,         priority: 1.00, changeFrequency: 'weekly',  lastModified: new Date() },
  { url: `${BASE}/music`,    priority: 0.95, changeFrequency: 'weekly',  lastModified: new Date() },
  { url: `${BASE}/videos`,   priority: 0.90, changeFrequency: 'weekly',  lastModified: new Date() },
  { url: `${BASE}/about`,    priority: 0.85, changeFrequency: 'monthly', lastModified: new Date('2025-01-01') },
  { url: `${BASE}/ministry`, priority: 0.85, changeFrequency: 'monthly', lastModified: new Date('2025-01-01') },
  { url: `${BASE}/bookings`, priority: 0.82, changeFrequency: 'monthly', lastModified: new Date() },
  { url: `${BASE}/news`,     priority: 0.80, changeFrequency: 'daily',   lastModified: new Date() },
  { url: `${BASE}/blog`,     priority: 0.75, changeFrequency: 'weekly',  lastModified: new Date() },
  { url: `${BASE}/store`,    priority: 0.75, changeFrequency: 'weekly',  lastModified: new Date() },
  { url: `${BASE}/donate`,   priority: 0.72, changeFrequency: 'monthly', lastModified: new Date() },
  { url: `${BASE}/contact`,  priority: 0.65, changeFrequency: 'monthly', lastModified: new Date('2025-01-01') },
];

/* ── Album / music release pages (deep links for rich results) ──────────── */
const musicRoutes: MetadataRoute.Sitemap = [
  {
    url: `${BASE}/music#you-are-our-everything`,
    priority: 0.88,
    changeFrequency: 'monthly',
    lastModified: new Date('2024-11-01'),
  },
  {
    url: `${BASE}/music#very-glorious`,
    priority: 0.86,
    changeFrequency: 'monthly',
    lastModified: new Date('2024-01-01'),
  },
  {
    url: `${BASE}/music#we-would-reign`,
    priority: 0.84,
    changeFrequency: 'monthly',
    lastModified: new Date('2023-01-01'),
  },
  {
    url: `${BASE}/music#lover-of-my-soul`,
    priority: 0.82,
    changeFrequency: 'monthly',
    lastModified: new Date('2023-01-01'),
  },
];

/* ── Store product routes ─────────────────────────────────────────────────── */
const storeRoutes: MetadataRoute.Sitemap = [
  {
    url: `${BASE}/store#merchandise`,
    priority: 0.70,
    changeFrequency: 'weekly',
    lastModified: new Date(),
  },
];

/* ── Legal (lower priority, no-index friendly) ───────────────────────────── */
const legalRoutes: MetadataRoute.Sitemap = [
  { url: `${BASE}/legal/privacy`, priority: 0.20, changeFrequency: 'yearly', lastModified: new Date('2025-01-01') },
  { url: `${BASE}/legal/terms`,   priority: 0.20, changeFrequency: 'yearly', lastModified: new Date('2025-01-01') },
  { url: `${BASE}/legal/cookies`, priority: 0.20, changeFrequency: 'yearly', lastModified: new Date('2025-01-01') },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticRoutes,
    ...musicRoutes,
    ...storeRoutes,
    ...legalRoutes,
  ];
}
