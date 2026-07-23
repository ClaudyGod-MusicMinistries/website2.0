'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaSpotify, FaApple, FaYoutube, FaDeezer } from 'react-icons/fa6';
import { useAlbums } from '@/hooks/useAlbums';
import { toAlbumView } from '@/lib/data/adapters';
import { buttonVariants } from '@/lib/theme/buttons';
import { Skeleton } from '@/components/ui';
import { cn } from '@/lib/utils/cn';

const icons = { spotify: FaSpotify, apple: FaApple, youtube: FaYoutube, deezer: FaDeezer } as const;

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const cardVariant = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

export function MusicHighlight() {
  const { albums: rawAlbums, loading, error } = useAlbums();
  const albums = rawAlbums.slice(0, 3).map(toAlbumView);

  if (error) return null;

  return (
    <section className="bg-cream-100 section-py border-t border-black/[0.05]">
      <div className="container-site">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 sm:gap-4 mb-10 sm:mb-14">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <span className="rule-gold" />
              <span className="label-eyebrow">Discography</span>
            </div>
            <h2 className="font-display font-bold text-neutral-900 text-2xl sm:text-3xl md:text-4xl tracking-tight leading-tight">
              Albums
            </h2>
          </div>
          <Link
            href="/music"
            className={cn(
              buttonVariants({ variant: 'outline', size: 'lg', uppercase: true }),
              'hidden md:inline-flex whitespace-nowrap'
            )}
          >
            All Albums →
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex flex-col gap-4">
                <Skeleton className="aspect-square w-full" rounded="lg" />
                <Skeleton className="h-6 w-3/4" />
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10"
          >
            {albums.map((album, idx) => (
              <motion.div
                key={album.id}
                variants={cardVariant}
                className="group flex flex-col h-full"
              >
                {/* Album Art Container */}
                <div className="relative w-full aspect-square mb-4 sm:mb-5 overflow-hidden rounded-xl shadow-card-light-hover bg-neutral-100">
                  <Image
                    src={album.image}
                    alt={album.title}
                    fill
                    className="object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) calc(100vw - 2rem), (max-width: 1024px) calc(50vw - 1.5rem), calc(33.333vw - 1.5rem)"
                    priority={idx === 0}
                    quality={90}
                  />
                  <div className="absolute inset-0 ring-1 ring-black/5 pointer-events-none" />
                </div>

                {/* Album Info - flex-1 to push content down */}
                <div className="flex-1 flex flex-col">
                  <h3 className="font-display font-semibold text-neutral-800 text-lg sm:text-xl md:text-2xl tracking-wide mb-2 sm:mb-3 line-clamp-2">
                    {album.title}
                  </h3>

                  {/* Platform icons */}
                  <div className="flex items-center gap-2 mt-auto pt-2">
                    {(Object.entries(album.links) as [keyof typeof icons, string][]).map(
                      ([key, url]) => {
                        const Icon = icons[key];
                        if (!Icon) return null;
                        return (
                          <a
                            key={key}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${album.title} on ${key}`}
                            className="w-9 h-9 flex items-center justify-center border border-neutral-200 hover:border-gold-400/50 text-neutral-400 hover:text-gold-500 rounded-lg transition-all duration-300 hover:bg-gold-50"
                          >
                            <Icon className="h-4 w-4" />
                          </a>
                        );
                      }
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        <div className="mt-10 sm:mt-12 flex md:hidden justify-center sm:justify-start">
          <Link
            href="/music"
            className={cn(
              buttonVariants({ variant: 'secondary', size: 'lg', uppercase: true }),
              'group'
            )}
          >
            View All Albums
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
