export const releases = [
  {
    slug: 'very-glorious',
    title: 'Very Glorious',
    artwork: '/veryGlorious.jpg',
    description: 'Stream Very Glorious by ClaudyGod on your preferred music platform.',
    links: {
      Spotify: 'https://open.spotify.com/album/1zCT0YUVggnzkZJK5VP0yd',
      'Apple Music': 'https://music.apple.com/ng/album/very-glorious/1789665669',
      YouTube: 'https://youtube.com/@claudygodministries',
      Deezer: 'https://www.deezer.com/us/album/695949191',
      'Amazon Music': 'https://music.amazon.com/albums/B0DSM7QGLF',
    },
  },
  {
    slug: 'you-are-our-everything',
    title: 'You Are Our Everything',
    artwork: '/CoverArt.webp',
    description: 'Stream You Are Our Everything by ClaudyGod on your preferred music platform.',
    links: {
      Spotify: 'https://open.spotify.com/album/1zCT0YUVggnzkZJK5VP0yd',
      'Apple Music': 'https://music.apple.com/ng/album/you-are-our-everything-single/1803827230',
      YouTube: 'https://www.youtube.com/watch?v=fK_tCBcnqGs',
      Deezer: 'https://www.deezer.com/us/album/695949191',
      'Amazon Music': 'https://music.amazon.com/albums/B0DSM7QGLF',
    },
  },
] as const;

export function getRelease(slug: string) {
  return releases.find((release) => release.slug === slug);
}
