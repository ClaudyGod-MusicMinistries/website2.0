import { Transition, Variants } from 'framer-motion';
import type { ReactNode, Dispatch, SetStateAction } from 'react';

export interface HeroSlide {
  videoUrl?: string;
  id: number;
  imageUrl?: string;
  imageUrlMobile?: string;
  imageUrlDesktop?: string;
  type: 'quote' | 'form' | 'streaming' | 'cta' | 'music';
  content?: {
    quote?: string;
    reference?: string;
    formTitle?: string;
    streamingPlatforms?: { name: string; iconName: string; url: string }[];
    listenText?: string;
  };
}

export interface TextVariantsProps {
  children: ReactNode;
  className?: string;
}

export interface SlideContentProps {
  slide: HeroSlide;
  navigate: (path: string) => void;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const textVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 10,
      duration: 0.5,
    } as Transition,
  },
};

export const imageVariants: Variants = {
  hidden: { scale: 1.1, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 3, ease: 'easeInOut' } as Transition,
  },
};

export const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 2.5, ease: 'easeInOut' } as Transition,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? '-100%' : '100%',
    opacity: 0,
    transition: { duration: 2.5, ease: 'easeInOut' } as Transition,
  }),
};

const springTransition: Transition = { type: 'spring', damping: 25, stiffness: 300 };

export const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 1.5 },
  visible: { opacity: 1, scale: 1, transition: springTransition },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } as Transition },
};

export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    imageUrlMobile: '/tour_1.jpg',
    imageUrlDesktop: '/tour_1.jpg',
    type: 'quote',
    content: {
      quote: 'Enter Into His Gates With Thanksgiving And Into His Courts With Praise; Be Thankful Unto Him, and Bless His Name.',
      reference: '— Psalm 100:4',
    },
  },
  {
    id: 2,
    imageUrl: '/aboutUs.webp',
    type: 'cta',
    content: {},
  },
  {
    id: 3,
    imageUrl: '/resize_abt.webp',
    type: 'music',
    content: {
      listenText: 'Experience the Divine Melody',
      streamingPlatforms: [
        { name: 'Spotify', iconName: 'FaSpotify', url: 'https://open.spotify.com/album/2MY5xlrYfuvKXaYfdB5v2A' },
        { name: 'Apple Music', iconName: 'FaApple', url: 'https://music.apple.com/ng/album/very-glorious/1789665669' },
        { name: 'YouTube', iconName: 'FaYoutube', url: 'https://youtube.com/@claudygodministries' },
        { name: 'Deezer', iconName: 'FaDeezer', url: 'https://www.deezer.com/us/album/695949191' },
        { name: 'Pandora', iconName: 'FaMusic', url: 'https://found.ee/58RtlR' },
        { name: 'Amazon', iconName: 'FaAmazon', url: 'https://music.amazon.com/albums/B0DSM7QGLF' },
      ],
    },
  },
  {
    id: 4,
    imageUrl: '/manBack.jpg',
    type: 'quote',
    content: {
      quote: 'Praise the Lord Most High',
      reference: '— Psalm 100:4',
    },
  },
];
