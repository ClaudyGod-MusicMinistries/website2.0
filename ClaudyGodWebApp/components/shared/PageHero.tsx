import Image from 'next/image';
import { cn } from '@/lib/utils/cn';

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

/**
 * The compact counterpart to the homepage Hero — same type scale (Raleway
 * Light), same gold accent language, same entrance motion — just shorter,
 * since every inner page needs its content visible without a full viewport
 * banner. Keep eyebrow/title/subtitle short: this is a banner, not a place
 * for paragraph copy.
 */
export function PageHero({
  title,
  subtitle,
  eyebrow,
  backgroundImage,
  objectPosition = 'center top',
  className,
}: PageHeroProps) {
  return (
    <div
      className={cn(
        'relative w-full min-h-[48vh] sm:min-h-[55vh] md:min-h-[62vh] lg:min-h-[68vh] flex items-end pb-10 sm:pb-14 md:pb-20 lg:pb-24 pt-[var(--navbar-height)] overflow-hidden',
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_90%,rgba(123,98,172,0.24),transparent_38%),radial-gradient(circle_at_85%_10%,rgba(181,101,29,0.1),transparent_32%),linear-gradient(135deg,#08070d,#14111f)]" />
      )}

      {/* Gold bottom line — the seam into the page content below */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full container-site">
        {eyebrow && (
          <div className="flex items-center gap-3 mb-3 sm:mb-5">
            <span className="h-px w-10 bg-gold-500/80" />
            <span className="label-eyebrow text-gold-400">{eyebrow}</span>
          </div>
        )}
        <h1 className="font-raleway font-light text-white text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl tracking-normal leading-[1.15] max-w-3xl text-balance">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 sm:mt-5 font-sans text-neutral-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl text-pretty">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
