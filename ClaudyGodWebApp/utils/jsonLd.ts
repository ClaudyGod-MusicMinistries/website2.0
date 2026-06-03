/**
 * Centralised JSON-LD schema builders.
 * Each function returns a plain object; render with:
 *   <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
 */

export const SITE_URL  = 'https://claudygod.com';
export const SITE_NAME = 'ClaudyGod Music Ministries';
export const OG_IMAGE  = 'https://claudygod.com/ClaudySocial.jpg';
export const LOGO_URL  = 'https://claudygod.com/ClaudyGoLogo.webp';

/* ── BreadcrumbList ─────────────────────────────────────────────────────────
   Shows the navigation path inside Google's search result snippet.
   Always add to every sub-page.                                             */
export function breadcrumb(items: Array<{ name: string; href: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      ...items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: item.name,
        item: `${SITE_URL}${item.href}`,
      })),
    ],
  };
}

/* ── WebSite ────────────────────────────────────────────────────────────────
   Enables Google Sitelinks and site name display in SERPs.                  */
export function webSite() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: 'Official website of ClaudyGod — Nigerian gospel music artist, minister, and worship leader.',
    inLanguage: 'en-US',
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: { '@type': 'ImageObject', url: LOGO_URL },
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/search?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  };
}

/* ── MusicGroup (Organization) ──────────────────────────────────────────────
   Primary entity for the music ministry brand.                              */
export function musicGroup() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MusicGroup',
    '@id': `${SITE_URL}/#musicgroup`,
    name: SITE_NAME,
    alternateName: ['ClaudyGod', 'Minister ClaudyGod', 'ClaudyGod Ministries'],
    url: SITE_URL,
    image: { '@type': 'ImageObject', url: OG_IMAGE, width: 1200, height: 630 },
    logo: { '@type': 'ImageObject', url: LOGO_URL, width: 200, height: 200 },
    description:
      'ClaudyGod is a Nigerian gospel music artist, minister, and worship leader with over 20 years in ministry and 7 studio albums. Known for Spirit-filled worship that transforms lives across the globe.',
    genre: ['Gospel', 'Christian Music', 'Worship', 'Contemporary Gospel', 'Nigerian Gospel'],
    foundingDate: '2003',
    foundingLocation: {
      '@type': 'Place',
      name: 'Port Harcourt, Rivers State, Nigeria',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Port Harcourt',
        addressRegion: 'Rivers State',
        addressCountry: 'NG',
      },
    },
    areaServed: ['Nigeria', 'United Kingdom', 'United States', 'International'],
    numberOfEmployees: { '@type': 'QuantitativeValue', value: 10 },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Booking',
      email: 'bookings@claudygod.com',
      url: `${SITE_URL}/bookings`,
      availableLanguage: 'English',
    },
    sameAs: [
      'https://www.facebook.com/ClaudyGod/',
      'https://www.instagram.com/singerclaudygod/',
      'https://twitter.com/claudygod',
      'https://www.tiktok.com/@claudygod',
      'https://open.spotify.com/album/1zCT0YUVggnzkZJK5VP0yd',
      'https://music.apple.com/ng/album/very-glorious/1789665669',
      'https://www.youtube.com/channel/UC0RUDNzIiSLxoWGcNQbrLNQ',
      'https://www.deezer.com/us/album/695949191',
      'https://music.amazon.com/albums/B0DSM7QGLF',
    ],
  };
}

/* ── Person ─────────────────────────────────────────────────────────────────
   Triggers Google Knowledge Panel for the artist.                           */
export function person() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: 'ClaudyGod',
    alternateName: ['Minister ClaudyGod', 'Claudy God'],
    description:
      'Nigerian gospel music artist, minister, evangelist, and worship leader. Known for Spirit-filled gospel albums and powerful ministry across Nigeria and the diaspora.',
    jobTitle: ['Gospel Music Artist', 'Minister', 'Worship Leader', 'Evangelist'],
    nationality: { '@type': 'Country', name: 'Nigeria' },
    birthPlace: { '@type': 'Place', name: 'Nigeria' },
    url: `${SITE_URL}/about`,
    image: { '@type': 'ImageObject', url: OG_IMAGE },
    knowsAbout: ['Gospel Music', 'Christian Ministry', 'Worship', 'Evangelism', 'Discipleship'],
    memberOf: {
      '@id': `${SITE_URL}/#musicgroup`,
    },
    sameAs: [
      'https://www.facebook.com/ClaudyGod/',
      'https://www.instagram.com/singerclaudygod/',
      'https://twitter.com/claudygod',
      'https://www.youtube.com/channel/UC0RUDNzIiSLxoWGcNQbrLNQ',
      'https://open.spotify.com/album/1zCT0YUVggnzkZJK5VP0yd',
      'https://music.apple.com/ng/artist/claudygod/1440081695',
    ],
  };
}

/* ── MusicAlbum ─────────────────────────────────────────────────────────────
   Enables music-specific rich results and Knowledge Panel album listings.   */
export interface AlbumData {
  name:        string;
  description: string;
  imageUrl:    string;
  releaseDate: string;   // ISO date e.g. "2024-01-01"
  spotifyUrl?: string;
  appleUrl?:   string;
  youtubeUrl?: string;
}

export function musicAlbum(album: AlbumData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MusicAlbum',
    name: album.name,
    byArtist: {
      '@type': 'MusicGroup',
      name: SITE_NAME,
      '@id': `${SITE_URL}/#musicgroup`,
    },
    description: album.description,
    image: { '@type': 'ImageObject', url: `${SITE_URL}${album.imageUrl}` },
    datePublished: album.releaseDate,
    genre: ['Gospel', 'Christian Music', 'Worship'],
    url: `${SITE_URL}/music`,
    offers: album.spotifyUrl ? {
      '@type': 'Offer',
      url: album.spotifyUrl,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    } : undefined,
  };
}

/* ── ItemList ───────────────────────────────────────────────────────────────
   Tells Google about a collection of items (albums, videos, products).      */
export function itemList(
  name: string,
  items: Array<{ name: string; url: string; imageUrl?: string }>,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      url: item.url,
      ...(item.imageUrl ? { image: item.imageUrl } : {}),
    })),
  };
}

/* ── VideoObject ────────────────────────────────────────────────────────────
   Enables rich video results in Google Search and Google Discover.          */
export interface VideoData {
  name:          string;
  description:   string;
  thumbnailUrl:  string;
  uploadDate:    string;  // ISO date
  youtubeId:     string;
  duration?:     string;  // ISO 8601 PT#M#S e.g. "PT4M20S"
}

export function videoObject(v: VideoData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: v.name,
    description: v.description,
    thumbnailUrl: `https://img.youtube.com/vi/${v.youtubeId}/maxresdefault.jpg`,
    uploadDate: v.uploadDate,
    duration: v.duration,
    contentUrl: `https://www.youtube.com/watch?v=${v.youtubeId}`,
    embedUrl: `https://www.youtube.com/embed/${v.youtubeId}`,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: { '@type': 'ImageObject', url: LOGO_URL },
    },
    creator: {
      '@type': 'MusicGroup',
      name: SITE_NAME,
    },
  };
}

/* ── Event ──────────────────────────────────────────────────────────────────
   Shows events in Google Events search tab.                                 */
export interface EventData {
  name:       string;
  startDate:  string;   // ISO datetime
  location:   string;
  city:       string;
  country:    string;
  ticketUrl?: string;
  image?:     string;
}

export function event(e: EventData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: e.name,
    startDate: e.startDate,
    endDate: e.startDate,  // single-day event
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: e.location,
      address: {
        '@type': 'PostalAddress',
        addressLocality: e.city,
        addressCountry: e.country,
      },
    },
    image: e.image ?? OG_IMAGE,
    description: `ClaudyGod live ministry concert at ${e.location}, ${e.city}.`,
    organizer: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    performer: {
      '@type': 'MusicGroup',
      name: SITE_NAME,
      url: SITE_URL,
    },
    offers: e.ticketUrl && e.ticketUrl !== '#' ? {
      '@type': 'Offer',
      url: e.ticketUrl,
      availability: 'https://schema.org/InStock',
      priceCurrency: 'NGN',
    } : {
      '@type': 'Offer',
      availability: 'https://schema.org/LimitedAvailability',
      priceCurrency: 'NGN',
      name: 'Contact for ticket information',
    },
  };
}

/* ── FAQPage ────────────────────────────────────────────────────────────────
   Shows expandable FAQs directly in Google's search results (high CTR).    */
export function faqPage(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };
}

/* ── Service ────────────────────────────────────────────────────────────────
   For the bookings page — makes ClaudyGod findable for event-booking searches. */
export function service() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'ClaudyGod Live Ministry & Worship Booking',
    description:
      'Book Minister ClaudyGod for church services, conferences, gospel concerts, campus events, and ministry gatherings. Spirit-filled worship and preaching for any gospel event.',
    provider: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: LOGO_URL,
    },
    serviceType: ['Live Gospel Performance', 'Ministry Speaking', 'Worship Leading', 'Evangelistic Concert'],
    areaServed: ['Nigeria', 'United Kingdom', 'United States', 'International'],
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: `${SITE_URL}/bookings`,
      servicePhone: '',
      availableLanguage: 'English',
    },
    url: `${SITE_URL}/bookings`,
  };
}

/* ── LocalBusiness / Organization ──────────────────────────────────────────
   Helps with local Nigerian search results for ministry-related queries.   */
export function organization() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'Church'],
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: LOGO_URL,
    image: OG_IMAGE,
    description:
      'ClaudyGod Music Ministries — A gospel music ministry based in Nigeria, committed to spreading the love of God through Spirit-filled worship, teachings, and outreach.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Port Harcourt',
      addressRegion: 'Rivers State',
      addressCountry: 'Nigeria',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'Booking',
        url: `${SITE_URL}/bookings`,
        availableLanguage: 'English',
      },
      {
        '@type': 'ContactPoint',
        contactType: 'Customer Service',
        url: `${SITE_URL}/contact`,
        availableLanguage: 'English',
      },
    ],
    sameAs: [
      'https://www.facebook.com/ClaudyGod/',
      'https://www.instagram.com/singerclaudygod/',
      'https://twitter.com/claudygod',
      'https://www.youtube.com/channel/UC0RUDNzIiSLxoWGcNQbrLNQ',
    ],
  };
}

/* ── Product (for store page) ───────────────────────────────────────────── */
export interface ProductData {
  name:        string;
  description: string;
  imageUrl:    string;
  price:       number;
  currency?:   string;
  sku?:        string;
  url:         string;
}

export function product(p: ProductData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    description: p.description,
    image: `${SITE_URL}${p.imageUrl}`,
    sku: p.sku ?? p.name.toLowerCase().replace(/\s+/g, '-'),
    brand: { '@type': 'Brand', name: SITE_NAME },
    offers: {
      '@type': 'Offer',
      priceCurrency: p.currency ?? 'USD',
      price: p.price.toFixed(2),
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}${p.url}`,
      seller: { '@type': 'Organization', name: SITE_NAME },
    },
  };
}
