'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { FaSpotify, FaApple, FaYoutube, FaDeezer } from 'react-icons/fa6';
import { useAlbums } from '@/hooks/useAlbums';
import { toAlbumView } from '@/lib/data/adapters';
import { Button } from '@/components/ui/Button';
import { ContainedImage, Skeleton } from '@/components/ui';
import { cn } from '@/lib/utils/cn';
import { SectionHeading } from '@/components/shared/SectionHeading';

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
  const { albums: rawAlbums, loading } = useAlbums();
  const albums = rawAlbums.slice(0, 3).map(toAlbumView);

  if (!loading && albums.length === 0) return null;

  return (
    <section className="relative bg-cream-50 section-py border-t border-neutral-200/70 overflow-hidden">
      <div className="container-site relative z-10">
        <SectionHeading
          eyebrow="Discography"
          title="Featured Albums"
          action={
            <Button
              href="/music"
              variant="dark"
              size="sm"
              uppercase
              rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
              className="hidden md:inline-flex"
            >
              Explore Catalog
            </Button>
          }
        />

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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8 lg:gap-10"
          >
            {albums.map((album, idx) => (
              <motion.div
                key={album.id}
                variants={cardVariant}
                className="group relative flex flex-col h-full bg-white p-5 sm:p-6 rounded-2xl border border-neutral-200/80 shadow-xs hover:shadow-card-light-hover hover:border-gold-300/80 transition-all duration-300"
              >
                {/* Album Art with Vinyl Record Slide-out Effect */}
                <div className="relative w-full aspect-square mb-5">
                  {/* Vinyl Record (revealed on hover) */}
                  <div className="absolute inset-y-2 right-2 w-full aspect-square rounded-full overflow-hidden transition-all duration-700 ease-out group-hover:translate-x-10 group-hover:rotate-45 pointer-events-none opacity-85 group-hover:opacity-100 -z-10 shadow-lg">
                    <Image src="/CD1.png" alt="" fill className="object-contain" />
                  </div>

                  {/* Album Cover Front Sleeve */}
                  <div className="relative w-full h-full overflow-hidden rounded-xl shadow-md bg-neutral-100 ring-1 ring-black/5 z-10 transition-transform duration-500 group-hover:-translate-x-1">
                    <ContainedImage
                      src={album.image}
                      alt={album.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={idx === 0}
                    />
                  </div>
                </div>

                {/* Album Info */}
                <div className="flex-1 flex flex-col">
                  <h3 className="font-display font-semibold text-neutral-900 text-lg sm:text-xl tracking-tight mb-3 line-clamp-2 group-hover:text-purple-900 transition-colors">
                    {album.title}
                  </h3>

                  {/* Platform Pills */}
                  <div className="flex items-center gap-2 mt-auto pt-3 border-t border-neutral-100">
                    <span className="font-sans text-[0.65rem] tracking-wider uppercase text-neutral-400 font-medium mr-1">
                      Stream:
                    </span>
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
                            className="w-8 h-8 flex items-center justify-center border border-neutral-200/80 hover:border-gold-400 text-neutral-500 hover:text-gold-600 rounded-full transition-all duration-200 hover:bg-gold-50/60"
                          >
                            <Icon className="h-3.5 w-3.5" />
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

        {/* Mobile Action Button — Sleek, compact pill, never full-width */}
        <div className="mt-8 flex md:hidden justify-center">
          <Button
            href="/music"
            variant="dark"
            size="md"
            uppercase
            rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
          >
            Explore All Albums
          </Button>
        </div>
      </div>
    </section>
  );
}
