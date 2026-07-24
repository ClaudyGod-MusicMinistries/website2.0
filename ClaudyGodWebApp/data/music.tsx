import { FaSpotify, FaApple, FaYoutube, FaDeezer, FaAmazon } from 'react-icons/fa6';
import type { MusicPlatform } from '@/types/music';

export const securedMusicPlatforms: MusicPlatform[] = [
  {
    name: 'Spotify',
    url: 'https://open.spotify.com/album/1zCT0YUVggnzkZJK5VP0yd',
    icon: FaSpotify,
    bgColor: 'bg-[#1DB954]',
    textColor: 'text-white',
    verified: true,
    safeRedirect: true,
    brandColor: '#1DB954',
  },
  {
    name: 'Apple Music',
    url: 'https://music.apple.com/ng/album/very-glorious/1789665669',
    icon: FaApple,
    bgColor: 'bg-[#000]',
    textColor: 'text-white',
    verified: true,
    safeRedirect: true,
    brandColor: '#FC3C44',
  },
  {
    name: 'YouTube',
    url: 'https://youtube.com/@claudygodministries?si=6Ne99tTC48Ihv44s',
    icon: FaYoutube,
    bgColor: 'bg-[#FF0000]',
    textColor: 'text-white',
    verified: true,
    safeRedirect: true,
    brandColor: '#FF0000',
  },
  {
    name: 'Deezer',
    url: 'https://www.deezer.com/us/album/695949191',
    icon: FaDeezer,
    bgColor: 'bg-[#FEAA2D]',
    textColor: 'text-black',
    verified: true,
    safeRedirect: true,
    brandColor: '#FEAA2D',
  },
  {
    name: 'Amazon Music',
    url: 'https://music.amazon.com/albums/B0DSM7QGLF?tag=fndcmpgns-20',
    icon: FaAmazon,
    bgColor: 'bg-[#FF9900]',
    textColor: 'text-black',
    verified: true,
    safeRedirect: true,
    brandColor: '#FF9900',
  },
];

/**
 * The Music page's own "just dropped" spotlight — a short celebratory
 * announcement plus the smart-link that routes listeners to whichever
 * streaming platform they use. The actual release (cover art, title) is
 * pulled from the real backend via useAlbums(); this is just the voice/
 * link layer that isn't part of the Album entity.
 */
export const latestReleaseAnnouncement = {
  message:
    'Yay!!! Glory to Jesus! Now available on Spotify, Pandora, Apple Music, iTunes, and all other streaming platforms!',
  streamUrl: 'https://share.google/gXGAj1AnfnRQ9OviK',
};

export const latestReleasePlatforms: MusicPlatform[] = [
  {
    name: 'Spotify',
    url: 'https://open.spotify.com/album/1zCT0YUVggnzkZJK5VP0yd',
    icon: FaSpotify,
    bgColor: 'bg-[#1DB954]',
    textColor: 'text-white',
    verified: true,
    safeRedirect: true,
    brandColor: '#1DB954',
  },
  {
    name: 'Apple Music',
    url: 'https://music.apple.com/ng/album/you-are-our-everything-single/1803827230',
    icon: FaApple,
    bgColor: 'bg-[#000]',
    textColor: 'text-white',
    verified: true,
    safeRedirect: true,
    brandColor: '#FC3C44',
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/watch?v=fK_tCBcnqGs&list=OLAK5uy_nO6i6o85ojjKvu8QQlrV0keV4M_T7PPe4',
    icon: FaYoutube,
    bgColor: 'bg-[#FF0000]',
    textColor: 'text-white',
    verified: true,
    safeRedirect: true,
    brandColor: '#FF0000',
  },
  {
    name: 'Deezer',
    url: 'https://www.deezer.com/us/album/695949191',
    icon: FaDeezer,
    bgColor: 'bg-[#FEAA2D]',
    textColor: 'text-black',
    verified: true,
    safeRedirect: true,
    brandColor: '#FEAA2D',
  },
  {
    name: 'Amazon Music',
    url: 'https://music.amazon.com/albums/B0DSM7QGLF?tag=fndcmpgns-20',
    icon: FaAmazon,
    bgColor: 'bg-[#FF9900]',
    textColor: 'text-black',
    verified: true,
    safeRedirect: true,
    brandColor: '#FF9900',
  },
];

export const socialPlatforms = [
  {
    name: 'Facebook',
    iconName: 'FaFacebook',
    color: '#1877F2',
    url: 'https://facebook.com/ClaudyGod',
    handle: '@ClaudyGod',
  },
  {
    name: 'YouTube',
    iconName: 'FaYoutube',
    color: '#FF0000',
    url: 'https://www.youtube.com/channel/UC0RUDNzIiSLxoWGcNQbrLNQ',
    handle: '@ClaudyGod',
  },
  {
    name: 'Twitter',
    iconName: 'FaXTwitter',
    color: '#1DA1F2',
    url: 'https://twitter.com/claudygod',
    handle: '@ClaudyGod',
  },
  {
    name: 'TikTok',
    iconName: 'FaTiktok',
    color: '#FFFFFF',
    url: 'https://tiktok.com/@claudygod',
    handle: '@ClaudyGod',
  },
  {
    name: 'Spotify',
    iconName: 'FaSpotify',
    color: '#1DB954',
    url: 'https://open.spotify.com/artist/claudygod',
    handle: '@ClaudyGod',
  },
  {
    name: 'Apple Music',
    iconName: 'FaApple',
    color: '#FFFFFF',
    url: 'https://music.apple.com/artist/claudygod',
    handle: '@ClaudyGod',
  },
];
