export const fontFamily = {
  bricolage: 'BricolageGrotesque, sans-serif',
  raleway:   'Raleway, sans-serif',
  workSans:  'WorkSans, sans-serif',
  abril:     'AbrilFatface, serif',
  roboto:    'Roboto, sans-serif',
} as const;

export type FontFamily = keyof typeof fontFamily;

export const fontWeight = {
  light:     300,
  regular:   400,
  medium:    500,
  semibold:  600,
  bold:      700,
  extrabold: 800,
  black:     900,
} as const;

export type FontWeight = keyof typeof fontWeight;

export const fontSize = {
  '2xs':  '0.625rem',
  xs:     '0.75rem',
  sm:     '0.875rem',
  base:   '1rem',
  lg:     '1.125rem',
  xl:     '1.25rem',
  '2xl':  '1.5rem',
  '3xl':  '1.875rem',
  '4xl':  '2.25rem',
  '5xl':  '3rem',
  '6xl':  '3.75rem',
  '7xl':  '4.5rem',
  '8xl':  '6rem',
} as const;

export type FontSize = keyof typeof fontSize;

export const letterSpacing = {
  tighter: '-0.05em',
  tight:   '-0.025em',
  normal:  '0em',
  wide:    '0.025em',
  wider:   '0.05em',
  widest:  '0.1em',
  display: '0.15em',
} as const;

export const lineHeight = {
  none:    '1',
  tight:   '1.25',
  snug:    '1.375',
  normal:  '1.5',
  relaxed: '1.625',
  loose:   '2',
} as const;

// Available font files in /public/fonts/
export const fontFiles = [
  // BricolageGrotesque
  { family: 'BricolageGrotesque', file: 'BricolageGrotesque-ExtraLight.ttf', weight: 200 },
  { family: 'BricolageGrotesque', file: 'BricolageGrotesque-Light.ttf',      weight: 300 },
  { family: 'BricolageGrotesque', file: 'BricolageGrotesque-Regular.ttf',    weight: 400 },
  { family: 'BricolageGrotesque', file: 'BricolageGrotesque-Medium.ttf',     weight: 500 },
  { family: 'BricolageGrotesque', file: 'BricolageGrotesque-SemiBold.ttf',   weight: 600 },
  { family: 'BricolageGrotesque', file: 'BricolageGrotesque-Bold.ttf',       weight: 700 },
  { family: 'BricolageGrotesque', file: 'BricolageGrotesque-ExtraBold.ttf',  weight: 800 },
  // Raleway
  { family: 'Raleway', file: 'Raleway-ExtraLight.ttf', weight: 200 },
  { family: 'Raleway', file: 'Raleway-Light.ttf',      weight: 300 },
  { family: 'Raleway', file: 'Raleway-Regular.ttf',    weight: 400 },
  { family: 'Raleway', file: 'Raleway-Medium.ttf',     weight: 500 },
  { family: 'Raleway', file: 'Raleway-Bold.ttf',       weight: 700 },
  // WorkSans
  { family: 'WorkSans', file: 'WorkSans-Light.ttf',   weight: 300 },
  { family: 'WorkSans', file: 'WorkSans-Regular.ttf', weight: 400 },
  { family: 'WorkSans', file: 'WorkSans-Medium.ttf',  weight: 500 },
  { family: 'WorkSans', file: 'WorkSans-Black.ttf',   weight: 900 },
  // AbrilFatface
  { family: 'AbrilFatface', file: 'AbrilFatface-Regular.ttf', weight: 400 },
] as const;
