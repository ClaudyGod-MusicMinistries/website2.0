export const colors = {
  // Brand gold scale
  gold: {
    50:  '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#C9A84C', // primary brand gold
    600: '#A88A2E',
    700: '#8B6914',
    800: '#6B4D00',
    900: '#4A3400',
  },

  // Neutral / background scale
  neutral: {
    0:   '#FFFFFF',
    50:  '#F8F8F8',
    100: '#E8E8E8',
    200: '#CFCFCF',
    300: '#A8A8A8',
    400: '#7A7A7A',
    500: '#5A5A5A',
    600: '#3D3D3D',
    700: '#2A2A2A',
    800: '#1A1A1A',
    850: '#141414',
    900: '#0F0F0F',
    950: '#080808',
  },

  // Semantic surface layers (dark-first)
  surface: {
    base:     '#080808',
    muted:    '#0E0E0E',
    elevated: '#161616',
    overlay:  '#1E1E1E',
    border:   '#2A2A2A',
    divider:  '#232323',
  },

  // Semantic text
  text: {
    primary:   '#F5F5F5',
    secondary: '#A8A8A8',
    muted:     '#6B6B6B',
    disabled:  '#3D3D3D',
    inverse:   '#080808',
    gold:      '#C9A84C',
    goldLight: '#E8C96A',
  },

  // Status
  status: {
    success: '#10B981',
    warning: '#F59E0B',
    error:   '#EF4444',
    info:    '#3B82F6',
    successBg: '#052E16',
    warningBg: '#451A03',
    errorBg:   '#450A0A',
    infoBg:    '#0C1A3A',
  },
} as const;

export const spacing = {
  px:   '1px',
  0:    '0',
  0.5:  '0.125rem',
  1:    '0.25rem',
  1.5:  '0.375rem',
  2:    '0.5rem',
  3:    '0.75rem',
  4:    '1rem',
  5:    '1.25rem',
  6:    '1.5rem',
  8:    '2rem',
  10:   '2.5rem',
  12:   '3rem',
  16:   '4rem',
  20:   '5rem',
  24:   '6rem',
  32:   '8rem',
  40:   '10rem',
  48:   '12rem',
  64:   '16rem',
} as const;

export const breakpoints = {
  sm:   '640px',
  md:   '768px',
  lg:   '1024px',
  xl:   '1280px',
  '2xl':'1536px',
} as const;

export const radius = {
  none:  '0',
  sm:    '0.25rem',
  base:  '0.375rem',
  md:    '0.5rem',
  lg:    '0.75rem',
  xl:    '1rem',
  '2xl': '1.5rem',
  '3xl': '2rem',
  full:  '9999px',
} as const;

export const shadow = {
  sm:   '0 1px 2px 0 rgb(0 0 0 / 0.4)',
  base: '0 1px 3px 0 rgb(0 0 0 / 0.5), 0 1px 2px -1px rgb(0 0 0 / 0.5)',
  md:   '0 4px 6px -1px rgb(0 0 0 / 0.5), 0 2px 4px -2px rgb(0 0 0 / 0.5)',
  lg:   '0 10px 15px -3px rgb(0 0 0 / 0.6), 0 4px 6px -4px rgb(0 0 0 / 0.5)',
  xl:   '0 20px 25px -5px rgb(0 0 0 / 0.6), 0 8px 10px -6px rgb(0 0 0 / 0.5)',
  gold: '0 0 20px 0 rgb(201 168 76 / 0.25)',
  goldLg: '0 0 40px 0 rgb(201 168 76 / 0.35)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.5)',
} as const;

export const typography = {
  fontFamily: {
    bricolage: '"BricolageGrotesque", sans-serif',
    raleway:   '"Raleway", sans-serif',
    workSans:  '"WorkSans", sans-serif',
    abril:     '"AbrilFatface", serif',
    roboto:    '"Roboto", sans-serif',
  },
  fontSize: {
    xs:   ['0.75rem',   { lineHeight: '1rem' }],
    sm:   ['0.875rem',  { lineHeight: '1.25rem' }],
    base: ['1rem',      { lineHeight: '1.5rem' }],
    lg:   ['1.125rem',  { lineHeight: '1.75rem' }],
    xl:   ['1.25rem',   { lineHeight: '1.75rem' }],
    '2xl':['1.5rem',    { lineHeight: '2rem' }],
    '3xl':['1.875rem',  { lineHeight: '2.25rem' }],
    '4xl':['2.25rem',   { lineHeight: '2.5rem' }],
    '5xl':['3rem',      { lineHeight: '1.1' }],
    '6xl':['3.75rem',   { lineHeight: '1' }],
    '7xl':['4.5rem',    { lineHeight: '1' }],
    '8xl':['6rem',      { lineHeight: '1' }],
  },
  fontWeight: {
    light:      300,
    regular:    400,
    medium:     500,
    semibold:   600,
    bold:       700,
    extrabold:  800,
  },
  letterSpacing: {
    tighter: '-0.05em',
    tight:   '-0.025em',
    normal:  '0em',
    wide:    '0.025em',
    wider:   '0.05em',
    widest:  '0.1em',
    display: '0.15em',
  },
} as const;

export const zIndex = {
  hide:     -1,
  base:      0,
  raised:   10,
  dropdown: 100,
  sticky:   200,
  overlay:  300,
  modal:    400,
  popover:  500,
  toast:    600,
  tooltip:  700,
} as const;

export const transition = {
  fast:   '150ms ease',
  base:   '250ms ease',
  slow:   '400ms ease',
  spring: '500ms cubic-bezier(0.34, 1.56, 0.64, 1)',
} as const;
