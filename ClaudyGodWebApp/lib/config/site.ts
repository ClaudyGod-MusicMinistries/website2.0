/**
 * Single source of truth for site identity — domain, brand assets, contact,
 * and social links. The canonical domain is claudygod.org; every place that
 * previously hardcoded a domain (several drifted to the wrong claudygod.com)
 * imports from here instead, so there is exactly one place to update if the
 * domain, logo, or a social handle ever changes.
 */

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://claudygod.org').replace(/\/$/, '');

export const SITE_NAME = 'ClaudyGod Music Ministries';

export const SITE_DESCRIPTION =
  'Official website of Minister ClaudyGod — Nigerian gospel music artist, worship leader, and evangelist. Stream 7 albums, watch worship videos, book for events, and follow the ministry.';

export const OG_IMAGE_PATH = '/ClaudySocial.jpg';
export const OG_IMAGE = `${SITE_URL}${OG_IMAGE_PATH}`;

export const LOGO_PATH = '/ClaudyGoLogo.webp';
export const LOGO_URL = `${SITE_URL}${LOGO_PATH}`;

export const CONTACT_EMAIL = 'bookings@claudygod.org';

export const SOCIAL_URLS = {
  facebook: 'https://www.facebook.com/ClaudyGod/',
  twitter: 'https://twitter.com/claudygod',
  instagram: 'https://www.instagram.com/singerclaudygod/',
  linkedin: 'https://www.linkedin.com/in/claudygod-music-and-ministries-b2887094',
  tiktok: 'https://www.tiktok.com/@claudygod',
  spotify: 'https://open.spotify.com/album/1zCT0YUVggnzkZJK5VP0yd',
  appleMusic: 'https://music.apple.com/ng/artist/claudygod/1440081695',
  youtube: 'https://www.youtube.com/channel/UC0RUDNzIiSLxoWGcNQbrLNQ',
  deezer: 'https://www.deezer.com/us/album/695949191',
  amazonMusic: 'https://music.amazon.com/albums/B0DSM7QGLF',
} as const;

/** Ordered list form of SOCIAL_URLS for anywhere that needs to iterate (footer, JSON-LD `sameAs`, ...). */
export const SOCIAL_URL_LIST = Object.values(SOCIAL_URLS);
