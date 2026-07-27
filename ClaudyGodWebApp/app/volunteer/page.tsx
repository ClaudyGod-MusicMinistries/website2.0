import { Metadata } from 'next';
import { Target, TrendingUp, Users, Compass } from 'lucide-react';
import { PageHero } from '@/components/shared/PageHero';
import { VolunteerForm } from '@/components/volunteer/VolunteerForm';
import { SITE_URL } from '@/lib/config/site';
import { breadcrumb } from '@/lib/utils/jsonLd';

export const metadata: Metadata = {
  title: 'Volunteer with ClaudyGod Music Ministries',
  description:
    'Apply to serve with ClaudyGod Music Ministries in media, music, hospitality, event support, and other ministry volunteer roles.',
  alternates: { canonical: `${SITE_URL}/volunteer` },
  openGraph: {
    title: 'Volunteer with ClaudyGod Music Ministries',
    description:
      'Use your gifts to support gospel music, worship gatherings, outreach, and ministry events.',
    url: '/volunteer',
    images: [
      {
        url: '/ClaudySocial-wide.png',
        width: 1730,
        height: 909,
        alt: 'Volunteer with ClaudyGod Music Ministries',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Volunteer with ClaudyGod Music Ministries',
    description: 'Apply to serve in music, media, hospitality, and ministry event support.',
    images: ['/ClaudySocial-wide.png'],
  },
};

const reasons = [
  {
    icon: Target,
    title: 'Make an Impact',
    body: 'Directly contribute to our mission of spreading faith and community connection.',
  },
  {
    icon: TrendingUp,
    title: 'Grow Your Skills',
    body: 'Develop new talents and gain experience in a supportive environment.',
  },
  {
    icon: Users,
    title: 'Build Community',
    body: 'Connect with like-minded individuals and form meaningful relationships.',
  },
  {
    icon: Compass,
    title: 'Find Purpose',
    body: "Be part of something greater and make a difference in people's lives.",
  },
];

export default function VolunteerPage() {
  const schema = breadcrumb([{ name: 'Volunteer', href: '/volunteer' }]);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <PageHero
        eyebrow="Volunteer"
        title="Volunteer With Us"
        subtitle="Join our team and help us spread the message of faith, music, and community."
      />

      <section className="bg-cream-100 section-py">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Form */}
            <div className="bg-white rounded-xl shadow-card-light-hover border border-black/[0.04] p-8 md:p-10">
              <div className="flex items-center gap-4 mb-8">
                <span className="rule-gold" />
                <span className="label-eyebrow">Application</span>
              </div>
              <VolunteerForm />
            </div>

            {/* Why volunteer */}
            <div className="lg:pt-4">
              <div className="flex items-center gap-4 mb-6">
                <span className="rule-gold" />
                <span className="label-eyebrow">Why Volunteer</span>
              </div>
              <h3 className="font-raleway font-light text-neutral-900 text-2xl md:text-3xl tracking-normal leading-snug mb-10">
                Serve With Purpose
              </h3>
              <div className="space-y-6">
                {reasons.map(({ icon: Icon, title, body }) => (
                  <div key={title} className="flex gap-5 items-start">
                    <div className="w-10 h-10 rounded-full bg-purple-600/10 border border-purple-500/15 flex items-center justify-center shrink-0">
                      <Icon className="h-4 w-4 text-purple-600" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-display font-bold text-neutral-900 text-base mb-1">
                        {title}
                      </p>
                      <p className="font-sans text-neutral-500 text-sm leading-relaxed">{body}</p>
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
