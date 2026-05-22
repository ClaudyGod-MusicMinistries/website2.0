import Image from 'next/image';
import { cn } from '@/utils/cn';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const dimensions = {
  sm: { w: 110, h: 34 },
  md: { w: 140, h: 44 },
  lg: { w: 170, h: 54 },
};

export function Logo({ size = 'md', className }: LogoProps) {
  const d = dimensions[size];
  return (
    <Image
      src="/ClaudyGoLogo.webp"
      alt="ClaudyGod Music Ministries"
      width={d.w}
      height={d.h}
      className={cn('object-contain', className)}
      priority
    />
  );
}
