export interface TourPhoto {
  src: string;
  caption: string;
  city: string;
  state: string;
  category:
    | 'Worship Encounter'
    | 'Youth & Campus'
    | 'Community Impact'
    | 'Ministers & Guests'
    | 'Tour Moments';
  aspectRatio?: string;
}

export interface TourState {
  id: string;
  stateName: string;
  region: string;
  cities: string[];
  theme: string;
  badge: string;
  description: string;
  quote?: string;
  stats: {
    worshippers: string;
    gatherings: string;
    keyVenue: string;
  };
  highlights: string[];
  photos: TourPhoto[];
}

export interface NextDestination {
  city: string;
  regionOrCountry: string;
  flag: string;
  type: 'Nigeria Expansion' | 'Global Outreach';
  status: 'Planning' | 'Confirmed' | 'Open for Invites';
  description: string;
}

export const tourStates: TourState[] = [
  {
    id: 'portharcourt',
    stateName: 'Port Harcourt',
    region: 'Rivers State',
    cities: ['Port Harcourt City', 'Obio-Akpor', 'Choba'],
    theme: 'The Foundation of Praise & Youth Outpourings',
    badge: 'Home Base & Spiritual Cradle',
    description:
      'Where the calling first ignited and continues to burn brightly. Minister ClaudyGod has led transformative campus revivals, university outreach meetings, and massive auditorium praise convocations across Port Harcourt, discipling a generation of passionate worshippers.',
    quote:
      'Port Harcourt is where our prayer altars took root, releasing sounds of worship that now reverberate across nations.',
    stats: {
      worshippers: '12,000+',
      gatherings: '8+ Outings',
      keyVenue: 'Port Harcourt Mega Fellowship Arena',
    },
    highlights: [
      'Campus youth explosions across Rivers State universities',
      'Ministers & praise leadership masterclasses',
      'Historic Praise & Deliverance worship rallies',
    ],
    photos: [
      {
        src: '/Tour_Ph_1.webp',
        caption: 'Minister ClaudyGod leading the sanctuary in deep surrender and united praise.',
        city: 'Port Harcourt',
        state: 'Rivers State',
        category: 'Worship Encounter',
      },
      {
        src: '/Tour_Ph_2.webp',
        caption: 'Empowering campus students and youth worshippers with the message of God’s love.',
        city: 'Port Harcourt',
        state: 'Rivers State',
        category: 'Youth & Campus',
      },
      {
        src: '/Tour_Ph_3.webp',
        caption:
          'Global Worship Experience banner rally with guest ministers and fellow worshippers.',
        city: 'Port Harcourt',
        state: 'Rivers State',
        category: 'Ministers & Guests',
      },
      {
        src: '/Tour_ph_4.webp',
        caption: 'Intimate praise moment ministering directly to hearts longing for renewal.',
        city: 'Port Harcourt',
        state: 'Rivers State',
        category: 'Worship Encounter',
      },
      {
        src: '/aboutUs.webp',
        caption: 'Mentorship circle with university students and young leaders in the ministry.',
        city: 'Port Harcourt',
        state: 'Rivers State',
        category: 'Youth & Campus',
      },
      {
        src: '/mum1.jpg',
        caption: 'Minister ClaudyGod releasing prophetic declarations of hope and victory.',
        city: 'Port Harcourt',
        state: 'Rivers State',
        category: 'Tour Moments',
      },
    ],
  },
  {
    id: 'lagos',
    stateName: 'Lagos',
    region: 'Lagos State',
    cities: ['Ikeja', 'Lekki', 'Surulere'],
    theme: 'Metropolitan Praise & Kingdom Unity',
    badge: 'Commercial Capital Encounter',
    description:
      'Taking the sound of authentic worship into Nigeria’s most vibrant metropolitan center. ClaudyGod’s Lagos tour gathered professionals, creatives, and believers from across the city for unforgettable nights of unhurried adoration and spiritual refreshing.',
    quote:
      'In the center of bustling city life, God carved out spaces of sacred silence and thunderous praise.',
    stats: {
      worshippers: '9,500+',
      gatherings: '5 Convocations',
      keyVenue: 'Lagos Island Praise Sanctuary',
    },
    highlights: [
      'Metropolitan praise nights breaking denominational walls',
      'Creative arts & gospel musicians fellowship',
      'Extended midnight worship and prayer vigil',
    ],
    photos: [
      {
        src: '/Tour_Ph_5.webp',
        caption: 'Lagos auditorium packed with worshippers lifting hands in unified praise.',
        city: 'Lagos',
        state: 'Lagos State',
        category: 'Worship Encounter',
      },
      {
        src: '/Tour_ph_6.webp',
        caption: 'The congregation erupting in joyous praise during the Lagos tour finale.',
        city: 'Lagos',
        state: 'Lagos State',
        category: 'Tour Moments',
      },
      {
        src: '/Tour_Ph_7.webp',
        caption: 'Ministers and saints standing in prayer and intercession for the city of Lagos.',
        city: 'Lagos',
        state: 'Lagos State',
        category: 'Worship Encounter',
      },
      {
        src: '/Tour_Ph_8.webp',
        caption: 'Minister ClaudyGod sharing words of exhortation with Lagos attendees.',
        city: 'Lagos',
        state: 'Lagos State',
        category: 'Ministers & Guests',
      },
    ],
  },
  {
    id: 'abuja',
    stateName: 'Abuja',
    region: 'Federal Capital Territory',
    cities: ['Central Business District', 'Garki', 'Maitama'],
    theme: 'National Intercession & Kingdom Authority',
    badge: 'Nation’s Capital Altar',
    description:
      'A deeply spiritual gathering in the heart of the Federal Capital. Minister ClaudyGod raised a prophetic altar of worship and intercession, ministering to families, civil leaders, and believers hungering for God’s righteousness across Nigeria.',
    quote:
      'Worship in the capital is our humble cry for divine direction, righteousness, and peace over our nation.',
    stats: {
      worshippers: '6,000+',
      gatherings: '4 Gatherings',
      keyVenue: 'Abuja Kingdom Summit Hall',
    },
    highlights: [
      'Capital worship convocation with regional church leaders',
      'Prophetic worship release over national peace',
      'Youth leaders & intercessory prayer network session',
    ],
    photos: [
      {
        src: '/Tour_Ph_9.webp',
        caption: 'Fellowship session uniting ministers and church leaders in the nation’s capital.',
        city: 'Abuja',
        state: 'FCT',
        category: 'Ministers & Guests',
      },
      {
        src: '/Tour_Ph_10.webp',
        caption: 'Atmosphere of reverent worship and intercession at the Abuja Summit.',
        city: 'Abuja',
        state: 'FCT',
        category: 'Worship Encounter',
      },
      {
        src: '/Tour_Ph_11.webp',
        caption: 'Stage moment releasing songs from ClaudyGod’s flagship album releases.',
        city: 'Abuja',
        state: 'FCT',
        category: 'Tour Moments',
      },
      {
        src: '/resize_abt.webp',
        caption: 'Min. ClaudyGod speaking on the power of consecrated worship before God.',
        city: 'Abuja',
        state: 'FCT',
        category: 'Ministers & Guests',
      },
    ],
  },
  {
    id: 'imo',
    stateName: 'Imo',
    region: 'Imo State',
    cities: ['Owerri', 'Orlu', 'Okigwe'],
    theme: 'Joy of the Redeemed & Eastern Heartland Praise',
    badge: 'Heartland Revival',
    description:
      'In Owerri and neighboring communities, the atmosphere was saturated with authentic Eastern praise and high-spirited celebration. Whole congregations were swept into joyful dance, praising God with indigenous instruments and heartfelt reverence.',
    quote:
      'The joy of the Lord is our strength — in Imo, that joy was tangible in every note and every step of dance.',
    stats: {
      worshippers: '7,500+',
      gatherings: '4 Assemblies',
      keyVenue: 'Owerri Civic Praise Auditorium',
    },
    highlights: [
      'Heartland Praise Festival with community choir ensembles',
      'Outreach to rural families and widows in Imo communities',
      'Evening of high-energy indigenous praise and thanksgiving',
    ],
    photos: [
      {
        src: '/Tour_Ph_12.webp',
        caption: 'Owerri congregation immersed in songs of thanksgiving and joy.',
        city: 'Owerri',
        state: 'Imo State',
        category: 'Worship Encounter',
      },
      {
        src: '/Tour_Ph_13.webp',
        caption: 'Youth and families celebrating breakthrough and answered prayers.',
        city: 'Owerri',
        state: 'Imo State',
        category: 'Youth & Campus',
      },
      {
        src: '/tour_1.jpg',
        caption: 'Community praise gathering welcoming worshippers from across the state.',
        city: 'Owerri',
        state: 'Imo State',
        category: 'Community Impact',
      },
    ],
  },
  {
    id: 'abia',
    stateName: 'Abia',
    region: 'Abia State',
    cities: ['Aba', 'Umuahia'],
    theme: 'Revival Fires, Market Outreach & Grace',
    badge: 'Commercial Hub Revival',
    description:
      'From the bustling trade hub of Aba to the state capital Umuahia, Minister ClaudyGod’s tour met people in marketplaces, fellowship halls, and community centers, blending vibrant worship with compassionate outreach and hope.',
    quote:
      'Ministry belongs where the people are — bringing worship into the bustling streets and marketplaces of Abia.',
    stats: {
      worshippers: '8,500+',
      gatherings: '5 Outings',
      keyVenue: 'Aba Central Worship Pavilion',
    },
    highlights: [
      'Marketplace ministry and evangelistic song distribution in Aba',
      'Umuahia grace conference and inter-denominational service',
      'Charitable gift giving and community food support',
    ],
    photos: [
      {
        src: '/Tour_Ph_14.webp',
        caption:
          'Sharing the message of Christ’s unconditional love with local traders and residents in Aba.',
        city: 'Aba',
        state: 'Abia State',
        category: 'Community Impact',
      },
      {
        src: '/tour_3.jpg',
        caption: 'Vibrant indoor praise meeting packed with worshippers in Aba.',
        city: 'Aba',
        state: 'Abia State',
        category: 'Worship Encounter',
      },
      {
        src: '/manBack.jpg',
        caption: 'Pastors and ministry workers joining hands in prayer during the Umuahia outing.',
        city: 'Umuahia',
        state: 'Abia State',
        category: 'Tour Moments',
      },
      {
        src: '/ClaudySocial.jpg',
        caption: 'Min. ClaudyGod with local church organizers and volunteers in Abia State.',
        city: 'Aba',
        state: 'Abia State',
        category: 'Ministers & Guests',
      },
    ],
  },
];

export const nextDestinations: NextDestination[] = [
  {
    city: 'Enugu',
    regionOrCountry: 'Enugu State, Nigeria',
    flag: '🇳🇬',
    type: 'Nigeria Expansion',
    status: 'Confirmed',
    description: 'Coal City Praise Convocations and youth university fellowship rallies.',
  },
  {
    city: 'Asaba & Warri',
    regionOrCountry: 'Delta State, Nigeria',
    flag: '🇳🇬',
    type: 'Nigeria Expansion',
    status: 'Planning',
    description: 'Delta Riverine worship tour connecting grassroots prayer fellowships.',
  },
  {
    city: 'Uyo',
    regionOrCountry: 'Akwa Ibom, Nigeria',
    flag: '🇳🇬',
    type: 'Nigeria Expansion',
    status: 'Planning',
    description: 'A festival of praise and adoration uniting churches across the state.',
  },
  {
    city: 'London & Manchester',
    regionOrCountry: 'United Kingdom',
    flag: '🇬🇧',
    type: 'Global Outreach',
    status: 'Open for Invites',
    description: 'Diaspora worship encounters and African gospel praise convocations.',
  },
  {
    city: 'Houston & Atlanta',
    regionOrCountry: 'United States',
    flag: '🇺🇸',
    type: 'Global Outreach',
    status: 'Open for Invites',
    description: 'Kingdom worship nights and diaspora gospel ministry conferences.',
  },
  {
    city: 'Freetown',
    regionOrCountry: 'Sierra Leone',
    flag: '🇸🇱',
    type: 'Global Outreach',
    status: 'Planning',
    description: 'Honoring ClaudyGod’s ancestral heritage with national revival meetings.',
  },
  {
    city: 'Accra',
    regionOrCountry: 'Ghana',
    flag: '🇬🇭',
    type: 'Global Outreach',
    status: 'Open for Invites',
    description: 'West Africa regional worship summit bringing believers together in praise.',
  },
];

/* ── Backwards compatibility for legacy imports ── */
export const galleryCategories = [
  {
    title: 'Tour Photos',
    description:
      'Memorable moments from our worship tours and ministry events across Nigerian states.',
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
    description:
      'Engaging with the next generation of worshippers in universities and youth gatherings across Port Harcourt.',
    images: ['/aboutUs.webp'],
  },
  {
    title: 'Worship Moments',
    description:
      'Powerful moments of praise and worship that transformed lives and brought heaven to earth.',
    images: ['/resize_abt.webp', '/mum1.jpg'],
  },
  {
    title: 'Min. ClaudyGod With Guests',
    description:
      'Collaborative moments with ministry partners and guest worshippers who joined our gatherings.',
    images: ['/ClaudySocial.jpg', '/tour_3.jpg'],
  },
  {
    title: 'Community Impact',
    description:
      'Touching lives beyond the worship center through outreach and community transformation programs.',
    images: ['/tour_1.jpg', '/manBack.jpg'],
  },
];

export const teamMembers = [
  {
    id: 1,
    name: 'Team Member',
    role: 'Ministry Team',
    description: 'Dedicated to spreading the Gospel through worship and service.',
    image: '/team_ph_1.webp',
  },
  {
    id: 2,
    name: 'Team Member',
    role: 'Ministry Team',
    description: 'Committed to excellence in ministry and worship leadership.',
    image: '/team_ph_2.webp',
  },
  {
    id: 3,
    name: 'Team Member',
    role: 'Ministry Team',
    description: 'Passionate about impacting lives through faith and music.',
    image: '/team_ph_3.webp',
  },
  {
    id: 4,
    name: 'Team Member',
    role: 'Ministry Team',
    description: 'Devoted to spiritual growth and community outreach.',
    image: '/team_ph_4.webp',
  },
  {
    id: 5,
    name: 'Team Member',
    role: 'Ministry Team',
    description: 'Inspired by God’s love to serve with purpose and joy.',
    image: '/team_ph_5.webp',
  },
  {
    id: 6,
    name: 'Team Member',
    role: 'Ministry Team',
    description: 'Building a community of worship and spiritual transformation.',
    image: '/team_ph_6.webp',
  },
  {
    id: 7,
    name: 'Team Member',
    role: 'Ministry Team',
    description: 'Empowering believers through worship, teaching, and mentorship.',
    image: '/team_ph_7.webp',
  },
];
