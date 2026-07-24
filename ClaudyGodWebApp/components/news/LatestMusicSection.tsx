'use client';

import Link from 'next/link';
import { useAlbums } from '@/hooks/useAlbums';
import { toAlbumView } from '@/lib/data/adapters';
import { ContainedImage } from '@/components/ui';
import { GridSkeleton } from '@/components/shared/GridSkeleton';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { FaSpotify, FaApple, FaYoutube } from 'react-icons/fa6';
import { platformColors } from '@/lib/utils/platformColors';

/**
 * Replaces the old static `data/news.ts` album list — News' "Latest Music"
 * teaser now pulls the same real, backend-driven albums as the Music page
 * (via useAlbums, which already falls back to curated real content on an
 * empty/failed fetch) instead of a separate hand-maintained list that could
 * silently drift out of date.
 */
export function LatestMusicSection() {
  const { albums: rawAlbums, loading, error, refetch } = useAlbums();
  const albums = rawAlbums.slice(0, 2).map(toAlbumView);

  if (!loading && error && albums.length === 0) {
    return (
      <section className="bg-cream-100 section-py border-t border-black/[0.05]">
        <div className="container-site">
          <ErrorMessage message={error} onRetry={refetch} />
        </div>
      </section>
    );
  }

  if (!loading && albums.length === 0) return null;

  return (
    <section className="bg-cream-100 section-py border-t border-black/[0.05]">
      <div className="container-site">
        <div className="flex items-center gap-4 mb-4">
          <span className="rule-gold" />
          <span className="label-eyebrow">New Releases</span>
        </div>
        <h2 className="font-raleway font-light text-neutral-900 text-3xl md:text-4xl tracking-normal mb-12">
          Latest Music
        </h2>

        {loading ? (
          <GridSkeleton cols={2} rows={1} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {albums.map((album) => (
              <div
                key={album.id}
                className="group bg-white rounded-xl shadow-card-light hover:shadow-card-light-hover border border-black/[0.04] overflow-hidden flex gap-6 p-6 items-center transition-all duration-300"
              >
                <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden shadow-md bg-neutral-100">
                  <ContainedImage
                    src={album.image}
                    alt={album.title}
                    className="group-hover:scale-105 transition-transform duration-500"
                    sizes="96px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-display font-bold text-neutral-900 text-lg leading-snug mb-1 group-hover:text-purple-700 transition-colors duration-300 line-clamp-2">
                    {album.title}
                  </p>
                  <p className="font-sans text-[0.55rem] tracking-[0.15em] uppercase text-neutral-400 mb-4">
                    Available on all platforms
                  </p>
                  <div className="flex items-center gap-3">
                    {album.links.spotify && (
                      <a
                        href={album.links.spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Listen on Spotify"
                        style={{ '--brand': platformColors.spotify } as React.CSSProperties}
                        className="w-9 h-9 flex items-center justify-center rounded-lg border border-neutral-200 text-neutral-400 hover:text-[var(--brand)] hover:border-[var(--brand)]/40 transition-all duration-300"
                      >
                        <FaSpotify className="h-4 w-4" />
                      </a>
                    )}
                    {album.links.apple && (
                      <a
                        href={album.links.apple}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Listen on Apple Music"
                        className="w-9 h-9 flex items-center justify-center rounded-lg border border-neutral-200 text-neutral-400 hover:text-neutral-900 hover:border-neutral-400 transition-all duration-300"
                      >
                        <FaApple className="h-4 w-4" />
                      </a>
                    )}
                    {album.links.youtube && (
                      <a
                        href={album.links.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Watch on YouTube"
                        style={{ '--brand': platformColors.youtube } as React.CSSProperties}
                        className="w-9 h-9 flex items-center justify-center rounded-lg border border-neutral-200 text-neutral-400 hover:text-[var(--brand)] hover:border-[var(--brand)]/40 transition-all duration-300"
                      >
                        <FaYoutube className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10">
          <Link
            href="/music"
            className="inline-flex items-center gap-2.5 font-sans text-xs tracking-[0.18em] uppercase bg-neutral-900 hover:bg-purple-700 text-white px-8 h-11 rounded-xl transition-all duration-300 group"
          >
            View Full Discography
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
