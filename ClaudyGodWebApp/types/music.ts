import type { IconType } from 'react-icons';

export interface MusicPlatform {
  name: string;
  url: string;
  icon: IconType;
  bgColor: string;
  textColor: string;
  verified: boolean;
  safeRedirect: boolean;
  brandColor?: string;
}

export interface Album {
  id: number;
  title: string;
  year: string;
  image: string;
  tracks: Array<{ id: number; title: string; duration: string }>;
}
