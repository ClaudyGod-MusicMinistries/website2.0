import { CalendarDays, Play, type LucideIcon } from 'lucide-react';
import type { VariantProps } from 'class-variance-authority';
import type { buttonVariants } from '@/lib/theme/buttons';

export interface HeroContent {
  backgroundImage: string;
  eyebrow: string;
  headingLine1: string;
  headingLine2: string;
  subtitle: string;
}

export const heroContent: HeroContent = {
  backgroundImage: '/HeroBackground.jpg',
  eyebrow: 'ClaudyGod Music Ministries',
  headingLine1: 'Spirit-Filled Worship,',
  headingLine2: 'Sent to the Nations.',
  subtitle:
    'Gospel music, ministry, and worship from Minister ClaudyGod — seven albums, two decades of ministry, one calling.',
};

export interface HeroCTA {
  label: string;
  href: string;
  variant: NonNullable<VariantProps<typeof buttonVariants>['variant']>;
  icon?: LucideIcon;
}

export const heroCTAs: HeroCTA[] = [
  { label: 'Listen Now', href: '/music', variant: 'primary', icon: Play },
  { label: 'Book ClaudyGod', href: '/bookings', variant: 'secondary', icon: CalendarDays },
];
