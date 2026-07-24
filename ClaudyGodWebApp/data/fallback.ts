/**
 * Curated fallback content for API-backed homepage sections, shaped to match
 * the real backend DTOs exactly (see lib/data/types.ts) so useApiResource can
 * drop these straight into `data` on a fetch failure with no adapter drift.
 *
 * Unlike the old placeholder files (data/events.ts, data/store.ts) that predate
 * the real backend and use incompatible shapes, everything here is real,
 * evergreen content — actual released songs and the real streaming links from
 * data/music.tsx — so showing it during a brief API outage never misleads a
 * visitor the way a stale fake "upcoming event" would.
 *
 * Deliberately NOT covered here:
 *  - Events: date/venue content is time-sensitive; a cached fallback could
 *    show a tour date that's already passed or never happened. useEvents
 *    keeps its empty fallback, so TourDatesStrip just hides on failure.
 *
 * Store products ARE covered (fallbackStoreProducts below) — checkout's
 * missing x-api-key bug and the missing Products/Orders tables were both
 * fixed this session, so the "coming soon, checkout isn't wired" caveat
 * that used to justify leaving products out no longer holds.
 *
 * FAQs ARE covered (fallbackFAQs below) — useFAQs previously fell back to
 * an empty array, so an empty/unseeded backend FAQ table meant the whole
 * Help page rendered as a blank search bar with no results, ever. These
 * answers are genuinely evergreen (how bookings/volunteering/checkout
 * work), not time-sensitive, so showing them during an outage is safe.
 */
import type { Album, MediaItem, StoreProduct, FAQ } from '@/lib/data/types';

export const fallbackAlbums: Album[] = [
  {
    id: 'fallback-very-glorious',
    title: 'Very Glorious',
    imageUrl: '/veryGlorious.jpg',
    spotifyUrl: 'https://open.spotify.com/album/1zCT0YUVggnzkZJK5VP0yd',
    appleUrl: 'https://music.apple.com/ng/album/very-glorious/1789665669',
    youtubeUrl: 'https://youtube.com/@claudygodministries?si=6Ne99tTC48Ihv44s',
    deezerUrl: 'https://www.deezer.com/us/album/695949191',
    amazonUrl: 'https://music.amazon.com/albums/B0DSM7QGLF?tag=fndcmpgns-20',
    sortOrder: 0,
  },
  {
    id: 'fallback-you-are-our-everything',
    title: 'You Are Our Everything',
    imageUrl: '/CoverArt.webp',
    spotifyUrl: 'https://open.spotify.com/album/1zCT0YUVggnzkZJK5VP0yd',
    appleUrl: 'https://music.apple.com/ng/album/you-are-our-everything-single/1803827230',
    youtubeUrl:
      'https://www.youtube.com/watch?v=fK_tCBcnqGs&list=OLAK5uy_nO6i6o85ojjKvu8QQlrV0keV4M_T7PPe4',
    deezerUrl: 'https://www.deezer.com/us/album/695949191',
    amazonUrl: 'https://music.amazon.com/albums/B0DSM7QGLF?tag=fndcmpgns-20',
    sortOrder: 1,
  },
];

function toFallbackVideo(id: string, title: string, youtubeId: string): MediaItem {
  return {
    id,
    title,
    type: 'video',
    fileName: '',
    contentType: '',
    fileSizeBytes: 0,
    publicUrl: `https://youtu.be/${youtubeId}`,
    isPublished: true,
    viewCount: 0,
    downloadCount: 0,
    createdAt: new Date().toISOString(),
  };
}

export const fallbackVideos: MediaItem[] = [
  toFallbackVideo('fallback-video-0', 'Not Be Moved', '2JV1k5GGjmk'),
  toFallbackVideo('fallback-video-1', 'Nothing Compares To You', 'Dw5S-jzzboA'),
  toFallbackVideo('fallback-video-2', 'Dwelling Place (Forever God)', 'KoVkhbrRjf8'),
  toFallbackVideo('fallback-video-3', 'Look To You', '7BN7i4puuis'),
  toFallbackVideo('fallback-video-4', "It's A New Day (Thank You For Today)", 'Ak0LZgfHMa0'),
];

export const fallbackStoreProducts: StoreProduct[] = [
  {
    id: 'fallback-product-mug',
    title: 'Mug',
    description:
      'Ceramic mug with the crest on one side and an inspirational message on the reverse — perfect for your daily use.',
    price: 5,
    image: '/Product1.webp',
    images: ['/Product1.webp', '/Product2.webp'],
    category: 'accessories',
    inStock: true,
    // rating: 5.0,
  },
  {
    id: 'fallback-product-tshirt',
    title: 'Classic T-Shirt — White',
    description:
      'This ClaudyGod T-shirt is made from soft, breathable fabric, perfect for worship and casual wear.',
    price: 10,
    image: '/Product3.webp',
    category: 'clothing',
    inStock: true,
    // rating: 4.8,
  },
  {
    id: 'fallback-product-premium-tshirt',
    title: 'Premium T-Shirt — Purple',
    description:
      'Suitable for worship and casual wear, this premium t-shirt is made from high-quality materials for comfort and durability.',
    price: 15,
    image: '/Product4.webp',
    category: 'clothing',
    inStock: true,
    // rating: 4.7,
  },
  {
    id: 'fallback-product-ep',
    title: 'ClaudyGod Music EP',
    description: 'Digital EP: Pay. Stream. Download.',
    price: 10,
    image: '/CD1.png',
    category: 'music',
    inStock: true,
    // rating: 4.9,
  },
];

export const fallbackFAQs: FAQ[] = [
  {
    id: 'fallback-faq-albums',
    category: 'Music & Albums',
    question: 'Where can I stream ClaudyGod’s music?',
    answer:
      'All releases are available on Spotify, Apple Music, YouTube, Deezer, and Amazon Music. Links to every platform are on the Music page for each album.',
    order: 0,
  },
  {
    id: 'fallback-faq-events',
    category: 'Events & Attendance',
    question: 'How do I find out about upcoming tour dates?',
    answer:
      'Upcoming events are listed on the Events page as soon as they’re confirmed. Subscribe to the newsletter to get notified the moment a new date is announced.',
    order: 0,
  },
  {
    id: 'fallback-faq-bookings',
    category: 'Bookings & Services',
    question: 'How do I book ClaudyGod for a church service or event?',
    answer:
      'Fill out the booking request form on the Bookings page with your event details. The team reviews every request and typically responds within 3–5 business days.',
    order: 0,
  },
  {
    id: 'fallback-faq-store-shipping',
    category: 'Store & Purchases',
    question: 'Does the store ship internationally?',
    answer:
      'Yes — merchandise ships worldwide. Shipping cost and delivery estimate are calculated at checkout once you enter your address.',
    order: 0,
  },
  {
    id: 'fallback-faq-store-orders',
    category: 'Store & Purchases',
    question: 'Can I change or cancel an order after checkout?',
    answer:
      'Reach out through the Contact page as soon as possible with your order details. We can amend or cancel an order before it ships, but not after.',
    order: 1,
  },
  {
    id: 'fallback-faq-volunteer',
    category: 'Volunteering',
    question: 'What volunteer roles are available?',
    answer:
      'Media & photography, vocals, backup singing, protocol/ushering, and security are the main teams. Apply through the Volunteer page — applications are reviewed within 2–3 business days.',
    order: 0,
  },
  {
    id: 'fallback-faq-donations',
    category: 'Support & Donations',
    question: 'Is my donation tax-deductible?',
    answer:
      'This depends on your country and the ministry’s registration status there. Reach out via the Contact page and the team will confirm what documentation applies to your donation.',
    order: 0,
  },
  {
    id: 'fallback-faq-technical',
    category: 'Technical Support',
    question: 'The site isn’t working right for me — who do I contact?',
    answer:
      'Email peter4tech@gmail.com with a description of the issue (and a screenshot if you can) and it’ll be looked at directly.',
    order: 0,
  },
];
