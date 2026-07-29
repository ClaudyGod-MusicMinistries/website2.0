'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Play, X, Calendar, Clock } from 'lucide-react';
import { interviewVideos } from '@/data/interviews';
import { YoutubeThumbnail } from '@/components/ui';
import { Container, Section } from '@/components/ui/Layout';
import { SectionHeading } from '@/components/shared/SectionHeading';

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
};

/**
 * Moved here from the old Blog listing page — media interviews are ministry
 * content (press/radio coverage of the ministry), a better fit next to
 * Teachings & Podcasts than under a generic blog tab.
 */
export function InterviewsSection() {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const active = interviewVideos.find((v) => v.id === playingId);

  return (
    <>
      <Section bg="white" py="lg" className="border-t border-black/[0.05]">
        <Container>
          <SectionHeading eyebrow="Media interviews" title="In the press" />

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {interviewVideos.map((v) => (
              <motion.button
                key={v.id}
                variants={item}
                onClick={() => setPlayingId(v.id)}
                className="group w-full text-left bg-neutral-900 rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300"
              >
                <div className="relative aspect-video overflow-hidden">
                  <YoutubeThumbnail
                    youtubeId={v.id}
                    alt={v.title}
                    fill
                    className="object-cover opacity-70 group-hover:opacity-95 transition-all duration-500 group-hover:scale-105"
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-black/30 backdrop-blur-sm group-hover:border-gold-400/60 transition-all duration-300">
                      <Play className="h-3.5 w-3.5 text-white fill-white ml-0.5" />
                    </div>
                  </div>
                  <span className="absolute top-3 left-3 font-sans text-[0.45rem] tracking-[0.15em] uppercase text-gold-400/80 bg-black/60 backdrop-blur-sm px-2 py-1">
                    {v.channel}
                  </span>
                </div>
                <div className="p-4 border-t border-white/[0.06]">
                  <p className="font-sans text-base text-neutral-300 group-hover:text-white font-light leading-snug line-clamp-2 mb-3 transition-colors duration-300">
                    {v.title}
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5 font-sans text-[0.55rem] tracking-[0.1em] uppercase text-neutral-500">
                      <Calendar className="h-3 w-3" />
                      {v.date}
                    </span>
                    {v.duration && (
                      <span className="flex items-center gap-1.5 font-sans text-[0.55rem] tracking-[0.1em] uppercase text-neutral-500">
                        <Clock className="h-3 w-3" />
                        {v.duration}
                      </span>
                    )}
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[600] bg-black/94 backdrop-blur-md"
              onClick={() => setPlayingId(null)}
            />
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="fixed inset-0 z-[601] flex items-center justify-center p-4 md:p-10 pointer-events-none"
            >
              <div className="relative w-full max-w-4xl pointer-events-auto">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-sans text-[0.55rem] tracking-[0.18em] uppercase text-white/40">
                    {active.channel}
                  </span>
                  <button
                    onClick={() => setPlayingId(null)}
                    aria-label="Close"
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="relative aspect-video rounded-xl overflow-hidden bg-black ring-1 ring-white/10">
                  <iframe
                    src={`https://www.youtube.com/embed/${playingId}?autoplay=1&rel=0`}
                    title={active.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
