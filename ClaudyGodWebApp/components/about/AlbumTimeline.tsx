'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { albums } from '@/data/music';
import { FaSpotify, FaApple, FaYoutube } from 'react-icons/fa6';
import { platformColors } from '@/utils/platformColors';

const platformIcons = {
  spotify: FaSpotify,
  apple:   FaApple,
  youtube: FaYoutube,
} as const;

type PlatformKey = keyof typeof platformIcons;

function AlbumArtVisual({ album, isEven }: { album: (typeof albums)[0]; isEven: boolean }) {
  const platformEntries = (Object.entries(album.links) as [PlatformKey, string][]).filter(
    ([key]) => key in platformIcons
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, x: isEven ? 32 : -32 }}
      whileInView={{ opacity: 1, scale: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.85, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative flex items-center justify-center py-16 lg:py-10"
    >
      {/* Ambient radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.09)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-[radial-gradient(circle,rgba(201,168,76,0.07)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative">
        {/* Outer spinning dashed orbit */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          className="absolute -inset-10 rounded-full border border-dashed border-gold-500/20 pointer-events-none"
        />
        {/* Inner counter-rotating dotted orbit */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 44, repeat: Infinity, ease: 'linear' }}
          className="absolute -inset-5 rounded-full border border-dotted border-purple-400/15 pointer-events-none"
        />

        {/* Album artwork */}
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="relative w-52 h-52 lg:w-64 lg:h-64 rounded-2xl overflow-hidden shadow-[0_28px_80px_rgba(0,0,0,0.18)] ring-1 ring-black/10 cursor-pointer"
        >
          <Image
            src={album.image}
            alt={album.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 208px, 256px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/5" />
        </motion.div>

        {/* Floating platform badges — staggered entrance from right */}
        <div className="absolute -right-7 top-5 flex flex-col gap-3">
          {platformEntries.slice(0, 3).map(([key, url], idx) => {
            const Icon = platformIcons[key];
            return (
              <motion.a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={key}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + idx * 0.12, duration: 0.5, ease: 'easeOut' }}
                whileHover={{ scale: 1.18, x: -3 }}
                className="w-11 h-11 rounded-full bg-white shadow-[0_6px_20px_rgba(0,0,0,0.13)] border border-black/[0.06] flex items-center justify-center transition-shadow duration-300 hover:shadow-[0_8px_28px_rgba(0,0,0,0.18)]"
              >
                <Icon className="h-4 w-4" style={{ color: platformColors[key] }} />
              </motion.a>
            );
          })}
        </div>

        {/* Animated "Now Streaming" badge */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.65, duration: 0.6, ease: 'easeOut' }}
          className="absolute -bottom-7 left-1/2 -translate-x-1/2"
        >
          <div className="flex items-center gap-2.5 bg-white rounded-full px-5 py-2.5 shadow-[0_6px_24px_rgba(0,0,0,0.11)] border border-black/[0.05] whitespace-nowrap">
            {/* Animated waveform bars */}
            <span className="flex items-end gap-[3px] h-3.5">
              {[0, 1, 2, 3].map((bar) => (
                <motion.span
                  key={bar}
                  className="w-[3px] rounded-full bg-purple-500"
                  animate={{ height: ['5px', '14px', '7px', '12px', '5px'] }}
                  transition={{
                    duration: 0.95,
                    repeat: Infinity,
                    delay: bar * 0.18,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </span>
            <span className="font-worksans text-[0.62rem] tracking-[0.14em] uppercase text-neutral-500 font-medium">
              Now Streaming
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function AlbumTimeline() {
  return (
    <section className="bg-cream-100 section-py">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex items-center gap-4 mb-14">
          <span className="rule-gold" />
          <span className="label-eyebrow">Discography</span>
        </div>

        <h2 className="font-bricolage font-bold text-neutral-900 text-3xl md:text-4xl tracking-tight leading-tight mb-16">
          Albums &amp; Releases
        </h2>

        <div className="relative">
          {/* Vertical centre line */}
          <div className="absolute left-0 lg:left-1/2 top-0 bottom-0 w-px bg-black/[0.07] hidden md:block" />

          <div className="space-y-0">
            {albums.map((album, i) => {
              const isEven = i % 2 === 0;

              const contentBlock = (
                <motion.div
                  key={`content-${album.title}`}
                  initial={{ opacity: 0, x: isEven ? -28 : 28 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                  className={`flex ${isEven ? 'lg:justify-end lg:pr-16' : 'lg:justify-start lg:pl-16'} py-10`}
                >
                  <div className="group w-full max-w-md">
                    <div className="flex gap-5 items-start">
                      <div className="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden shadow-md ring-1 ring-black/[0.06] group-hover:ring-gold-500/30 transition-all duration-300">
                        <Image
                          src={album.image}
                          alt={album.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="80px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bricolage font-bold text-neutral-800 text-xl leading-tight mb-1 group-hover:text-purple-700 transition-colors duration-300">
                          {album.title}
                        </p>
                        <p className="font-raleway text-neutral-500 text-sm leading-relaxed mb-4">
                          Available on all platforms
                        </p>
                        <div className="flex items-center gap-2.5">
                          {(Object.entries(album.links) as [PlatformKey, string][])
                            .filter(([key]) => key in platformIcons)
                            .map(([key, url]) => {
                              const Icon = platformIcons[key];
                              return (
                                <a
                                  key={key}
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label={key}
                                  style={{ '--brand': platformColors[key] } as React.CSSProperties}
                                  className="w-9 h-9 rounded-xl border border-neutral-200 hover:border-[var(--brand)]/50 flex items-center justify-center transition-all duration-300 hover:shadow-sm"
                                >
                                  <Icon className="h-3.5 w-3.5" style={{ color: platformColors[key] }} />
                                </a>
                              );
                            })}
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 border-b border-black/[0.06]" />
                  </div>
                </motion.div>
              );

              const visualBlock = (
                <AlbumArtVisual key={`visual-${album.title}`} album={album} isEven={isEven} />
              );

              return (
                <div
                  key={album.title}
                  className={`relative grid grid-cols-1 lg:grid-cols-2 gap-0 ${
                    i < albums.length - 1 ? 'mb-1' : ''
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 lg:left-1/2 top-10 w-2.5 h-2.5 rounded-full bg-gold-500/50 border border-gold-500/70 -translate-x-1/2 hidden md:block z-10 shadow-[0_0_8px_rgba(201,168,76,0.3)]" />

                  {isEven ? contentBlock : visualBlock}
                  {isEven ? visualBlock : contentBlock}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-14 pt-10 border-t border-black/[0.06] flex flex-wrap gap-4">
          <Link
            href="/music"
            className="inline-flex items-center gap-2.5 font-worksans text-xs tracking-[0.18em] uppercase bg-neutral-900 hover:bg-purple-700 text-white px-8 h-11 rounded-xl transition-all duration-300 group"
          >
            View Full Music Catalogue
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
