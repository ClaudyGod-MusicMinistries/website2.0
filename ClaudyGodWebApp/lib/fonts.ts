import { Montserrat, Open_Sans, Raleway } from 'next/font/google';

/**
 * The site's type system: three families, deliberately mixed, not five.
 *   - Montserrat (`--font-display`) — geometric, confident sans for
 *     section titles and UI headings that need real weight/presence.
 *   - Raleway (`--font-raleway`) — light, airy display face reserved for
 *     large-scale statement copy (the Hero headline) where a bold
 *     geometric sans reads heavy/shouty instead of premium.
 *   - Open Sans (`--font-sans`) — humanist, highly legible body/UI font.
 * All three are variable Google fonts, self-hosted at build time by
 * next/font/google (no manual .ttf files, no layout shift, no FOUT).
 */

export const montserrat = Montserrat({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

export const raleway = Raleway({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-raleway',
  display: 'swap',
});

export const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const fontVariables = `${montserrat.variable} ${raleway.variable} ${openSans.variable}`;
