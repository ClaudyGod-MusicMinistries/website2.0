export type VideoType = {
  id: number;
  title: string;
  youtubeId: string;
  category: 'Music Videos' | 'Visualizers' | 'Live Sessions' | 'Christmas';
  description: string;
  date: string;
};

export const videos: VideoType[] = [
  // Existing videos...
  {
    id: 1,
    title: 'STEP ASIDE',
    youtubeId: '3nvGauo7kjA',
    category: 'Music Videos',
    description: 'Song by Min. ClaudyGod',
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  },
  {
    id: 2,
    title: 'Nothing Compares To You',
    youtubeId: 'Dw5S-jzzboA',
    category: 'Visualizers',
    description: 'Official Music Video/Visualizer',
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  },
  {
    id: 3,
    title: 'Dwelling Place (Forever God)',
    youtubeId: 'KoVkhbrRjf8',
    category: 'Live Sessions',
    description: 'Song By Min. ClaudyGod and Her Worship Team.',
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  },
  {
    id: 4,
    title: 'Look To You (Official Visualizer/ Music Video)',
    youtubeId: '7BN7i4puuis',
    category: 'Visualizers',
    description: 'Song By Min. ClaudyGod',
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  },
  {
    id: 5,
    title: 'NEW! I Love You Lord by ClaudyGod',
    youtubeId: 'SqaOeGLDPLY',
    category: 'Live Sessions',
    description: 'Song By Min. ClaudyGod and Her Worship Team.',
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  },
  {
    id: 6,
    title: `It's A New Day (Thank You For Today)`,
    youtubeId: 'Ak0LZgfHMa0',
    category: 'Music Videos',
    description: 'Song by Min. Claudy',
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  },
  {
    id: 7,
    title: 'All of Me (Official Music Video)',
    youtubeId: 'L-AVa2qC5Ic',
    category: 'Visualizers',
    description: 'Song By Min. ClaudyGod',
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  },
  {
    id: 8,
    title: 'VERY GLORIOUS Live Recording (Angel Inspired Song)',
    youtubeId: 'xY4508hwPfw',
    category: 'Live Sessions',
    description: 'Song By Min. ClaudyGod and Her Worship Team.',
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  },
  {
    id: 9,
    title: 'Joyful Alleluia by ClaudyGod',
    youtubeId: 'ih4SrEgnV60',
    category: 'Music Videos',
    description: 'Song by Min. Claudy',
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  },
  {
    id: 10,
    title: 'NOW OUT! King of the Nations',
    youtubeId: 'UZPaupINXYI',
    category: 'Live Sessions',
    description: 'Song By Min. ClaudyGod and Her Worship Team.',
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  },
  {
    id: 11,
    title: 'Love Me So Much',
    youtubeId: 'uro0EWsYdxc',
    category: 'Music Videos',
    description: 'Song by Min. Claudy',
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  },
  {
    id: 12,
    title: 'Nothing Compares To You (Official Music Video/Visualizer)',
    youtubeId: 'Dw5S-jzzboA',
    category: 'Visualizers',
    description: 'Song By Min. ClaudyGod',
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  },
  {
    id: 13,
    title: 'NEW! Very Glorious LIVE WORSHIP SESSION (An Angel Inspired Song)',
    youtubeId: '6pDDMP9Xprg',
    category: 'Live Sessions',
    description: 'Song By Min. ClaudyGod and Her Worship Team.',
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  },
  {
    id: 14,
    title: 'Affirmation',
    youtubeId: 'bVOAeBAer4U',
    category: 'Music Videos',
    description: 'Song by Min Claudy',
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  },
  {
    id: 15,
    title: 'Lover of My Soul',
    youtubeId: 'lrKaURkswT0',
    category: 'Visualizers',
    description: 'Song By Min. ClaudyGod',
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  },
  {
    id: 16,
    title: 'I Love You Lord (Official Music Video)',
    youtubeId: 'r8rp58DqavM',
    category: 'Visualizers',
    description: 'Song By Min. ClaudyGod',
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  },
  {
    id: 17,
    title: 'Look to You',
    youtubeId: 'vS8myyETQP4',
    category: 'Visualizers',
    description: 'Official Visualizer/Music Video',
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  },
  {
    id: 18,
    title: 'Thank you (My midnight cry). Live session by ClaudyGod & Band',
    youtubeId: 'd7qZ32829gg',
    category: 'Live Sessions',
    description: 'Song By Min. ClaudyGod and Her Worship Team.',
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  },

  // Christmas Videos
  {
    id: 19,
    title: 'FATHER CHRISTMAS by ClaudyGod',
    youtubeId: 'jEVOCbUy9Ww',
    category: 'Christmas',
    description: 'FATHER CHRISTMAS by ClaudyGod"',
    date: new Date('2023-12-01').toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  },
  {
    id: 20,
    title: 'Redeemer (O COME EMMANUEL)',
    youtubeId: 'lqDbkGpJqqE',
    category: 'Christmas',
    description: 'Redeemer (O COME EMMANUEL)',
    date: new Date('2023-12-24').toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  },
  {
    id: 21,
    title: 'MESSIAH JESUS (Great is His faithfulness medley)',
    youtubeId: 'zEmUH_unvdM',
    category: 'Christmas',
    description: 'MESSIAH JESUS (Great is His faithfulness medley)',
    date: new Date('2023-12-05').toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  },
  {
    id: 22,
    title: 'Savior is born, Jesus is here!',
    youtubeId: 'T0cHxaoHIeQ',
    category: 'Christmas',
    description: 'Savior is born, Jesus is here!',
    date: new Date('2023-12-10').toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  },
  {
    id: 23,
    title: 'Singalingaling by ClaudyGod',
    youtubeId: 'niRDnYMJQnY',
    category: 'Christmas',
    description: 'Singalingaling by ClaudyGod',
    date: new Date('2023-12-15').toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  },
  {
    id: 24,
    title: 'Father Christmas (lyric video). Music by ClaudyGod',
    youtubeId: 'F00Xkd8MrBc',
    category: 'Christmas',
    description: 'Father Christmas (lyric video). Music by ClaudyGod',
    date: new Date('2023-12-20').toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  },
  {
    id: 25,
    title: 'Singalingaling (Audio version) by ClaudyGod',
    youtubeId: '_tMbn1XpJx4',
    category: 'Christmas',
    description: 'Singalingaling (Audio version) by ClaudyGod',
    date: new Date('2023-12-22').toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  },
];
