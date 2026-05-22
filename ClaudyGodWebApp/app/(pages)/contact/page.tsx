import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/PageHero';
import { ContactForm } from '@/components/contact/ContactForm';
import { ContactInfo } from '@/components/contact/ContactInfo';

export const metadata: Metadata = {
  title: 'Contact ClaudyGod — Bookings & Enquiries',
  description: 'Contact ClaudyGod Music Ministries for event bookings, media enquiries, ministry collaborations, or prayer requests.',
  keywords: ['contact ClaudyGod', 'gospel artist booking', 'ministry enquiry', 'book ClaudyGod'],
  openGraph: { title: 'Contact ClaudyGod', description: 'Reach out for bookings, collaborations, or general enquiries.', url: '/contact' },
  alternates: { canonical: 'https://claudygod.com/contact' },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get in Touch"
        subtitle="Bookings, collaborations, or general inquiries — we're here."
        backgroundImage="/manBack.jpg"
      />
      <section className="bg-[#080808] section-py">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </section>
    </>
  );
}
