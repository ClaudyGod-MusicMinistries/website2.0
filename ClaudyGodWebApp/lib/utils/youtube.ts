/**
 * YouTube guarantees the legacy high-quality thumbnail far more consistently
 * than maxresdefault. Using the reliable URL prevents Next's image optimizer
 * from producing a visible 404 for older or lower-resolution videos.
 */
export function youtubeThumbnail(youtubeId: string): string {
  return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
}
