import Image from 'next/image';
import { Label } from '@/components/ui/Typography';
import { GoldBar } from '@/components/ui/Divider';
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
        'relative w-full min-h-[40vh] flex items-end pb-12 pt-[var(--navbar-height)]',
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
        <div className="absolute inset-0 bg-gradient-dark">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold-900/20 via-transparent to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {eyebrow && <Label className="mb-3 block">{eyebrow}</Label>}
        <h1 className="font-abril text-white text-4xl md:text-5xl lg:text-6xl leading-none text-balance">
          {title}
        </h1>
        <GoldBar className="mt-4" />
        {subtitle && (
          <p className="mt-4 text-neutral-300 text-lg max-w-2xl leading-relaxed">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
