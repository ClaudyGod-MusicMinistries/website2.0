import type { Config } from 'tailwindcss';
import { purple, neutral, gold, cream, surface, brand, status, hexToRgbString } from './lib/theme/colors';

const goldRgb = hexToRgbString(gold[500]);
const purpleRgb = hexToRgbString(purple[600]);

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
    './utils/**/*.{ts,tsx}',
    './types/**/*.{ts,tsx}',
  ],
  theme: {
    // ─── Container ───────────────────────────────────────────────
    // Formalizes the `max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12`
    // pattern that was previously hand-typed at ~35 call sites instead
    // of using a token. Use the `container` utility (or the narrow/wide
    // variants defined in globals.css) instead of a fresh arbitrary value.
    container: {
      center: true,
      padding: { DEFAULT: '1rem', sm: '1.5rem', lg: '3rem' },
      screens: { '2xl': '1400px' },
    },
    extend: {
      // ─── Brand colours ───────────────────────────────────────────
      // Values live in lib/theme/colors.ts — the single source of truth,
      // importable from both this config (for Tailwind classes) and from
      // any component (for raw JS values: inline styles, SVG fills,
      // gradient strings) via the useTheme() hook in lib/theme/useTheme.ts.
      // Two-color discipline: `purple` is the entire structural system —
      // one hue, ten lightness steps. `neutral` overrides Tailwind's true
      // gray with a purple-tinted scale so no third neutral color sneaks
      // in. `gold` is a single rare accent, not a structural ramp.
      colors: { purple, neutral, gold, cream, surface, brand, status },

      // ─── Typography ──────────────────────────────────────────────
      // Two families (next/font/google, see lib/fonts.ts): `display`
      // and `sans` are the only font-family classes in the codebase —
      // every call site was migrated off the old 5-family names
      // (bricolage/abril/raleway/worksans/roboto). Change the actual
      // typeface only in lib/fonts.ts; these class names should stay put.
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        sans:    ['var(--font-sans)', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
      },
      letterSpacing: {
        display: '0.15em',
      },

      // ─── Spacing / sizing ────────────────────────────────────────
      spacing: {
        18:  '4.5rem',
        22:  '5.5rem',
        26:  '6.5rem',
        30:  '7.5rem',
        34:  '8.5rem',
        38:  '9.5rem',
        42:  '10.5rem',
        50:  '12.5rem',
        54:  '13.5rem',
        58:  '14.5rem',
        62:  '15.5rem',
        68:  '17rem',
        72:  '18rem',
        80:  '20rem',
        88:  '22rem',
        96:  '24rem',
        104: '26rem',
        112: '28rem',
        120: '30rem',
        128: '32rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      minHeight: {
        hero:    '100dvh',
        section: '60vh',
      },

      // ─── Shadows ─────────────────────────────────────────────────
      // gold/purple values derive from goldRgb/purpleRgb above (in turn
      // from lib/theme/colors.ts) instead of re-typing the hex as a
      // separate rgb() string that could silently drift from the token.
      boxShadow: {
        gold:    `0 0 20px 0 rgb(${goldRgb} / 0.25)`,
        'gold-lg': `0 0 40px 0 rgb(${goldRgb} / 0.35)`,
        'gold-glow': `0 0 60px 0 rgb(${goldRgb} / 0.45)`,
        'inner-dark': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.5)',
        card: '0 4px 24px 0 rgb(0 0 0 / 0.4)',
        'card-hover': '0 8px 40px 0 rgb(0 0 0 / 0.6)',
        header: '0 4px 24px 0 rgb(0 0 0 / 0.08)',
        // Light-background card shadows — 'card'/'card-hover' above are
        // tuned for dark surfaces and read as too heavy on white cards.
        'card-light': '0 2px 12px 0 rgb(0 0 0 / 0.06)',
        'card-light-hover': '0 8px 32px 0 rgb(0 0 0 / 0.10)',
        'card-light-lg': '0 20px 60px 0 rgb(0 0 0 / 0.15)',
        purple: `0 4px 20px 0 rgb(${purpleRgb} / 0.5)`,
        'purple-lg': `0 6px 28px 0 rgb(${purpleRgb} / 0.6)`,
        // Centered glows (play buttons, icon badges) vs the offset shadows above.
        'glow-dark': '0 0 40px 0 rgb(0 0 0 / 0.4)',
        'glow-purple': `0 0 50px 0 rgb(${purpleRgb} / 0.5)`,
        // Offset gold shadow for gold CTA buttons — distinct shape from the
        // centered 'gold'/'gold-lg' glows above.
        'gold-cta': `0 4px 20px 0 rgb(${goldRgb} / 0.35)`,
        'gold-cta-hover': `0 6px 28px 0 rgb(${goldRgb} / 0.45)`,
        popup: '0 24px 64px 0 rgb(0 0 0 / 0.6)',
      },

      // ─── Borders ─────────────────────────────────────────────────
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },

      // ─── Animations ──────────────────────────────────────────────
      keyframes: {
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-down': {
          '0%':   { opacity: '0', transform: 'translateY(-24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-left': {
          '0%':   { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'slide-in-right': {
          '0%':   { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'scale-in': {
          '0%':   { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-gold': {
          '0%, 100%': { boxShadow: `0 0 0 0 rgb(${goldRgb} / 0.4)` },
          '50%':      { boxShadow: `0 0 0 12px rgb(${goldRgb} / 0)` },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to:   { transform: 'rotate(360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        'fade-in':        'fade-in 0.4s ease forwards',
        'fade-up':        'fade-up 0.5s ease forwards',
        'fade-down':      'fade-down 0.5s ease forwards',
        'slide-in-left':  'slide-in-left 0.4s ease forwards',
        'slide-in-right': 'slide-in-right 0.4s ease forwards',
        'scale-in':       'scale-in 0.3s ease forwards',
        shimmer:          'shimmer 1.8s linear infinite',
        'pulse-gold':     'pulse-gold 2s ease-in-out infinite',
        'spin-slow':      'spin-slow 3s linear infinite',
        float:            'float 3s ease-in-out infinite',
      },

      // ─── Gradients (via backgroundImage) ─────────────────────────
      backgroundImage: {
        'gradient-gold':   `linear-gradient(135deg, ${gold[500]} 0%, ${gold[300]} 50%, ${gold[500]} 100%)`,
        'gradient-dark':   `linear-gradient(180deg, ${surface.muted} 0%, ${surface.base} 100%)`,
        'gradient-hero':   `linear-gradient(180deg, transparent 0%, rgb(${hexToRgbString(surface.base)} / 0.8) 70%, ${surface.base} 100%)`,
        'gradient-card':   `linear-gradient(135deg, ${surface.elevated} 0%, ${surface.overlay} 100%)`,
        'gradient-radial-gold': `radial-gradient(ellipse at center, rgb(${goldRgb} / 0.15) 0%, transparent 70%)`,
        'shimmer-base':    `linear-gradient(90deg, transparent 25%, rgb(${goldRgb} / 0.08) 50%, transparent 75%)`,
      },

      // ─── Z-index ─────────────────────────────────────────────────
      zIndex: {
        hide:     '-1',
        base:     '0',
        raised:   '10',
        dropdown: '100',
        sticky:   '200',
        overlay:  '300',
        modal:    '400',
        popover:  '500',
        toast:    '600',
        tooltip:  '700',
      },

      // ─── Screens ─────────────────────────────────────────────────
      screens: {
        xs: '480px',
      },
    },
  },
  plugins: [],
};

export default config;
