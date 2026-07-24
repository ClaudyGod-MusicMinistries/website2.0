import { Metadata } from 'next';
import { Target, TrendingUp, Users, Compass } from 'lucide-react';
import { PageHero } from '@/components/shared/PageHero';
import { VolunteerForm } from '@/components/volunteer/VolunteerForm';

export const metadata: Metadata = {
  title: 'Volunteer | ClaudyGod Ministry',
  description: 'Join our volunteer team and make a difference in our community.',
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
  return (
    <>
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
