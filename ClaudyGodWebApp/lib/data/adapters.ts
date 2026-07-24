import type { StoreProduct, Album, MediaItem } from '@/lib/data/types';
import type { Product } from '@/types/store';
import { youtubeMaxThumbnail } from '@/lib/utils/youtube';

/**
 * Maps the real backend's StoreProduct shape (title, single image, inStock)
 * onto the frontend's existing Product/CartItem contract (name, image
 * gallery) so the cart/checkout flow — already built against that
 * contract — doesn't need to change while the data source moves from a
 * static file to the real API.
 */
export function toProduct(sp: StoreProduct): Product {
  return {
    id: sp.id,
    name: sp.title,
    image: sp.image,
    images: sp.images && sp.images.length > 0 ? sp.images : [sp.image],
    price: sp.price,
    category: sp.category,
    description: sp.description,
    rating: sp.rating,
  };
}

type StreamingKey = 'spotify' | 'apple' | 'youtube' | 'deezer';

export interface AlbumView {
  id: string;
  title: string;
  image: string;
  links: Partial<Record<StreamingKey, string>>;
}

/**
 * Maps the backend's Album (imageUrl, spotifyUrl/appleUrl/youtubeUrl/deezerUrl as flat
 * fields — not a streamingLinks[] array) onto the {image, links: {spotify, apple, ...}}
 * shape AlbumGrid/AlbumTimeline/MusicHighlight already render. Note: the backend also has
 * an amazonUrl field with no UI slot here yet — add one (icon + links.amazon) if that
 * platform needs to be surfaced.
 */
export function toAlbumView(a: Album): AlbumView {
  const links: AlbumView['links'] = {};
  if (a.spotifyUrl) links.spotify = a.spotifyUrl;
  if (a.appleUrl) links.apple = a.appleUrl;
  if (a.youtubeUrl) links.youtube = a.youtubeUrl;
  if (a.deezerUrl) links.deezer = a.deezerUrl;
  return { id: a.id, title: a.title, image: a.imageUrl ?? '', links };
}

export interface VideoView {
  id: string;
  title: string;
  youtubeId: string | null;
  duration: string;
  thumbnailUrl: string;
  createdAt: string;
}

function extractYouTubeId(url: string): string | null {
  const m = url.match(/(?:youtu\.be\/|v=|\/embed\/)([^?&]+)/);
  return m ? m[1] : null;
}

function formatDuration(seconds?: number): string {
  if (!seconds) return '';
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

/**
 * Maps the backend's MediaItem (generic uploaded-file model: publicUrl,
 * durationSeconds, no video-specific category taxonomy) onto the flat
 * shape VideoGrid/FeaturedVideos/LatestRelease render. The backend has no
 * equivalent of the old static file's 4-way category split (Music Videos/
 * Visualizers/Live Sessions/Christmas) — that taxonomy doesn't exist
 * server-side, so it's dropped rather than fabricated. Items whose
 * publicUrl isn't a YouTube link return youtubeId: null; every consumer's
 * player is a YouTube embed, so those get filtered out.
 *
 * `thumbnailUrl` here is a defensive default (maxresdefault — the true
 * 16:9 frame) for any consumer that renders it as a plain string; actual
 * `<img>`/`<Image>` rendering should go through youtubeId + the
 * `YoutubeThumbnail` component instead, which also handles the
 * maxresdefault-doesn't-exist-yet case with a live fallback this string
 * alone can't provide.
 */
export function toVideoView(m: MediaItem): VideoView {
  const youtubeId = extractYouTubeId(m.publicUrl);
  return {
    id: m.id,
    title: m.title,
    youtubeId,
    duration: formatDuration(m.durationSeconds),
    thumbnailUrl: m.thumbnailPath || (youtubeId ? youtubeMaxThumbnail(youtubeId) : ''),
    createdAt: m.createdAt,
  };
}
