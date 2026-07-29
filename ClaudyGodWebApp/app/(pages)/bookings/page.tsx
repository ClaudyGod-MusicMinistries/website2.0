import { CONTACT_EMAIL, SITE_URL } from '@/lib/config/site';
import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/PageHero';
import { BookingForm } from '@/components/bookings/BookingForm';
import { breadcrumb, service, faqPage } from '@/lib/utils/jsonLd';
import { ArrowUpRight, CheckCircle2, Clock3, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Book ClaudyGod — Gospel Artist & Minister for Church & Events',
  description:
    'Book Minister ClaudyGod for your church service, gospel concert, university event, conference, or special ministry engagement. Available across Nigeria and internationally. Submit a booking request today.',
  keywords: [
    'book ClaudyGod',
    'hire gospel artist Nigeria',
    'book gospel minister Nigeria',
    'gospel concert booking Nigeria',
    'book ClaudyGod church event',
    'Nigerian gospel artist booking fee',
    'book worship leader Nigeria',
    'gospel minister for hire',
    'ClaudyGod event booking',
    'book gospel singer for conference',
    'gospel evangelist booking',
    'ClaudyGod booking contact',
    'gospel concert organizer Nigeria',
    'book Nigerian gospel artist UK',
    'Christian event speaker Nigeria',
  ],
  openGraph: {
    title: 'Book Minister ClaudyGod for Your Gospel Event',
    description:
      'Church services, gospel concerts, conferences & campus events — book Minister ClaudyGod for a Spirit-filled experience. Response within 3–5 business days.',
    url: '/bookings',
    images: [
      { url: '/Tour_Ph_2.webp', width: 1920, height: 1080, alt: 'Book ClaudyGod for Events' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book Minister ClaudyGod for Your Event',
    description:
      'Church services, concerts & conferences — book ClaudyGod for your next gospel event.',
    images: ['/Tour_Ph_2.webp'],
  },
  alternates: { canonical: `${SITE_URL}/bookings` },
};

const schemas = [
  breadcrumb([{ name: 'Bookings', href: '/bookings' }]),
  service(),
  faqPage([
    {
      question: 'How do I book Minister ClaudyGod for an event?',
      answer:
        'Fill out our online booking request form with your event details. Our team will respond within 3–5 business days to discuss availability and logistics.',
    },
    {
      question: 'What types of events does ClaudyGod minister at?',
      answer:
        'ClaudyGod ministers at church services, gospel concerts, university & campus events, Christian conferences, evangelistic crusades, prayer gatherings, and private ministry events.',
    },
    {
      question: 'Is ClaudyGod available for international events?',
      answer:
        'Yes. ClaudyGod is available for events across Nigeria and internationally, including the UK, US, and other countries. Contact us via the booking form for international enquiries.',
    },
    {
      question: 'How far in advance should I book?',
      answer:
        'We recommend booking at least 4–6 weeks in advance for local events and 3 months for international engagements to allow proper preparation and logistics.',
    },
    {
      question: 'What happens after I submit a booking request?',
      answer:
        'Our team reviews your submission and contacts you within 3–5 business days. We then discuss details, agree on logistics, and send a formal booking agreement to confirm the event.',
    },
  ]),
];

const steps = [
  {
    title: 'Review',
    body: 'Our team reviews your request.',
  },
  {
    title: 'Response',
    body: 'We contact you within 3–5 business days.',
  },
  {
    title: 'Confirmation',
    body: 'Approved engagements receive a formal agreement.',
  },
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
        subtitle="For church services, concerts, and ministry engagements — worldwide."
        backgroundImage="/tour_1.jpg"
        objectPosition="center center"
        className="!min-h-[38vh] !pb-10 sm:!min-h-[44vh] md:!min-h-[50vh]"
        titleClassName="!text-3xl sm:!text-4xl md:!text-4xl lg:!text-4xl xl:!text-5xl"
      />

      <section className="bg-cream-100 py-10 md:py-16 lg:py-20">
        <div className="container-site">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(19rem,0.72fr)] lg:items-start">
            {/* Form */}
            <div className="rounded-xl border border-black/[0.06] bg-white p-5 shadow-card-light-lg sm:p-8 md:p-10">
              <BookingForm />
            </div>

            {/* Steps */}
            <aside className="lg:sticky lg:top-24">
              <div className="rounded-xl bg-purple-950 p-6 text-white shadow-card md:p-7">
                <h3 className="font-display text-2xl font-semibold leading-snug text-white">
                  After you submit
                </h3>
                <div className="mt-6 space-y-0">
                  {steps.map((item, i) => (
                    <div key={item.title} className="relative flex items-start gap-4 pb-6">
                      {/* Connector line */}
                      {i < steps.length - 1 && (
                        <span className="absolute bottom-0 left-[15px] top-8 w-px bg-white/10" />
                      )}
                      <div className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10">
                        <CheckCircle2 className="h-3.5 w-3.5 text-gold-300" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{item.title}</p>
                        <p className="mt-1 text-xs leading-5 text-white/50">{item.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-3 border-t border-white/10 pt-5">
                  <Clock3 className="h-4 w-4 text-gold-300" />
                  <p className="text-xs text-white/60">
                    <strong className="block text-white">Typical response</strong>Within 3–5
                    business days
                  </p>
                </div>
              </div>

              {/* Contact card */}
              <div className="mt-4 rounded-xl border border-neutral-200 bg-white p-5">
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-purple-50 text-purple-700">
                  <Mail className="h-4 w-4" />
                </div>
                <p className="text-xs uppercase tracking-[0.14em] text-neutral-400">
                  Need assistance?
                </p>
                <p className="mt-1 font-display text-lg font-semibold text-neutral-900">
                  Speak with the booking team
                </p>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="mt-4 inline-flex items-center gap-1.5 break-all text-sm font-semibold text-purple-700 hover:text-purple-900"
                >
                  {CONTACT_EMAIL}
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
