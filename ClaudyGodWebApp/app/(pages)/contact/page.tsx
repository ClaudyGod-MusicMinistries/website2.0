import type { Metadata } from 'next';
import { PageHero }    from '@/components/shared/PageHero';
import { ContactForm } from '@/components/contact/ContactForm';
import { ContactInfo } from '@/components/contact/ContactInfo';
import { breadcrumb, faqPage } from '@/utils/jsonLd';

export const metadata: Metadata = {
  title: 'Contact ClaudyGod — Bookings, Collaborations & Ministry Enquiries',
  description:
    'Contact ClaudyGod Music Ministries for event bookings, media interviews, ministry collaborations, gospel music partnerships, or prayer requests. We respond within 1–3 business days.',
  keywords: [
    'contact ClaudyGod', 'ClaudyGod contact email', 'ClaudyGod booking enquiry',
    'gospel artist contact Nigeria', 'ClaudyGod collaboration',
    'ClaudyGod media interview request', 'gospel ministry contact',
    'Christian artist collaboration Nigeria', 'ClaudyGod prayer request',
    'gospel music partnership', 'book ClaudyGod email',
    'ClaudyGod ministry contact', 'Nigerian gospel artist email',
  ],
  openGraph: {
    title:       'Contact ClaudyGod Music Ministries',
    description: 'Bookings, collaborations, media enquiries & more — get in touch with ClaudyGod Music Ministries.',
    url:         '/contact',
    images: [{ url: '/manBack.jpg', width: 1920, height: 1280, alt: 'Contact ClaudyGod' }],
  },
  twitter: {
    card:  'summary_large_image',
    title: 'Contact ClaudyGod Music Ministries',
    images:['/manBack.jpg'],
  },
  alternates: { canonical: 'https://claudygod.com/contact' },
};

const schemas = [
  breadcrumb([{ name: 'Contact', href: '/contact' }]),
  faqPage([
    {
      question: 'How can I contact ClaudyGod for a booking?',
      answer:   'You can submit a booking request through our Bookings page or send a general enquiry via our Contact form. We respond within 1–3 business days.',
    },
    {
      question: 'How do I request a media interview with ClaudyGod?',
      answer:   'Use the contact form on this page, select "Media Enquiry" as the subject, and provide your media outlet details. Our team will review and respond promptly.',
    },
    {
      question: 'Can I collaborate with ClaudyGod on a gospel music project?',
      answer:   "We welcome collaboration requests from gospel artists, producers, and ministries. Please reach out through the contact form with details about your project.",
    },
    {
      question: 'How quickly will I receive a response?',
      answer:   'Our team typically responds within 1–3 business days for general enquiries. For urgent bookings, please indicate the event date in your message.',
    },
  ]),
];

export default function ContactPage() {
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <PageHero
        eyebrow="Contact"
        title="Get in Touch"
        subtitle="Bookings, collaborations, or general inquiries — we're here."
        backgroundImage="/manBack.jpg"
        objectPosition="center top"
      />
      <section className="bg-white section-py">
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
