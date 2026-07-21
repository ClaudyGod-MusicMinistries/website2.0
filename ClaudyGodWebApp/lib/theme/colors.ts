/**
 * The color palette — the single source of truth. `tailwind.config.ts`
 * imports these objects directly rather than duplicating the hex values,
 * so there is exactly one place that defines a color, whether it's
 * consumed as a Tailwind class (`bg-purple-600`) or as a raw JS value
 * (inline styles, SVG fills, canvas/chart colors, gradient strings).
 *
 * Two-color discipline: `purple` is the entire structural system — one
 * hue, ten lightness steps. Backgrounds, borders, body text, headings,
 * and secondary buttons all draw from this single ramp. `neutral` is a
 * purple-tinted grayscale (not true gray) for the same reason — no third
 * neutral color sneaks in through text-neutral or border-neutral call
 * sites. `gold` is a single rare accent — its steps stay close together
 * rather than spanning to white/black, since it's an accent, not a
 * structural ramp. Reserve it for one primary CTA at a time.
 */

export const purple = {
  50:  '#F7F5FB',
  100: '#EEEAF6',
  200: '#D9D0EA',
  300: '#BCADD9',
  400: '#9B85C4',
  500: '#7B62AC',
  600: '#614991',
  700: '#4C3873',
  800: '#382957',
  900: '#251B3D',
} as const;

/** Purple-tinted grayscale — overrides Tailwind's default `neutral`. */
export const neutral = {
  50:  '#FAFAFC',
  100: '#F1F0F4',
  200: '#E2E0E8',
  300: '#C9C6D2',
  400: '#A29DB0',
  500: '#7D7889',
  600: '#5E5A6B',
  700: '#47434F',
  800: '#322F38',
  900: '#1E1C22',
} as const;

export const gold = {
  50:  '#F6E9DC',
  100: '#EFD9C0',
  200: '#DEB68C',
  300: '#CE9962',
  400: '#C07E3E',
  500: '#B5651D',
  600: '#9C5719',
  700: '#834915',
  800: '#6A3B11',
  900: '#4A290C',
} as const;

/** Light-section backgrounds — purple-tinted, not true off-white cream. */
export const cream = {
  50:  '#FAF9FC',
  100: '#F2F0F6',
  200: '#E5E1ED',
  300: '#D2CBDE',
  400: '#ADA3C0',
} as const;

/** Dark-mode backgrounds — purple-tinted near-black, not true black. */
export const surface = {
  base:     '#07060F',
  muted:    '#0C0A16',
  elevated: '#14111F',
  overlay:  '#1D1929',
  border:   '#2C2638',
  divider:  '#241F30',
  deep:     '#07060F',
  raised:   '#0D0B1A',
} as const;

export const status = {
  success:   '#10B981',
  warning:   '#F59E0B',
  error:     '#EF4444',
  info:      '#3B82F6',
  successBg: '#052E16',
  warningBg: '#451A03',
  errorBg:   '#450A0A',
  infoBg:    '#0C1A3A',
} as const;

export const brand = {
  gold:      gold[500],
  goldLight: gold[300],
  dark:      surface.base,
  deeper:    surface.muted,
  accent:    gold[700],
} as const;

export const colors = { purple, neutral, gold, cream, surface, status, brand } as const;

export type ColorScale = typeof purple;
export type ColorToken = keyof typeof colors;

/** '#B5651D' -> '181 101 29' — for building `rgb(... / alpha)` shadow/gradient strings without re-typing a hex value tailwind.config.ts already has as a token. */
export function hexToRgbString(hex: string): string {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `${r} ${g} ${b}`;
}
