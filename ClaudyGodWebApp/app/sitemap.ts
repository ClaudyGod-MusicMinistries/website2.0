import type { MetadataRoute } from 'next';

const BASE = 'https://claudygod.com';

// Static priority map
const routes: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }> = [
  { path: '/',          priority: 1.0,  changeFrequency: 'weekly'  },
  { path: '/music',     priority: 0.95, changeFrequency: 'weekly'  },
  { path: '/videos',    priority: 0.90, changeFrequency: 'weekly'  },
  { path: '/about',     priority: 0.85, changeFrequency: 'monthly' },
  { path: '/ministry',  priority: 0.85, changeFrequency: 'monthly' },
  { path: '/bookings',  priority: 0.80, changeFrequency: 'monthly' },
  { path: '/store',     priority: 0.75, changeFrequency: 'weekly'  },
  { path: '/donate',    priority: 0.75, changeFrequency: 'monthly' },
  { path: '/news',      priority: 0.75, changeFrequency: 'daily'   },
  { path: '/blog',      priority: 0.70, changeFrequency: 'weekly'  },
  { path: '/contact',   priority: 0.65, changeFrequency: 'monthly' },
  { path: '/legal/privacy', priority: 0.30, changeFrequency: 'yearly' },
  { path: '/legal/terms',   priority: 0.30, changeFrequency: 'yearly' },
  { path: '/legal/cookies', priority: 0.30, changeFrequency: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
