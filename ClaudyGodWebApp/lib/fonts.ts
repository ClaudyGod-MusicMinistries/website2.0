import { Fraunces, Inter } from 'next/font/google';

/**
 * The site's type system: two families, not five.
 *   - Fraunces (`--font-display`) — soft-serif with real character, for
 *     headlines, hero copy, and scripture/quote accents.
 *   - Inter (`--font-sans`) — the workhorse for body copy and UI chrome;
 *     chosen for legibility at small sizes over personality.
 * Both are variable Google fonts, self-hosted at build time by
 * next/font/google (no manual .ttf files, no layout shift, no FOUT).
 */

export const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const fontVariables = `${fraunces.variable} ${inter.variable}`;
