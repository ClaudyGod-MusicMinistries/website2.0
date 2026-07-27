import { Metadata } from 'next';
import { PageHero } from '@/components/shared/PageHero';
import { PrayerRequestForm } from '@/components/prayer/PrayerRequestForm';
import { SITE_URL } from '@/lib/config/site';
import { breadcrumb } from '@/lib/utils/jsonLd';

export const metadata: Metadata = {
  title: 'Submit a Private Prayer Request',
  description:
    'Share your prayer request with our ministry team — we believe in the power of prayer and will intercede for you.',
  alternates: { canonical: `${SITE_URL}/prayer` },
  openGraph: {
    title: 'Submit a Prayer Request — ClaudyGod Music Ministries',
    description: 'Share a private prayer request with the ClaudyGod ministry prayer team.',
    url: '/prayer',
    images: [
      {
        url: '/ClaudySocial-wide.png',
        width: 1730,
        height: 909,
        alt: 'Prayer support from ClaudyGod Music Ministries',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Submit a Prayer Request — ClaudyGod Music Ministries',
    description: 'Share a private prayer request with the ministry prayer team.',
    images: ['/ClaudySocial-wide.png'],
  },
};

const steps = [
  {
    step: '01',
    title: 'We Receive It',
    body: 'Your request goes directly to our prayer team — no public posting, ever.',
  },
  {
    step: '02',
    title: 'We Confirm By Email',
    body: "You'll receive an email confirming your request has been received.",
  },
  {
    step: '03',
    title: 'We Intercede',
    body: 'Our team commits to praying over every request submitted through this form.',
  },
  {
    step: '04',
    title: 'Your Privacy Matters',
    body: 'Mark a request confidential to keep it between you and the prayer team.',
  },
];

export default function PrayerPage() {
  const schema = breadcrumb([{ name: 'Prayer Request', href: '/prayer' }]);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <PageHero
        eyebrow="Prayer"
        title="Prayer Requests"
        subtitle="We believe in the power of prayer — share what's on your heart."
      />

      <section className="bg-cream-100 section-py">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Form */}
            <div className="bg-white rounded-xl shadow-card-light-hover border border-black/[0.04] p-8 md:p-10">
              <div className="flex items-center gap-4 mb-8">
                <span className="rule-gold" />
                <span className="label-eyebrow">Share Your Request</span>
              </div>
              <PrayerRequestForm />
            </div>

            {/* Steps */}
            <div className="lg:pt-4">
              <div className="flex items-center gap-4 mb-6">
                <span className="rule-gold" />
                <span className="label-eyebrow">How It Works</span>
              </div>
              <h3 className="font-raleway font-light text-neutral-900 text-2xl md:text-3xl tracking-normal leading-snug mb-10">
                What Happens Next?
              </h3>
              <div className="space-y-0">
                {steps.map((item, i) => (
                  <div key={item.step} className="flex gap-5 items-start pb-8 relative">
                    {i < steps.length - 1 && (
                      <span className="absolute left-5 top-10 bottom-0 w-px bg-neutral-200" />
                    )}
                    <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center shrink-0 z-10">
                      <span className="font-sans text-[0.55rem] tracking-[0.15em] text-white font-semibold">
                        {item.step}
                      </span>
                    </div>
                    <div className="pt-1.5">
                      <p className="font-display font-bold text-neutral-900 text-base mb-1">
                        {item.title}
                      </p>
                      <p className="font-sans text-neutral-500 text-sm leading-relaxed">
                        {item.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
