const CDN = 'https://cdn.jsdelivr.net/gh/ClaudyGod-MusicMinistries/CGM-Assets@latest';

export const newsAlbums = [
  {
    title: 'Lover of my Soul',
    image: '/CD1.png',
    links: {
      spotify: 'https://open.spotify.com/album/1QtuBqSvCerflLbHTiniCI',
      youtube: 'https://youtu.be/ivj5gVeTCJQ?si=AXXbrP8SllDc4FeV',
      apple: 'https://music.apple.com/ng/album/lover-of-my-soul/1701236800',
      deezer: 'https://link.deezer.com/s/30nBesnOQ9vP09F3MEDqb',
    },
  },
  {
    title: 'Very Glorious',
    image: '/resize_abt.webp',
    links: {
      spotify: 'https://open.spotify.com/track/4Y59X6LBT2FZQbkcQAa2AQ?si=90ee973a0546426c',
      youtube: 'https://youtu.be/F36AiXSSADQ?si=yA2Y0mXeZtIYosy3',
      apple: 'https://music.apple.com/ng/song/very-glorious/1789665670',
      deezer: 'https://link.deezer.com/s/30nBb5QPKuvysqFk399wN',
    },
  },
];

export const socialShareLinks = [
  { name: 'Facebook', iconName: 'FaFacebookF', color: '#1877F2', url: 'https://www.facebook.com/ClaudyGod/' },
  { name: 'YouTube', iconName: 'FaYoutube', color: '#FF0000', url: 'https://www.youtube.com/@ClaudyGODMinistries' },
  { name: 'Twitter', iconName: 'FaXTwitter', color: '#1DA1F2', url: 'https://twitter.com/claudygod' },
  { name: 'TikTok', iconName: 'FaTiktok', color: '#FFFFFF', url: 'https://tiktok.com/@claudygod' },
  { name: 'Spotify', iconName: 'FaSpotify', color: '#1DB954', url: 'https://open.spotify.com/artist/claudygod' },
  { name: 'Apple Music', iconName: 'FaApple', color: '#FFFFFF', url: 'https://music.apple.com/ng/artist/claudygod/1440081695' },
];

export const tourDates = [
  {
    id: 1,
    city: 'Port Harcourt',
    state: 'Rivers State',
    venue: 'University of Port Harcourt Auditorium',
    date: '2025-07-12',
    time: '5:00 PM',
    image: `${CDN}/Ministry6.jpg`,
    ticketUrl: '#',
  },
  {
    id: 2,
    city: 'Lagos',
    state: 'Lagos State',
    venue: 'Tafawa Balewa Square',
    date: '2025-08-02',
    time: '6:00 PM',
    image: `${CDN}/Ministry4.jpg`,
    ticketUrl: '#',
  },
  {
    id: 3,
    city: 'Aba',
    state: 'Abia State',
    venue: 'Enyimba Cultural Centre',
    date: '2025-08-16',
    time: '5:00 PM',
    image: `${CDN}/Ministry5.jpg`,
    ticketUrl: '#',
  },
  {
    id: 4,
    city: 'Imo',
    state: 'Imo State',
    venue: 'Imo State University',
    date: '2025-09-06',
    time: '5:00 PM',
    image: `${CDN}/Ministry7.jpg`,
    ticketUrl: '#',
  },
];
