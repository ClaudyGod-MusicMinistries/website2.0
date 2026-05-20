import { FaSpotify, FaYoutube, FaApple, FaDeezer, FaAmazon, FaSoundcloud, FaTiktok } from 'react-icons/fa6';
import { FaMusic } from 'react-icons/fa';
import type { IconType } from 'react-icons';

export interface StreamingPlatform {
  name: string;
  url: string;
  icon: IconType;
  color: string;
}

export const streamingPlatforms: StreamingPlatform[] = [
  {
    name: 'Deezer',
    url: 'https://www.deezer.com/artist/53266602',
    icon: FaDeezer,
    color: 'bg-[#FEAA2D] hover:bg-[#e6951a]',
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/@ClaudyGODMinistries',
    icon: FaYoutube,
    color: 'bg-[#FF0000] hover:bg-[#cc0000]',
  },
  {
    name: 'Amazon Music',
    url: 'https://music.amazon.com/albums/B0DSM7QGLF',
    icon: FaAmazon,
    color: 'bg-[#00A8E1] hover:bg-[#0087b8]',
  },
  {
    name: 'Spotify',
    url: 'https://open.spotify.com/album/2MY5xlrYfuvKXaYfdB5v2A',
    icon: FaSpotify,
    color: 'bg-[#1DB954] hover:bg-[#1aa34a]',
  },
  {
    name: 'Apple Music',
    url: 'https://music.apple.com/ng/artist/claudygod/1440081695',
    icon: FaApple,
    color: 'bg-gradient-to-r from-[#FA2C56] to-[#8A2BE2] hover:from-[#e11c46] hover:to-[#7a1ac7]',
  },
  {
    name: 'SoundCloud',
    url: 'https://soundcloud.com/claudygod',
    icon: FaSoundcloud,
    color: 'bg-[#FF7700] hover:bg-[#e66800]',
  },
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@claudygod',
    icon: FaTiktok,
    color: 'bg-black hover:bg-gray-800',
  },
  {
    name: 'More Platforms',
    url: 'https://found.ee/58RtlR',
    icon: FaMusic,
    color: 'bg-purple-500 hover:bg-purple-600',
  },
];
