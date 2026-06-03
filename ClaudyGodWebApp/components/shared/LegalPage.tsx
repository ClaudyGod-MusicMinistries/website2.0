import Link from 'next/link';
import { Scale, ShieldCheck, Cookie, ArrowLeft } from 'lucide-react';

interface LegalSection {
  heading: string;
  body: string;
}

interface LegalPageProps {
  title: string;
  lastUpdated: string;
  intro?: string;
  sections: LegalSection[];
  active: 'privacy' | 'terms' | 'cookies';
}

const legalNav = [
  { href: '/legal/privacy', label: 'Privacy Policy',  icon: ShieldCheck },
  { href: '/legal/terms',   label: 'Terms of Service', icon: Scale       },
  { href: '/legal/cookies', label: 'Cookie Policy',   icon: Cookie      },
];

export function LegalPage({ title, lastUpdated, intro, sections, active }: LegalPageProps) {
  return (
    <div className="min-h-screen bg-neutral-50 pt-[var(--navbar-height)]">

      {/* ── Header band ── */}
      <div className="bg-white border-b border-neutral-100">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-12 py-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-neutral-700 font-worksans text-xs tracking-[0.12em] uppercase transition-colors duration-200 mb-6"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Home
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <span className="block w-6 h-px bg-gold-500/70" />
            <span className="font-worksans text-[0.6rem] tracking-[0.22em] uppercase text-gold-500/70">Legal</span>
          </div>
          <h1 className="font-bricolage font-extrabold text-neutral-900 text-4xl md:text-5xl tracking-tight leading-tight">
            {title}
          </h1>
          <p className="font-worksans text-xs tracking-[0.14em] uppercase text-neutral-400 mt-3">
            Last updated: {lastUpdated}
          </p>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 lg:px-12 py-12 md:py-16">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">

          {/* ── Sidebar nav ── */}
          <aside className="lg:w-56 shrink-0">
            <div className="lg:sticky lg:top-28">
              <p className="font-bricolage font-bold text-neutral-700 text-xs uppercase tracking-widest mb-4">
                Legal Documents
              </p>
              <nav className="flex flex-row lg:flex-col gap-2">
                {legalNav.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border font-bricolage font-semibold text-sm transition-all duration-200 ${
                      active === href.split('/').pop()
                        ? 'bg-purple-50 border-purple-200 text-purple-700'
                        : 'bg-white border-neutral-200 text-neutral-600 hover:border-purple-200 hover:text-purple-700'
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="hidden sm:block lg:block">{label}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </aside>

          {/* ── Content ── */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-2xl border border-neutral-100 shadow-[0_2px_24px_rgba(0,0,0,0.05)] overflow-hidden">

              {intro && (
                <div className="px-8 py-8 border-b border-neutral-100 bg-neutral-50/50">
                  <p className="font-roboto text-neutral-600 text-base leading-[1.85]">{intro}</p>
                </div>
              )}

              <div className="px-8 py-8 space-y-0 divide-y divide-neutral-100">
                {sections.map((s, i) => (
                  <div key={i} className="py-8 first:pt-0 last:pb-0">
                    <h2 className="font-bricolage font-bold text-neutral-900 text-xl tracking-tight mb-3">
                      {s.heading}
                    </h2>
                    <p className="font-roboto text-neutral-500 text-base leading-[1.85]">{s.body}</p>
                  </div>
                ))}
              </div>

              {/* Footer note */}
              <div className="px-8 py-6 bg-neutral-50 border-t border-neutral-100">
                <p className="font-roboto text-neutral-400 text-sm">
                  Questions about our legal policies?{' '}
                  <Link href="/contact" className="text-purple-600 hover:underline underline-offset-2 transition-colors">
                    Contact us
                  </Link>
                  {' '}and we&apos;ll be happy to help.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
