import Image from 'next/image';
import { cn } from '@/lib/utils/cn';

interface ContainedImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

/**
 * A crop-safe image frame for any content whose source aspect ratio isn't
 * guaranteed to match its display slot — album art, product photos, or
 * anything else uploaded independently of the layout that shows it.
 * object-cover on a fixed-aspect box silently clips whatever doesn't match
 * (title text, logos, product edges); this renders the image with
 * object-contain — never cropped — filled out to the edges with a blurred,
 * fully-opaque copy of itself as backdrop instead of empty space. A source
 * that already matches the container's aspect ratio fills it edge to edge
 * and the backdrop is invisible, so this is safe as the default treatment
 * regardless of whether a given image happens to be a clean fit.
 */
export function ContainedImage({
  src,
  alt,
  className,
  sizes = '400px',
  priority,
}: ContainedImageProps) {
  return (
    <div className={cn('relative w-full h-full overflow-hidden', className)}>
      {/* Blurred backdrop fill — fully opaque so it reads as a rich glow,
          not a washed-out haze, when it shows through as letterboxing. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 scale-110 bg-cover bg-center blur-2xl"
        style={{ backgroundImage: `url(${src})` }}
      />
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className="object-contain"
        sizes={sizes}
      />
    </div>
  );
}
