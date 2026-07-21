import { Montserrat, Open_Sans } from 'next/font/google';

/**
 * The site's type system: two families, not five.
 *   - Montserrat (`--font-display`) — geometric, confident sans for
 *     headlines, hero copy, and section titles.
 *   - Open Sans (`--font-sans`) — humanist, highly legible body/UI font.
 * Both are variable Google fonts, self-hosted at build time by
 * next/font/google (no manual .ttf files, no layout shift, no FOUT).
 */

export const montserrat = Montserrat({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

export const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const fontVariables = `${montserrat.variable} ${openSans.variable}`;
