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
    title: 'You Are Our Everything',
    image: '/CoverArt.webp',
    links: {
      spotify: 'https://open.spotify.com/album/1zCT0YUVggnzkZJK5VP0yd',
      youtube: 'https://www.youtube.com/watch?v=fK_tCBcnqGs&list=OLAK5uy_nO6i6o85ojjKvu8QQlrV0keV4M_T7PPe4',
      apple: 'https://music.apple.com/ng/album/you-are-our-everything-single/1803827230',
      deezer: 'https://www.deezer.com/us/album/695949191',
    },
  },
  {
    title: 'Very Glorious',
    image: '/veryGlorious.jpg',
    links: {
      spotify: 'https://open.spotify.com/track/4Y59X6LBT2FZQbkcQAa2AQ?si=90ee973a0546426c',
      youtube: 'https://youtu.be/F36AiXSSADQ?si=yA2Y0mXeZtIYosy3',
      apple: 'https://music.apple.com/ng/song/very-glorious/1789665670',
      deezer: 'https://link.deezer.com/s/30nBb5QPKuvysqFk399wN',
    },
  },
  {
    title: 'We Would Reign',
    image: '/MusicBanner5.webp',
    links: {
      spotify: 'https://open.spotify.com/search/we%20would%20reign%20claudygod',
      youtube: 'https://www.youtube.com/@claudygodministries',
      apple: 'https://music.apple.com/search?term=claudygod',
      deezer: 'https://www.deezer.com/search/claudygod',
    },
  },
  {
    title: 'Lover of my Soul',
    image: '/MusicBanner1.webp',
    links: {
      spotify: 'https://open.spotify.com/album/1QtuBqSvCerflLbHTiniCI',
      youtube: 'https://youtu.be/ivj5gVeTCJQ?si=AXXbrP8SllDc4FeV',
      apple: 'https://music.apple.com/ng/album/lover-of-my-soul/1701236800',
      deezer: 'https://link.deezer.com/s/30nBesnOQ9vP09F3MEDqb',
    },
  },
  {
    title: 'King of Heavens',
    image: '/MusicBanner6.webp',
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
    title: 'Tour Photos',
    description: 'Memorable moments from our worship tours and ministry events across different cities and venues.',
    images: [
      '/Tour_Ph_1.webp',
      '/Tour_Ph_2.webp',
      '/Tour_Ph_3.webp',
      '/Tour_ph_4.webp',
      '/Tour_Ph_5.webp',
      '/Tour_ph_6.webp',
      '/Tour_Ph_7.webp',
      '/Tour_Ph_8.webp',
      '/Tour_Ph_9.webp',
      '/Tour_Ph_10.webp',
      '/Tour_Ph_11.webp',
      '/Tour_Ph_12.webp',
      '/Tour_Ph_13.webp',
      '/Tour_Ph_14.webp',
    ],
  },
  {
    title: 'ClaudyGod with Students',
    description: 'Engaging with the next generation of worshippers in universities and youth gatherings across Port Harcourt.',
    images: [
      '/mum1.jpg',
      '/aboutUs.webp',
      '/manBack.jpg',
    ],
  },
  {
    title: 'Worship Moments',
    description: 'Powerful moments of praise and worship that transformed lives and brought heaven to earth.',
    images: ['/resize_abt.webp', '/tour_1.jpg'],
  },
  {
    title: 'Min. ClaudyGod With Guests',
    description: 'Collaborative moments with ministry partners and guest worshippers who joined our gatherings.',
    images: [
      '/manBack.jpg',
      '/mum1.jpg',
      '/aboutUs.webp',
      '/tour_1.jpg',
      '/resize_abt.webp',
    ],
  },
  {
    title: 'Community Impact',
    description: 'Touching lives beyond the worship center through outreach and community transformation programs.',
    images: ['/tour_1.jpg', '/manBack.jpg'],
  },
];

export const teamMembers = [
  {
    id: 1,
    name: 'Team Member',
    role: 'Ministry Team',
    description: 'Dedicated to spreading the Gospel through worship and service.',
    image: '/team_ph (1).webp',
  },
  {
    id: 2,
    name: 'Team Member',
    role: 'Ministry Team',
    description: 'Committed to excellence in ministry and worship leadership.',
    image: '/team_ph (2).webp',
  },
  {
    id: 3,
    name: 'Team Member',
    role: 'Ministry Team',
    description: 'Passionate about impacting lives through faith and music.',
    image: '/team_ph (3).webp',
  },
  {
    id: 4,
    name: 'Team Member',
    role: 'Ministry Team',
    description: 'Devoted to spiritual growth and community outreach.',
    image: '/team_ph (4).webp',
  },
  {
    id: 5,
    name: 'Team Member',
    role: 'Ministry Team',
    description: 'Inspired by God\'s love to serve with purpose and joy.',
    image: '/team_ph (5).webp',
  },
  {
    id: 6,
    name: 'Team Member',
    role: 'Ministry Team',
    description: 'Building a community of worship and spiritual transformation.',
    image: '/team_ph (6).webp',
  },
  {
    id: 7,
    name: 'Team Member',
    role: 'Ministry Team',
    description: 'Empowering believers through worship, teaching, and mentorship.',
    image: '/team_ph (7).webp',
  },
];
