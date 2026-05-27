import Image from 'next/image';
import { cn } from '@/utils/cn';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  backgroundImage?: string;
  /**
   * CSS object-position. Defaults to 'center top' (safe for portrait images).
   * Pass 'center center' for landscape images.
   */
  objectPosition?: string;
  className?: string;
}

export function PageHero({
  title, subtitle, eyebrow, backgroundImage,
  objectPosition = 'center top', className,
}: PageHeroProps) {
  return (
    <div
      className={cn(
        'relative w-full min-h-[48vh] sm:min-h-[55vh] md:min-h-[62vh] lg:min-h-[68vh] flex items-end pb-10 sm:pb-14 md:pb-20 lg:pb-24 pt-[var(--navbar-height)]',
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
            className="object-cover"
            style={{ objectPosition }}
            sizes="100vw"
          />
          {/* Strong bottom fade for text legibility over any image */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-black/92" />
          {/* Left gradient — text always readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />
          {/* Purple brand tint */}
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-950/35 via-transparent to-transparent" />
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
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        {eyebrow && (
          <div className="flex items-center gap-3 mb-3 sm:mb-5">
            <span className="rule-gold" />
            <span className="label-eyebrow text-white/70">{eyebrow}</span>
          </div>
        )}
        <h1 className="font-bricolage font-extrabold text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight leading-[1.05] max-w-3xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 sm:mt-5 font-raleway text-neutral-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
