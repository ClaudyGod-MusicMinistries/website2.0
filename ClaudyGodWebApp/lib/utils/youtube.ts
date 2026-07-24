/**
 * YouTube serves several fixed thumbnail sizes per video, and they are NOT
 * all the same aspect ratio:
 *  - `maxresdefault.jpg` — the true 16:9 frame (1280x720). Matches every
 *    `aspect-video` container on the site exactly, so `object-cover` needs
 *    zero cropping. Only exists for videos uploaded at 720p or higher —
 *    404s for older/lower-res uploads.
 *  - `hqdefault.jpg` — YouTube's legacy thumbnail (480x360, 4:3). Always
 *    exists, but it's a center-cropped slice of the frame, not a
 *    letterboxed one — stretching it into a 16:9 box crops the sides of an
 *    already-cropped image, losing more picture than necessary.
 * `maxresdefault` is always the right first choice; `hqdefault` is a
 * last-resort fallback for the videos that don't have it, handled by
 * `components/ui/YoutubeThumbnail`'s onError swap rather than guessed here.
 */
export function youtubeMaxThumbnail(youtubeId: string): string {
  return `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
}

export function youtubeFallbackThumbnail(youtubeId: string): string {
  return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
}
