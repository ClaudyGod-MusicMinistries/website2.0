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
        'relative w-full min-h-[65vh] md:min-h-[72vh] flex items-end pb-20 md:pb-28 pt-[var(--navbar-height)]',
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
          {/* Multi-stop gradient: top vignette + heavy bottom for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-black/90" />
          {/* Purple brand tint */}
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-950/40 via-transparent to-transparent" />
        </>
      ) : (
        <div className="absolute inset-0 bg-[#0a0914]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_30%_100%,rgba(124,58,237,0.20)_0%,transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_80%_20%,rgba(201,168,76,0.06)_0%,transparent_70%)]" />
        </div>
      )}

      {/* Gold bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12">
        {eyebrow && (
          <div className="flex items-center gap-4 mb-5">
            <span className="rule-gold" />
            <span className="label-eyebrow text-white/70">{eyebrow}</span>
          </div>
        )}
        <h1 className="font-bricolage font-extrabold text-white text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.02] max-w-3xl">
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
