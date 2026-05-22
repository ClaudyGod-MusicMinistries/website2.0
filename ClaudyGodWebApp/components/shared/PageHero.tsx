import Image from 'next/image';
import { cn } from '@/utils/cn';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  backgroundImage?: string;
  className?: string;
}

export function PageHero({ title, subtitle, eyebrow, backgroundImage, className }: PageHeroProps) {
  return (
    <div
      className={cn(
        'relative w-full min-h-[60vh] flex items-end pb-20 md:pb-24 pt-[var(--navbar-height)]',
        className
      )}
    >
      {/* Background */}
      {backgroundImage ? (
        <>
          <Image
            src={backgroundImage}
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Stronger gradient overlay for legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/85" />
        </>
      ) : (
        <div className="absolute inset-0 bg-[#0a0914]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(124,58,237,0.15)_0%,transparent_70%)]" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12">
        {eyebrow && (
          <div className="flex items-center gap-4 mb-5">
            <span className="rule-gold" />
            <span className="label-eyebrow text-white/70">{eyebrow}</span>
          </div>
        )}
        <h1 className="font-raleway font-bold text-white text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.02] max-w-3xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 font-raleway text-neutral-300 text-base md:text-lg leading-relaxed max-w-xl">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
