import Image from 'next/image';
import { cn } from '@/lib/utils/cn';

interface ContainedImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  quality?: number;
}

/**
 * A crop-safe image frame for any content whose source aspect ratio isn't
 * guaranteed to match its display slot — album art, product photos, or
 * anything else uploaded independently of the layout that shows it.
 * object-cover on a fixed-aspect box silently clips whatever doesn't match
 * (title text, logos, product edges); this renders the image with
 * object-contain — never cropped — over a restrained branded frame. It uses
 * one optimized request only: a previous blurred CSS copy downloaded the
 * original asset again and doubled the cost of every card image.
 */
export function ContainedImage({
  src,
  alt,
  className,
  sizes = '400px',
  priority,
  quality = 75,
}: ContainedImageProps) {
  return (
    <div
      className={cn(
        'relative w-full h-full overflow-hidden bg-gradient-to-br from-surface-elevated via-surface-overlay to-purple-950',
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        quality={quality}
        className="object-contain"
        sizes={sizes}
      />
    </div>
  );
}
