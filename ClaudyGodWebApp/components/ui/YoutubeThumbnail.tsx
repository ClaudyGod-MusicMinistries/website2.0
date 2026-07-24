'use client';

import { useState } from 'react';
import Image, { type ImageProps } from 'next/image';
import { youtubeMaxThumbnail, youtubeFallbackThumbnail } from '@/lib/utils/youtube';

interface YoutubeThumbnailProps extends Omit<ImageProps, 'src' | 'alt'> {
  youtubeId: string;
  alt: string;
}

/**
 * Requests YouTube's true 16:9 thumbnail (maxresdefault) and transparently
 * swaps to the always-available but 4:3-cropped hqdefault on load failure —
 * every `aspect-video` card on the site should render its thumbnail through
 * this instead of hand-building a `hqdefault.jpg` URL (which was the actual
 * cause of thumbnails looking cropped/zoomed: a 4:3 source stretched into a
 * 16:9 box crops it a second time). object-cover stays correct here since,
 * unlike album/product art, YouTube's own frame genuinely is 16:9 — the fix
 * is fetching the size that matches, not letterboxing.
 */
export function YoutubeThumbnail({ youtubeId, alt, ...props }: YoutubeThumbnailProps) {
  const [failed, setFailed] = useState(false);

  return (
    <Image
      {...props}
      src={failed ? youtubeFallbackThumbnail(youtubeId) : youtubeMaxThumbnail(youtubeId)}
      alt={alt}
      onError={() => setFailed(true)}
    />
  );
}
