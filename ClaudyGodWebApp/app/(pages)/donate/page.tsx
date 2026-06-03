import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { PageHero } from '@/components/shared/PageHero';

const DonateClient = dynamic(() => import('@/components/donate/DonateClient'), { ssr: false });

export const metadata: Metadata = {
  title: 'Donate — Partner with ClaudyGod Music Ministries',
  description:
    'Support ClaudyGod Music Ministries with a generous donation. Your gift funds gospel music production, ministry tours across Nigeria and beyond, community outreach, and discipleship programmes.',
  keywords: [
    'donate ClaudyGod', 'support ClaudyGod ministry',
    'gospel ministry donation Nigeria', 'Christian ministry partner',
    'support gospel music Nigeria', 'give to gospel ministry',
    'ClaudyGod ministry partner', 'support Nigerian gospel artist',
    'gospel music production support', 'ministry outreach donation',
    'Christian giving Nigeria', 'support worship ministry',
    'sow into gospel ministry', 'faith giving Nigeria',
  ],
  openGraph: {
    title:       'Donate — Partner with ClaudyGod Music Ministries',
    description: 'Your generosity funds gospel music, ministry tours, and outreach. Partner with ClaudyGod Music Ministries today.',
    url:         '/donate',
    images: [{ url: '/ClaudySocial.jpg', width: 1200, height: 630, alt: 'Support ClaudyGod Ministry' }],
  },
  twitter: {
    card:  'summary_large_image',
    title: 'Donate — Support ClaudyGod Music Ministries',
    images:['/ClaudySocial.jpg'],
  },
  alternates: { canonical: 'https://claudygod.com/donate' },
};

export default function DonatePage() {
  return (
    <>
      <PageHero
        eyebrow="Donate"
        title="Support the Ministry"
        subtitle="Your generosity helps spread the gospel through music — every gift makes a difference."
        backgroundImage="/manBack.jpg"
        objectPosition="center top"
      />

      <section className="bg-cream-100 section-py">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <DonateClient />
        </div>
      </section>
    </>
  );
}
