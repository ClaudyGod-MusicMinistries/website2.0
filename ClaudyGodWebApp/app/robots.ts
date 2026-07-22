import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/config/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      /* ── General crawlers: allow full site, block private/functional paths ── */
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/dev/',
          '/store/cart',
          '/store/checkout',
          '/legal/privacy',
          '/legal/terms',
          '/legal/cookies',
        ],
      },

      /* ── Googlebot: explicitly allow all public pages + media ── */
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/_next/', '/store/checkout', '/store/cart'],
      },

      /* ── Googlebot-Image: allow all images for Google Images indexing ── */
      {
        userAgent: 'Googlebot-Image',
        allow: '/',
      },

      /* ── Bingbot ── */
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/', '/_next/', '/store/checkout'],
      },

      /* ── Social media crawlers: full access for rich link previews ── */
      {
        userAgent: 'facebookexternalhit',
        allow: '/',
      },
      {
        userAgent: 'Twitterbot',
        allow: '/',
      },
      {
        userAgent: 'LinkedInBot',
        allow: '/',
      },
      {
        userAgent: 'WhatsApp',
        allow: '/',
      },
      {
        userAgent: 'Slackbot',
        allow: '/',
      },
      {
        userAgent: 'TelegramBot',
        allow: '/',
      },

      /* ── Spotify/Apple Music: allow for streaming platform crawlers ── */
      {
        userAgent: 'Applebot',
        allow: '/',
      },

      /* ── Block AI scrapers that don't respect copyright ── */
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'CCBot', 'ai-provider-ai', 'AIBot'],
        disallow: '/',
      },
    ],

    sitemap: [
      `${SITE_URL}/sitemap.xml`,
    ],

    host: SITE_URL,
  };
}
