import Link from 'next/link';
import { Mic, Mic2, Camera, Users, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import { buttonVariants } from '@/lib/theme/buttons';
import { AmbientGlow } from '@/components/ui';
import { cn } from '@/lib/utils/cn';

const roles = [
  { icon: Mic,         label: 'Worship / Vocals', desc: 'Lead & worship singers' },
  { icon: Mic2,        label: 'Backup Vocals',    desc: 'Harmony & background singers' },
  { icon: Camera,      label: 'Media & Tech',     desc: 'Video, audio & photography' },
  { icon: Users,       label: 'Protocol Team',    desc: 'Ushers & hospitality' },
  { icon: ShieldCheck, label: 'Security',         desc: 'Safety & crowd management' },
  { icon: Sparkles,    label: 'Other',            desc: 'Any other area of service' },
] as const;

/**
 * Slim CTA — the full application form lives once, at /volunteer
 * (components/volunteer/VolunteerForm.tsx). This used to duplicate that
 * entire form inline; that's real work happening in two places that can
 * drift out of sync, so the Ministry page now points to the one canonical
 * form instead of maintaining a second copy.
 */
export function VolunteerCTA() {
  return (
    <section className="relative bg-surface-deep overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <AmbientGlow color="purple" size={500} opacity={0.12} animate={false} className="-top-[200px] -left-[200px]" />
        <AmbientGlow color="gold" size={400} opacity={0.06} animate={false} className="-bottom-[150px] -right-[150px]" />
      </div>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

      <div className="relative container-site py-16 md:py-24">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <div className="flex items-center gap-4 mb-5 justify-center">
            <span className="block w-8 h-px bg-gold-500 opacity-70" />
            <span className="label-eyebrow">Get Involved</span>
          </div>
          <h2 className="font-display font-bold text-white text-2xl md:text-3xl tracking-tight leading-tight mb-4">
            Serve With the Ministry
          </h2>
          <p className="font-sans text-neutral-400 text-sm leading-relaxed">
            Every gift matters. Join a team of passionate believers advancing the Kingdom
            through music, media, and community outreach.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-3xl mx-auto mb-10">
          {roles.map(({ icon: Icon, label, desc }) => (
            <div
              key={label}
              className="flex flex-col gap-2 p-4 rounded-xl border border-white/[0.07] bg-white/[0.03]"
            >
              <Icon className="h-4 w-4 text-neutral-500" />
              <p className="font-display font-semibold text-sm text-white/80">{label}</p>
              <p className="font-sans text-neutral-600 text-xs">{desc}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Link
            href="/volunteer"
            className={cn(buttonVariants({ variant: 'primary', size: 'lg', uppercase: true }), 'group shadow-gold-cta hover:shadow-gold-cta-hover')}
          >
            Apply to Volunteer
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
    </section>
  );
}
