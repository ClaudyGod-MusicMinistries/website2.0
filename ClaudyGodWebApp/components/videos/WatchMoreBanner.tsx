import Link from 'next/link';
import { Youtube, PlayCircle, ArrowRight } from 'lucide-react';
import { buttonVariants } from '@/lib/theme/buttons';
import { AmbientGlow } from '@/components/ui';
import { cn } from '@/lib/utils/cn';

/**
 * Replaces the generic Store/Music/Newsletter CrossPromo on this page —
 * neither of those is "more video content," which is what someone who just
 * finished browsing the video catalog is actually looking for. Points to
 * the two real places more video content lives: the YouTube channel itself,
 * and Teachings & Podcasts on the Ministry page.
 */
export function WatchMoreBanner() {
  return (
    <section className="relative bg-surface-deep overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <AmbientGlow
          color="gold"
          size={550}
          opacity={0.07}
          animate={false}
          className="-top-[220px] -right-[180px]"
        />
        <AmbientGlow
          color="purple"
          size={500}
          opacity={0.16}
          animate={false}
          className="-bottom-[200px] -left-[160px]"
        />
      </div>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

      <div className="relative container-site py-14 sm:py-20 text-center">
        <div className="flex items-center gap-4 mb-5 justify-center">
          <span className="block w-8 h-px bg-gold-500 opacity-70" />
          <span className="label-eyebrow text-gold-400">Stay Connected</span>
        </div>

        <h2 className="font-raleway font-light text-white text-2xl sm:text-3xl md:text-4xl tracking-normal leading-tight mb-4">
          Never Miss a Video
        </h2>
        <p className="font-sans text-neutral-400 text-sm sm:text-base leading-relaxed max-w-md mx-auto mb-9">
          New music videos and live sessions post to YouTube first — subscribe to catch them as soon
          as they&apos;re up.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://youtube.com/@claudygodministries?si=6Ne99tTC48Ihv44s"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: 'primary', size: 'lg', uppercase: true }),
              'group shadow-gold-cta hover:shadow-gold-cta-hover'
            )}
          >
            <Youtube className="h-4 w-4" />
            Subscribe on YouTube
          </a>
          <Link
            href="/ministry"
            className={cn(
              buttonVariants({ variant: 'outline', size: 'lg', uppercase: true }),
              'group'
            )}
          >
            <PlayCircle className="h-3.5 w-3.5" />
            Teachings & Podcasts
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </section>
  );
}
