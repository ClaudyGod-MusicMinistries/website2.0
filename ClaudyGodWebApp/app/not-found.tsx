import { Search, Home, Music, Phone } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for could not be found.',
};

const QUICK_LINKS = [
  { href: '/',        label: 'Home',    icon: Home  },
  { href: '/music',   label: 'Music',   icon: Music },
  { href: '/contact', label: 'Contact', icon: Phone },
] as const;

export default function NotFoundPage() {
  return (
    <div className="min-h-dvh bg-surface-base flex flex-col items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* 404 display */}
        <p className="font-abril text-[8rem] leading-none text-gold-500/20 select-none mb-4">
          404
        </p>

        {/* Icon + Heading */}
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-surface-elevated border border-surface-border">
          <Search className="h-6 w-6 text-gold-500" strokeWidth={1.5} />
        </div>

        <h1 className="font-bricolage text-2xl font-bold text-white mb-3">
          Page not found
        </h1>
        <p className="text-sm text-neutral-400 leading-relaxed mb-10">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
          Head back home or use one of the quick links below.
        </p>

        {/* Primary CTA */}
        <a
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-gold-500 px-6 py-3 text-sm font-semibold text-surface-base transition-all hover:brightness-110 active:scale-[0.98] mb-10"
        >
          <Home className="h-4 w-4" />
          Back to home
        </a>

        {/* Quick links */}
        <div className="border-t border-surface-border pt-8">
          <p className="text-xs font-worksans uppercase tracking-widest text-neutral-500 mb-5">
            Quick links
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {QUICK_LINKS.map(({ href, label, icon: Icon }) => (
              <a
                key={href}
                href={href}
                className="inline-flex items-center gap-1.5 rounded-lg border border-surface-border px-4 py-2 text-sm text-neutral-300 transition-all hover:border-gold-500/40 hover:text-gold-400"
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
