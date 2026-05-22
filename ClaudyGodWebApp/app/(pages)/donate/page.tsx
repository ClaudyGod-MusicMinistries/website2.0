import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/PageHero';
import { DonateClient } from '@/components/donate/DonateClient';

export const metadata: Metadata = {
  title: 'Donate — Support ClaudyGod Music Ministries',
  description: 'Partner with ClaudyGod Music Ministries through your generous donation. Help fund gospel music production, ministry tours, and outreach events worldwide.',
  keywords: ['donate ClaudyGod', 'support gospel ministry', 'Christian ministry donation', 'gospel music support', 'ministry partner Nigeria'],
  openGraph: {
    title: 'Support ClaudyGod Ministry — Give Today',
    description: 'Your gift helps spread the gospel through music, ministry tours, and outreach events.',
    url: '/donate',
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
      />

      <section className="bg-cream-100 section-py">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <DonateClient />
        </div>
      </section>
    </>
  );
}
