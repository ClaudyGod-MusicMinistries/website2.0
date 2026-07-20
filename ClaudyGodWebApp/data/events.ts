/**
 * Placeholder tour/event content — the `/events` page will be replaced by a
 * backend-driven `/tour` page in the rebuild (see .claude/plans). Until then
 * this keeps the live page working. Previously named MOCK_EVENTS with a
 * Rickroll video ID (dQw4w9WgXcQ) baked into every "highlight" — removed,
 * along with the fabricated attendee counts, since those read as real data
 * rather than placeholder content.
 */

export type EventStatus = 'upcoming' | 'ongoing' | 'completed';

export interface Highlight {
  caption: string;
}

export interface ImageHighlight extends Highlight {
  url: string;
}

export interface VideoHighlight extends Highlight {
  videoId: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  date: string;
  time?: string;
  location?: string;
  image: string;
  status: EventStatus;
  attendees?: number;
  highlights?: {
    images: ImageHighlight[];
    videos: VideoHighlight[];
  };
}

export const placeholderEvents: Event[] = [
  {
    id: '1',
    title: 'Spirit-Filled Worship Night',
    description: 'Join us for an evening of praise, worship, and ministry. Experience the presence of God through spirit-filled music and worship.',
    fullDescription:
      'Spirit-Filled Worship Night is a special evening dedicated to worship and praise. Minister ClaudyGod will lead the congregation in spirit-filled worship music, powerful ministry moments, and prayer. This event welcomes all to experience God\'s presence and participate in a time of spiritual renewal.',
    date: '2026-06-15T19:00:00',
    time: '7:00 PM - 10:00 PM',
    location: 'Grace Pavilion, Port Harcourt',
    image: '/Bg_13.webp',
    status: 'upcoming',
    highlights: { images: [], videos: [] },
  },
  {
    id: '2',
    title: 'Gospel Concert & Ministry Tour',
    description: 'A night of outstanding gospel music, worship, and ministry. Experience 7 albums of music performed live with powerful testimonies.',
    fullDescription:
      'Gospel Concert & Ministry Tour features Minister ClaudyGod performing all hit songs from his 7 gospel albums. The evening includes worship, ministry moments, prayer lines, and powerful testimonies. This is a night of celebration, spiritual renewal, and connection with the gospel music ministry.',
    date: '2026-07-20T18:00:00',
    time: '6:00 PM - 11:00 PM',
    location: 'Civic Center, Lagos',
    image: '/Bg_13.webp',
    status: 'upcoming',
    highlights: { images: [], videos: [] },
  },
  {
    id: '3',
    title: 'Young Adults Ministry Conference',
    description: 'A conference focused on youth and young adult empowerment through gospel music, mentorship, and spiritual growth.',
    fullDescription:
      'The Young Adults Ministry Conference brings together young people for a day of worship, teaching, mentorship, and connection. Minister ClaudyGod will share his testimony, lead worship sessions, and participate in panel discussions about faith, music, and purpose in the modern world.',
    date: '2026-06-08T08:00:00',
    time: '8:00 AM - 5:00 PM',
    location: 'Youth Center, Abuja',
    image: '/Bg_13.webp',
    status: 'ongoing',
    highlights: { images: [], videos: [] },
  },
  {
    id: '4',
    title: 'Ministry School & Training Program',
    description: 'A comprehensive training program for aspiring gospel musicians and ministers seeking to develop their craft and calling.',
    fullDescription:
      'The Ministry School & Training Program is designed for individuals passionate about gospel music and ministry. Participants will receive training in music theory, worship leading, stage presence, ministry ethics, and spiritual development. Minister ClaudyGod serves as lead instructor and mentor.',
    date: '2026-05-20T09:00:00',
    time: '9:00 AM - 4:00 PM (5 days)',
    location: 'Music Institute, Port Harcourt',
    image: '/Bg_13.webp',
    status: 'completed',
    highlights: { images: [], videos: [] },
  },
  {
    id: '5',
    title: 'Prayer & Fasting Conference',
    description: 'A week-long spiritual renewal program focused on prayer, fasting, intercession, and encountering God\'s presence.',
    fullDescription:
      'The Prayer & Fasting Conference is a transformative week dedicated to spiritual disciplines and encountering God. Minister ClaudyGod will lead morning prayer sessions, conduct teachings on prayer and intercession, and facilitate evening worship services. Participants commit to corporate fasting and prayer.',
    date: '2026-04-28T06:00:00',
    time: '6:00 AM - 8:00 PM (7 days)',
    location: 'Retreat Center, Calabar',
    image: '/Bg_13.webp',
    status: 'completed',
    highlights: { images: [], videos: [] },
  },
  {
    id: '6',
    title: 'Musical Excellence & Performance Masterclass',
    description: 'An exclusive masterclass on vocal techniques, stage performance, and professional music production with Minister ClaudyGod.',
    fullDescription:
      'This masterclass brings together aspiring and professional musicians for intensive training in vocal performance, stage presence, and music production. Minister ClaudyGod shares his expertise, techniques, and industry knowledge. Limited to 50 participants for personalized attention.',
    date: '2026-04-10T10:00:00',
    time: '10:00 AM - 4:00 PM',
    location: 'Recording Studio, Lagos',
    image: '/Bg_13.webp',
    status: 'completed',
    highlights: { images: [], videos: [] },
  },
];
