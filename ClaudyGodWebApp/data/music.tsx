import { FaSpotify, FaApple, FaYoutube, FaDeezer, FaAmazon } from 'react-icons/fa6';
import type { MusicPlatform } from '@/types/music';

const CDN = 'https://cdn.jsdelivr.net/gh/ClaudyGod-MusicMinistries/CGM-Assets@latest';

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

export const albums = [
  {
    title: 'Lover of my Soul',
    image: `${CDN}/CoverArt.jpg`,
    links: {
      spotify: 'https://open.spotify.com/album/1QtuBqSvCerflLbHTiniCI',
      youtube: 'https://youtu.be/ivj5gVeTCJQ?si=AXXbrP8SllDc4FeV',
      apple: 'https://music.apple.com/ng/album/lover-of-my-soul/1701236800',
      deezer: 'https://link.deezer.com/s/30nBesnOQ9vP09F3MEDqb',
    },
  },
  {
    title: 'Very Glorious',
    image: `${CDN}/Bg_13.webp`,
    links: {
      spotify: 'https://open.spotify.com/track/4Y59X6LBT2FZQbkcQAa2AQ?si=90ee973a0546426c',
      youtube: 'https://youtu.be/F36AiXSSADQ?si=yA2Y0mXeZtIYosy3',
      apple: 'https://music.apple.com/ng/song/very-glorious/1789665670',
      deezer: 'https://link.deezer.com/s/30nBb5QPKuvysqFk399wN',
    },
  },
  {
    title: 'King of Heavens',
    image: `${CDN}/desktopBg.jpg`,
    links: {
      spotify: 'https://open.spotify.com/track/6Q07B7YUlHjtbI8KMoBfMy?si=b27d98de60ed41be',
      youtube: 'https://youtu.be/W_Gfia-R3Ec?si=KQP_0DQ6UjZjSm7x',
      apple: 'https://music.apple.com/ng/album/king-of-heaven/1771952997',
      deezer: 'https://link.deezer.com/s/30nBf1vCy35iPXlehC4lC',
    },
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

export const galleryCategories = [
  {
    title: 'ClaudyGod with Students',
    description: 'Engaging with the next generation of worshippers in universities and youth gatherings across Port Harcourt.',
    images: [
      `${CDN}/Ministry6.jpg`,
      `${CDN}/Ministry12.jpg`,
      `${CDN}/Ministry10.jpg`,
    ],
  },
  {
    title: 'Worship Moments',
    description: 'Powerful moments of praise and worship that transformed lives and brought heaven to earth.',
    images: [`${CDN}/Ministry2.jpg`, `${CDN}/Ministry3.jpg`],
  },
  {
    title: 'Min. ClaudyGod With Guests',
    description: 'Collaborative moments with ministry partners and guest worshippers who joined our gatherings.',
    images: [
      `${CDN}/Ministry14.jpg`,
      `${CDN}/Ministry13.jpg`,
      `${CDN}/Ministry1.jpg`,
      `${CDN}/Ministry3.jpg`,
      `${CDN}/Ministry11.jpg`,
    ],
  },
  {
    title: 'Community Impact',
    description: 'Touching lives beyond the worship center through outreach and community transformation programs.',
    images: [`${CDN}/Ministry8.jpg`, `${CDN}/Ministry9.jpg`],
  },
];

export const teamMembers = [
  {
    id: 2,
    name: 'Minister ClaudyGod - Music Team',
    role: 'Music Team',
    description: `"A dedicated team of passionate worshipers committed to leading people into deep encounters with God through spirit-filled music, excellence in sound, and heartfelt praise."`,
    image: `${CDN}/Ministry2.jpg`,
  },
  {
    id: 3,
    name: 'Minister ClaudyGod - Music Team',
    role: 'Music Team',
    description: `"A dedicated team of passionate worshipers committed to leading people into deep encounters with God through spirit-filled music, excellence in sound, and heartfelt praise."`,
    image: `${CDN}/Ministry3.jpg`,
  },
  {
    id: 4,
    name: 'Minister ClaudyGod - Music Team',
    role: 'Music Team',
    description: `"A dedicated team of passionate worshipers committed to leading people into deep encounters with God through spirit-filled music, excellence in sound, and heartfelt praise."`,
    image: `${CDN}/Ministry4.jpg`,
  },
];
