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
        'relative w-full min-h-[45vh] flex items-end pb-16 md:pb-20 pt-[var(--navbar-height)]',
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
          <div className="image-overlay absolute inset-0" />
        </>
      ) : (
        <div className="absolute inset-0 bg-[#080808]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(201,168,76,0.06)_0%,transparent_70%)]" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12">
        {eyebrow && (
          <div className="flex items-center gap-4 mb-4">
            <span className="rule-gold" />
            <span className="label-eyebrow">{eyebrow}</span>
          </div>
        )}
        <h1 className="font-raleway font-light text-white text-4xl md:text-5xl lg:text-5xl tracking-tight leading-[1.05]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 font-raleway text-neutral-500 text-sm leading-relaxed max-w-xl font-light">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
