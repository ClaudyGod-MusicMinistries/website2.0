/* eslint-disable @typescript-eslint/no-explicit-any */
// Define type for video objects
export interface VideoItem {
  [x: string]: any;
  category: string;
  id: string;
  title: string;
  description: string;
  date: string;
  duration: string;
  channel: string;
}

export const interviewVideos: VideoItem[] = [
  {
    id: 'Eom1qlm4ork',
    title: 'ClaudyGod on NTA10-Lagos',
    description: 'Exclusive interview discussing ministry journey',
    date: 'May 15, 2025',
    duration: '25:38',
    channel: 'NTA10 Lagos',
    category: 'NTA',
  },
  {
    id: 'rGVHMpPIkY8',
    title: 'Rhythm Station Feature',
    description: 'Live performance and Q&A session',
    date: 'March 28, 2025',
    duration: '18:42',
    channel: 'Rhythm Station',
    category: 'Rhythm',
  },
  {
    id: 'jeY9ULX3wtY',
    title: 'Rhema Station Special',
    description: 'Behind the scenes of worship ministry',
    date: 'February 10, 2025',
    duration: '32:15',
    channel: 'Rhema Station',
    category: 'Rhema',
  },
  {
    id: 'MvCiYuE7OiE',
    title: 'Magic FM Aba Radio Interview (clip)',
    description: 'ClaudyGod Music Tour - Nigeria',
    date: 'July 12, 2025',
    duration: '32:15',
    channel: 'Magic FM',
    category: 'Magic',
  },
  {
    id: 'knstGZFNOOY',
    title:
      'Exciting & Insightful Radio Interview with Buzz FM 89.7 Aba, Nigeria',
    description: 'ClaudyGod Music Tour - Nigeria',
    date: 'July 12, 2025',
    duration: '32:15',
    channel: 'Magic FM',
    category: 'Magic',
  },
  {
    id: 'ZHnT0TBeoHM',
    title: 'ClaudyGod’s Brand New Interview with RHEMA FM (2nd segment)',
    description: 'ClaudyGod Music Tour - Nigeria',
    date: 'July 24, 2025',
    duration: '7:51',
    channel: 'Rhema FM',
    category: 'Rhema',
  },
];

export const playerOptions = {
  height: '390',
  width: '100%',
  playerVars: {
    autoplay: 1,
    modestbranding: 1,
    rel: 0,
    color: 'white',
  },
};
