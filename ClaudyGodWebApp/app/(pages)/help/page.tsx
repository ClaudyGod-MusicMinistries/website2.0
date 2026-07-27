import type { Metadata } from 'next';
import { HelpPageClient } from '@/components/help/HelpPageClient';
import { SITE_URL } from '@/lib/config/site';
import { breadcrumb, faqPage } from '@/lib/utils/jsonLd';
import { fallbackFAQs } from '@/data/fallback';

export const metadata: Metadata = {
  title: 'Help & FAQ',
  description:
    'Frequently asked questions and support resources for ClaudyGod Music Ministries. Get answers about bookings, events, music, volunteering, and more.',
  openGraph: {
    title: 'Help & FAQ - ClaudyGod Music Ministries',
    description:
      'Support center with answers to common questions about our music, events, bookings, and services.',
    url: '/help',
    images: [
      {
        url: '/ClaudySocial-wide.png',
        width: 1730,
        height: 909,
        alt: 'ClaudyGod help and frequently asked questions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Help & FAQ — ClaudyGod Music Ministries',
    description:
      'Answers about ClaudyGod music, events, bookings, volunteering, donations, and the official store.',
    images: ['/ClaudySocial-wide.png'],
  },
  alternates: { canonical: `${SITE_URL}/help` },
};

export default function HelpPage() {
  const schemas = [
    breadcrumb([{ name: 'Help & FAQ', href: '/help' }]),
    faqPage(fallbackFAQs.map(({ question, answer }) => ({ question, answer }))),
  ];
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <HelpPageClient />
    </>
  );
}
