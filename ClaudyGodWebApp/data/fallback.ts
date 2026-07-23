/**
 * Curated fallback content for API-backed homepage sections, shaped to match
 * the real backend DTOs exactly (see lib/data/types.ts) so useApiResource can
 * drop these straight into `data` on a fetch failure with no adapter drift.
 *
 * Unlike the old placeholder files (data/events.ts, data/store.ts) that predate
 * the real backend and use incompatible shapes, everything here is real,
 * evergreen content — actual released songs and the real streaming links from
 * data/music.tsx — so showing it during a brief API outage never misleads a
 * visitor the way a stale fake "upcoming event" would.
 *
 * Deliberately NOT covered here:
 *  - Events: date/venue content is time-sensitive; a cached fallback could
 *    show a tour date that's already passed or never happened. useEvents
 *    keeps its empty fallback, so TourDatesStrip just hides on failure.
 *  - Store products: checkout wiring isn't confirmed live end-to-end yet
 *    (see ProductGrid's "coming soon" state) — showing fallback products as
 *    buyable during an outage could let someone attempt a purchase that
 *    can't complete.
 */
import type { Album, MediaItem } from '@/lib/data/types';

export const fallbackAlbums: Album[] = [
  {
    id: 'fallback-very-glorious',
    title: 'Very Glorious',
    imageUrl: '/CoverArt.webp',
    spotifyUrl: 'https://open.spotify.com/album/1zCT0YUVggnzkZJK5VP0yd',
    appleUrl: 'https://music.apple.com/ng/album/very-glorious/1789665669',
    youtubeUrl: 'https://youtube.com/@claudygodministries?si=6Ne99tTC48Ihv44s',
    deezerUrl: 'https://www.deezer.com/us/album/695949191',
    amazonUrl: 'https://music.amazon.com/albums/B0DSM7QGLF?tag=fndcmpgns-20',
    sortOrder: 0,
  },
  {
    id: 'fallback-you-are-our-everything',
    title: 'You Are Our Everything',
    imageUrl: '/resize_abt.webp',
    spotifyUrl: 'https://open.spotify.com/album/1zCT0YUVggnzkZJK5VP0yd',
    appleUrl: 'https://music.apple.com/ng/album/you-are-our-everything-single/1803827230',
    youtubeUrl:
      'https://www.youtube.com/watch?v=fK_tCBcnqGs&list=OLAK5uy_nO6i6o85ojjKvu8QQlrV0keV4M_T7PPe4',
    deezerUrl: 'https://www.deezer.com/us/album/695949191',
    amazonUrl: 'https://music.amazon.com/albums/B0DSM7QGLF?tag=fndcmpgns-20',
    sortOrder: 1,
  },
];

function toFallbackVideo(id: string, title: string, youtubeId: string): MediaItem {
  return {
    id,
    title,
    type: 'video',
    fileName: '',
    contentType: '',
    fileSizeBytes: 0,
    publicUrl: `https://youtu.be/${youtubeId}`,
    isPublished: true,
    viewCount: 0,
    downloadCount: 0,
    createdAt: new Date().toISOString(),
  };
}

export const fallbackVideos: MediaItem[] = [
  toFallbackVideo('fallback-video-0', 'Not Be Moved', '2JV1k5GGjmk'),
  toFallbackVideo('fallback-video-1', 'Nothing Compares To You', 'Dw5S-jzzboA'),
  toFallbackVideo('fallback-video-2', 'Dwelling Place (Forever God)', 'KoVkhbrRjf8'),
  toFallbackVideo('fallback-video-3', 'Look To You', '7BN7i4puuis'),
  toFallbackVideo('fallback-video-4', "It's A New Day (Thank You For Today)", 'Ak0LZgfHMa0'),
];
