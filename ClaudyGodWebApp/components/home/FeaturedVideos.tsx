'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Play, X } from 'lucide-react';
import { featuredVideos } from '@/data/featured';
import { Section, Container, Grid } from '@/components/ui/Layout';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { IconButton } from '@/components/ui/IconButton';
import { Text, Caption } from '@/components/ui/Typography';
import { modalOverlay, modalContent } from '@/utils/animations';

function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|v=|\/embed\/)([^?&]+)/);
  return match ? match[1] : null;
}

export function FeaturedVideos() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeVideo = featuredVideos.find((v) => v.id === activeId);
  const youtubeId = activeVideo ? getYouTubeId(activeVideo.youtubeUrl) : null;

  return (
    <>
      <Section bg="base" py="lg">
        <Container>
          <SectionHeader
            eyebrow="Watch & Worship"
            title="Featured Videos"
            subtitle="Experience anointed worship sessions, live recordings, and music videos."
            className="mb-10"
          />

          <Grid cols={4} gap="md">
            {featuredVideos.map((video) => (
              <button
                key={video.id}
                onClick={() => setActiveId(video.id)}
                className="group relative rounded-xl overflow-hidden bg-surface-elevated cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video">
                  <Image
                    src={video.thumbnailUrl}
                    alt={video.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-12 w-12 rounded-full bg-gold-500 flex items-center justify-center shadow-gold transition-transform duration-300 group-hover:scale-110">
                      <Play className="h-5 w-5 text-surface-base fill-surface-base ml-0.5" />
                    </div>
                  </div>
                  {/* Duration badge */}
                  <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs font-bricolage px-1.5 py-0.5 rounded">
                    {video.duration}
                  </span>
                </div>

                {/* Title */}
                <div className="p-3">
                  <Text size="xs" weight="medium" color="primary" leading="snug" className="line-clamp-2">
                    {video.title}
                  </Text>
                </div>
              </button>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Lightbox modal */}
      <AnimatePresence>
        {activeId && youtubeId && (
          <>
            <motion.div
              key="overlay"
              variants={modalOverlay}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-modal bg-black/80 backdrop-blur-sm"
              onClick={() => setActiveId(null)}
            />
            <motion.div
              key="content"
              variants={modalContent}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-modal flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="relative w-full max-w-4xl pointer-events-auto">
                <IconButton
                  label="Close video"
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveId(null)}
                  className="absolute -top-10 right-0 text-white border-white/20 bg-black/30"
                >
                  <X className="h-4 w-4" />
                </IconButton>
                <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
                  <iframe
                    src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                    title={activeVideo?.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
                {activeVideo && (
                  <Caption className="mt-2 text-neutral-300 text-center block">
                    {activeVideo.title}
                  </Caption>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
