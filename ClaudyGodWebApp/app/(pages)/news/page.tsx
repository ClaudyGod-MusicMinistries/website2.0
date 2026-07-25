import { SITE_URL } from '@/lib/config/site';
import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/PageHero';
import { JournalSection } from '@/components/news/JournalSection';
import { StorePreview } from '@/components/home/StorePreview';
import { AnimateOnView } from '@/components/shared/AnimateOnView';
import { socialShareLinks } from '@/data/news';
import { breadcrumb } from '@/lib/utils/jsonLd';
import { FaFacebookF, FaYoutube, FaXTwitter, FaTiktok, FaSpotify, FaApple } from 'react-icons/fa6';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FaFacebookF,
  FaYoutube,
  FaXTwitter,
  FaTiktok,
  FaSpotify,
  FaApple,
};

export const metadata: Metadata = {
  title: 'News & Journal — ClaudyGod Music Ministries',
  description:
    'The latest happenings from ClaudyGod — journal entries, ministry updates, and the official store, all in one readable place.',
  keywords: [
    'ClaudyGod news',
    'ClaudyGod journal',
    'ClaudyGod blog',
    'ClaudyGod ministry update',
    'ClaudyGod latest happenings',
    'gospel ministry blog Nigeria',
    'Christian ministry news Nigeria',
  ],
  openGraph: {
    title: 'ClaudyGod News & Journal',
    description: 'The latest happenings from ClaudyGod — journal entries and ministry updates.',
    url: '/news',
    images: [{ url: '/tour_3.jpg', width: 1920, height: 1080, alt: 'ClaudyGod News & Journal' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ClaudyGod News & Journal',
    images: ['/tour_3.jpg'],
  },
  alternates: { canonical: `${SITE_URL}/news` },
};

/**
 * News is the readable, blog-driven "latest happenings" destination —
 * Journal entries plus a store teaser. Events (tour dates, tickets, past
 * ministry-outing recaps) now lives at /events; the two pages used to
 * collapse into one via a redirect, which is why they looked identical.
 */
export default async function NewsPage() {
  const schemas = [breadcrumb([{ name: 'News', href: '/news' }])];

  return (
    <>
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
      <PageHero
        eyebrow="News & Journal"
        title="Latest Happenings"
        subtitle="Journal entries and ministry updates — a readable look at what's new."
        backgroundImage="/tour_1.jpg"
        objectPosition="center center"
      />

      {/* Journal — the primary content of this page */}
      <JournalSection />

      {/* Store teaser — same component used on the homepage */}
      <AnimateOnView>
        <StorePreview />
      </AnimateOnView>

      {/* Follow */}
      <section className="bg-white py-16 border-t border-black/[0.05]">
        <div className="container-site">
          <div className="flex flex-col sm:flex-row sm:items-center gap-8 sm:gap-16">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <span className="rule-gold" />
                <span className="label-eyebrow">Follow Along</span>
              </div>
              <p className="font-display font-bold text-neutral-900 text-2xl tracking-tight">
                Stay Connected
              </p>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              {socialShareLinks.map((link) => {
                const Icon = iconMap[link.iconName];
                return Icon ? (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                    className="w-11 h-11 rounded-xl border border-neutral-200 flex items-center justify-center text-neutral-400 hover:text-purple-600 hover:border-purple-300 transition-all duration-300"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ) : null;
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
