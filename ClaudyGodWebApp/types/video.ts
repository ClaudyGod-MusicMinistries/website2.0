export type VideoType = {
  id: number;
  title: string;
  youtubeId: string;
  category: 'Music Videos' | 'Visualizers' | 'Live Sessions';
  description: string;
  date: string;
};

export type DiagonalSectionProps = {
  title: string;
  description: string;
  category: 'Music Videos' | 'Visualizers' | 'Live Sessions';
  reverse?: boolean;
  onExplore: () => void;
};
