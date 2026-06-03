import type { Metadata } from 'next';
import { PageHero }    from '@/components/shared/PageHero';
import { BookingForm } from '@/components/bookings/BookingForm';
import { breadcrumb, service, faqPage } from '@/utils/jsonLd';

export const metadata: Metadata = {
  title: 'Book ClaudyGod — Gospel Artist & Minister for Church & Events',
  description:
    'Book Minister ClaudyGod for your church service, gospel concert, university event, conference, or special ministry engagement. Available across Nigeria and internationally. Submit a booking request today.',
  keywords: [
    'book ClaudyGod', 'hire gospel artist Nigeria', 'book gospel minister Nigeria',
    'gospel concert booking Nigeria', 'book ClaudyGod church event',
    'Nigerian gospel artist booking fee', 'book worship leader Nigeria',
    'gospel minister for hire', 'ClaudyGod event booking',
    'book gospel singer for conference', 'gospel evangelist booking',
    'ClaudyGod booking contact', 'gospel concert organizer Nigeria',
    'book Nigerian gospel artist UK', 'Christian event speaker Nigeria',
  ],
  openGraph: {
    title:       'Book Minister ClaudyGod for Your Gospel Event',
    description: 'Church services, gospel concerts, conferences & campus events — book Minister ClaudyGod for a Spirit-filled experience. Response within 3–5 business days.',
    url:         '/bookings',
    images: [{ url: '/Tour_Ph_2.webp', width: 1920, height: 1080, alt: 'Book ClaudyGod for Events' }],
  },
  twitter: {
    card:        'summary_large_image',
    title:       'Book Minister ClaudyGod for Your Event',
    description: 'Church services, concerts & conferences — book ClaudyGod for your next gospel event.',
    images:      ['/Tour_Ph_2.webp'],
  },
  alternates: { canonical: 'https://claudygod.com/bookings' },
};

const schemas = [
  breadcrumb([{ name: 'Bookings', href: '/bookings' }]),
  service(),
  faqPage([
    {
      question: 'How do I book Minister ClaudyGod for an event?',
      answer:   'Fill out our online booking request form with your event details. Our team will respond within 3–5 business days to discuss availability and logistics.',
    },
    {
      question: 'What types of events does ClaudyGod minister at?',
      answer:   'ClaudyGod ministers at church services, gospel concerts, university & campus events, Christian conferences, evangelistic crusades, prayer gatherings, and private ministry events.',
    },
    {
      question: 'Is ClaudyGod available for international events?',
      answer:   'Yes. ClaudyGod is available for events across Nigeria and internationally, including the UK, US, and other countries. Contact us via the booking form for international enquiries.',
    },
    {
      question: 'How far in advance should I book?',
      answer:   'We recommend booking at least 4–6 weeks in advance for local events and 3 months for international engagements to allow proper preparation and logistics.',
    },
    {
      question: 'What happens after I submit a booking request?',
      answer:   'Our team reviews your submission and contacts you within 3–5 business days. We then discuss details, agree on logistics, and send a formal booking agreement to confirm the event.',
    },
  ]),
];

const steps = [
  { step: '01', title: 'Submit Request',  body: 'Fill out the booking form with your event details.' },
  { step: '02', title: 'Review & Confirm', body: 'Our team reviews your request and contacts you within 3–5 business days.' },
  { step: '03', title: 'Agreement',        body: 'A booking agreement is shared and signed before the event is confirmed.' },
  { step: '04', title: 'Preparation',      body: 'We coordinate logistics, sound requirements, and set list details.' },
];

export default function BookingsPage() {
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
        eyebrow="Bookings"
        title="Book ClaudyGod"
        subtitle="Fill out the form below and our team will contact you within 3–5 business days to confirm details."
        backgroundImage="/tour_1.jpg"
        objectPosition="center center"
      />

      <section className="bg-cream-100 section-py">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

            {/* Form */}
            <div className="bg-white rounded-2xl shadow-[0_4px_32px_rgba(0,0,0,0.07)] border border-black/[0.04] p-8 md:p-10">
              <div className="flex items-center gap-4 mb-8">
                <span className="rule-gold" />
                <span className="label-eyebrow">Booking Request</span>
              </div>
              <BookingForm />
            </div>

            {/* Steps */}
            <div className="lg:pt-4">
              <div className="flex items-center gap-4 mb-6">
                <span className="rule-gold" />
                <span className="label-eyebrow">How It Works</span>
              </div>
              <h3 className="font-bricolage font-bold text-neutral-900 text-2xl md:text-3xl tracking-tight leading-snug mb-10">
                What to Expect
              </h3>
              <div className="space-y-0">
                {steps.map((item, i) => (
                  <div key={item.step} className="flex gap-5 items-start pb-8 relative">
                    {/* Connector line */}
                    {i < steps.length - 1 && (
                      <span className="absolute left-5 top-10 bottom-0 w-px bg-neutral-200" />
                    )}
                    <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center shrink-0 z-10">
                      <span className="font-worksans text-[0.55rem] tracking-[0.15em] text-white font-semibold">{item.step}</span>
                    </div>
                    <div className="pt-1.5">
                      <p className="font-bricolage font-bold text-neutral-900 text-base mb-1">{item.title}</p>
                      <p className="font-roboto text-neutral-500 text-sm leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact card */}
              <div className="mt-6 bg-white rounded-2xl border border-neutral-200 p-6">
                <p className="font-worksans text-xs tracking-[0.12em] uppercase text-neutral-400 mb-1">Questions?</p>
                <p className="font-bricolage font-bold text-neutral-900 text-lg mb-3">Contact Us Directly</p>
                <a
                  href="mailto:claudygodministries@gmail.com"
                  className="font-roboto text-purple-600 hover:text-purple-800 text-sm transition-colors"
                >
                  claudygodministries@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
