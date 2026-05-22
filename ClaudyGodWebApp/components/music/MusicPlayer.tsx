'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, ExternalLink, Music2, ListMusic } from 'lucide-react';
import { cn } from '@/utils/cn';

interface Track {
  id: string;
  title: string;
  youtubeId: string;
  category: string;
}

const tracks: Track[] = [
  { id: '1',  title: 'VERY GLORIOUS (Live Recording)',   youtubeId: 'xY4508hwPfw', category: 'Live Session' },
  { id: '2',  title: 'STEP ASIDE',                       youtubeId: '3nvGauo7kjA', category: 'Music Video'  },
  { id: '3',  title: 'Nothing Compares To You',           youtubeId: 'Dw5S-jzzboA', category: 'Visualizer'  },
  { id: '4',  title: 'Dwelling Place (Forever God)',      youtubeId: 'KoVkhbrRjf8', category: 'Live Session' },
  { id: '5',  title: 'I Love You Lord',                  youtubeId: 'SqaOeGLDPLY', category: 'Music Video'  },
  { id: '6',  title: "It's A New Day (Thank You For Today)", youtubeId: 'Ak0LZgfHMa0', category: 'Music Video' },
  { id: '7',  title: 'All of Me',                        youtubeId: 'L-AVa2qC5Ic', category: 'Music Video'  },
  { id: '8',  title: 'King of the Nations',              youtubeId: 'UZPaupINXYI', category: 'Music Video'  },
  { id: '9',  title: 'Love Me So Much',                  youtubeId: 'uro0EWsYdxc', category: 'Music Video'  },
  { id: '10', title: 'Joyful Alleluia',                  youtubeId: 'ih4SrEgnV60', category: 'Music Video'  },
  { id: '11', title: 'Look To You',                      youtubeId: '7BN7i4puuis', category: 'Visualizer'   },
  { id: '12', title: 'Affirmation',                      youtubeId: 'bVOAeBAer4U', category: 'Music Video'  },
];

export function MusicPlayer() {
  const [activeId,  setActiveId]  = useState<string | null>(null);
  const [showList,  setShowList]  = useState(false);
  const activeTrack = tracks.find((t) => t.id === activeId) ?? null;

  const play = (id: string) => setActiveId(id);
  const stop = () => setActiveId(null);

  return (
    <section className="bg-[#0d0b1a] section-py relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-purple-900/25 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] rounded-full bg-gold-500/8 blur-[100px]" />
      </div>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-500/30 to-transparent mb-0 absolute top-0 left-0" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <span className="block w-8 h-px bg-gold-500 opacity-70" />
              <span className="label-eyebrow">Now Playing</span>
            </div>
            <h2 className="font-raleway font-bold text-white text-3xl md:text-4xl tracking-tight">
              Music Player
            </h2>
            <p className="font-raleway text-neutral-500 text-sm mt-2">
              Select any track below to stream it instantly
            </p>
          </div>
          <button
            onClick={() => setShowList((v) => !v)}
            className={cn(
              'sm:hidden inline-flex items-center gap-2 px-5 h-10 rounded-xl border font-worksans text-xs tracking-[0.12em] uppercase transition-all duration-300',
              showList ? 'bg-purple-600 border-purple-600 text-white' : 'bg-white/10 border-white/10 text-white/70'
            )}
          >
            <ListMusic className="h-3.5 w-3.5" />
            {showList ? 'Hide Tracks' : 'Show Tracks'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">

          {/* Player frame */}
          <div className="rounded-2xl overflow-hidden bg-black border border-white/[0.06] shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
            {activeTrack ? (
              <div className="relative aspect-video">
                <iframe
                  key={activeTrack.youtubeId}
                  src={`https://www.youtube.com/embed/${activeTrack.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                  title={activeTrack.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            ) : (
              <div className="relative aspect-video flex flex-col items-center justify-center gap-4 bg-neutral-950">
                <Image
                  src="/ClaudyGoLogo.webp"
                  alt="ClaudyGod"
                  width={80}
                  height={80}
                  className="rounded-full opacity-40"
                />
                <div className="text-center">
                  <p className="font-raleway font-semibold text-white/40 text-lg mb-1">Select a track to play</p>
                  <p className="font-worksans text-[0.55rem] tracking-[0.18em] uppercase text-neutral-700">
                    {tracks.length} tracks available
                  </p>
                </div>
              </div>
            )}

            {/* Track info bar */}
            {activeTrack && (
              <div className="px-5 py-4 flex items-center justify-between bg-neutral-950 border-t border-white/[0.05]">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-purple-600/20 border border-purple-500/30 flex items-center justify-center shrink-0">
                    <Music2 className="h-3.5 w-3.5 text-purple-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-raleway font-semibold text-white text-sm truncate">{activeTrack.title}</p>
                    <p className="font-worksans text-[0.5rem] tracking-[0.12em] uppercase text-neutral-600">ClaudyGod Music Ministries</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={`https://www.youtube.com/watch?v=${activeTrack.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-neutral-500 hover:text-white transition-colors"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                  <button
                    onClick={stop}
                    className="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-500/20 flex items-center justify-center text-neutral-500 hover:text-red-400 transition-colors"
                  >
                    <Pause className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Track list */}
          <div className={cn('lg:block', showList ? 'block' : 'hidden')}>
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-white/[0.05] flex items-center justify-between">
                <span className="font-worksans text-xs tracking-[0.15em] uppercase text-neutral-400">Playlist</span>
                <span className="font-worksans text-[0.55rem] tracking-[0.12em] uppercase text-neutral-700">{tracks.length} tracks</span>
              </div>
              <div className="divide-y divide-white/[0.04] max-h-[420px] overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
                {tracks.map((track, i) => (
                  <button
                    key={track.id}
                    onClick={() => play(track.id)}
                    className={cn(
                      'w-full flex items-center gap-3 px-5 py-3.5 text-left transition-all duration-200 group',
                      activeId === track.id
                        ? 'bg-purple-600/15 border-l-2 border-purple-500'
                        : 'hover:bg-white/[0.04] border-l-2 border-transparent'
                    )}
                  >
                    {/* Number / play icon */}
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0">
                      <AnimatePresence mode="wait">
                        {activeId === track.id ? (
                          <motion.div key="play" initial={{ scale: 0.7 }} animate={{ scale: 1 }}>
                            <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center">
                              <Play className="h-2.5 w-2.5 text-white fill-white ml-px" />
                            </div>
                          </motion.div>
                        ) : (
                          <motion.span
                            key="num"
                            className="font-worksans text-[0.55rem] text-neutral-600 group-hover:hidden"
                          >
                            {String(i + 1).padStart(2, '0')}
                          </motion.span>
                        )}
                      </AnimatePresence>
                      {activeId !== track.id && (
                        <Play className="hidden group-hover:block h-3.5 w-3.5 text-neutral-400 fill-neutral-400" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className={cn(
                        'font-raleway font-medium text-sm truncate transition-colors duration-200',
                        activeId === track.id ? 'text-purple-300' : 'text-neutral-300 group-hover:text-white'
                      )}>
                        {track.title}
                      </p>
                      <p className="font-worksans text-[0.48rem] tracking-[0.1em] uppercase text-neutral-700 mt-0.5">
                        {track.category}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
