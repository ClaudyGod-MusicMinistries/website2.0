import { socialLinks } from '@/data/socials';
import { Mail, MapPin } from 'lucide-react';

export function ContactInfo() {
  return (
    <div className="lg:pt-2">
      <div className="mb-10">
        <p className="font-bricolage font-bold text-neutral-900 text-2xl tracking-tight leading-snug mb-4">
          Let&apos;s Connect
        </p>
        <p className="font-raleway text-neutral-500 text-sm leading-relaxed font-light">
          Whether you want to book for an event, collaborate on a project, or simply reach out —
          we&apos;d love to hear from you. Fill out the form and we&apos;ll respond within 2–3
          business days.
        </p>
      </div>

      <div className="space-y-5 mb-10">
        <div className="flex items-start gap-4">
          <Mail className="h-3.5 w-3.5 text-gold-400/60 mt-0.5 shrink-0" />
          <div>
            <p className="font-worksans text-[0.48rem] tracking-[0.18em] uppercase text-neutral-600 mb-1">
              Email
            </p>
            <a
              href="mailto:info@claudygod.com"
              className="font-raleway text-sm text-neutral-600 hover:text-purple-600 transition-colors duration-300"
            >
              info@claudygod.com
            </a>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <MapPin className="h-3.5 w-3.5 text-gold-400/60 mt-0.5 shrink-0" />
          <div>
            <p className="font-worksans text-[0.48rem] tracking-[0.18em] uppercase text-neutral-600 mb-1">
              Based in
            </p>
            <p className="font-raleway text-sm text-neutral-600 font-light">California, USA</p>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-100 pt-8">
        <p className="font-worksans text-[0.48rem] tracking-[0.18em] uppercase text-neutral-600 mb-4">
          Follow the Ministry
        </p>
        <div className="flex items-center gap-4">
          {socialLinks.map((s) => {
            const Icon = s.icon;
            return (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="text-neutral-400 hover:text-purple-600 transition-colors duration-300"
              >
                <Icon className="h-3.5 w-3.5" />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
