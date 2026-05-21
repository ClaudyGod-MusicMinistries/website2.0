import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/PageHero';
import { ContactForm } from '@/components/contact/ContactForm';
import { ContactInfo } from '@/components/contact/ContactInfo';

export const metadata: Metadata = {
  title: 'Contact — ClaudyGod Music Ministries',
  description: 'Get in touch with ClaudyGod Music Ministries for bookings, collaborations, or general inquiries.',
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get in Touch"
        subtitle="Bookings, collaborations, or general inquiries — we're here."
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
