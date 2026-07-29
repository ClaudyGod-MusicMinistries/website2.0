'use client';

import Image, { type ImageProps } from 'next/image';
import { youtubeThumbnail } from '@/lib/utils/youtube';

interface YoutubeThumbnailProps extends Omit<ImageProps, 'src' | 'alt'> {
  youtubeId: string;
  alt: string;
}

/**
 * Uses YouTube's consistently available thumbnail URL so the Next image
 * optimizer never has to fail a max-resolution request before falling back.
 */
export function YoutubeThumbnail({ youtubeId, alt, ...props }: YoutubeThumbnailProps) {
  return <Image {...props} src={youtubeThumbnail(youtubeId)} alt={alt} />;
}
