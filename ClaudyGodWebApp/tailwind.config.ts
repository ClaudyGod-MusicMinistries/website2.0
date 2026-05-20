import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
    './utils/**/*.{ts,tsx}',
    './types/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      // ─── Brand colours ───────────────────────────────────────────
      colors: {
        gold: {
          50:  '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#C9A84C',
          600: '#A88A2E',
          700: '#8B6914',
          800: '#6B4D00',
          900: '#4A3400',
        },
        surface: {
          base:     '#080808',
          muted:    '#0E0E0E',
          elevated: '#161616',
          overlay:  '#1E1E1E',
          border:   '#2A2A2A',
          divider:  '#232323',
        },
        brand: {
          gold:    '#C9A84C',
          goldLight: '#E8C96A',
          dark:    '#080808',
          deeper:  '#0E0E0E',
          accent:  '#8B6914',
        },
        status: {
          success:   '#10B981',
          warning:   '#F59E0B',
          error:     '#EF4444',
          info:      '#3B82F6',
          successBg: '#052E16',
          warningBg: '#451A03',
          errorBg:   '#450A0A',
          infoBg:    '#0C1A3A',
        },
      },

      // ─── Typography ──────────────────────────────────────────────
      fontFamily: {
        bricolage: ['BricolageGrotesque', 'sans-serif'],
        raleway:   ['Raleway', 'sans-serif'],
        worksans:  ['WorkSans', 'sans-serif'],
        abril:     ['AbrilFatface', 'serif'],
        roboto:    ['Roboto', 'sans-serif'],
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
      boxShadow: {
        gold:    '0 0 20px 0 rgb(201 168 76 / 0.25)',
        'gold-lg': '0 0 40px 0 rgb(201 168 76 / 0.35)',
        'gold-glow': '0 0 60px 0 rgb(201 168 76 / 0.45)',
        'inner-dark': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.5)',
        card: '0 4px 24px 0 rgb(0 0 0 / 0.4)',
        'card-hover': '0 8px 40px 0 rgb(0 0 0 / 0.6)',
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
          '0%, 100%': { boxShadow: '0 0 0 0 rgb(201 168 76 / 0.4)' },
          '50%':      { boxShadow: '0 0 0 12px rgb(201 168 76 / 0)' },
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
        'gradient-gold':   'linear-gradient(135deg, #C9A84C 0%, #E8C96A 50%, #C9A84C 100%)',
        'gradient-dark':   'linear-gradient(180deg, #0E0E0E 0%, #080808 100%)',
        'gradient-hero':   'linear-gradient(180deg, transparent 0%, rgba(8,8,8,0.8) 70%, #080808 100%)',
        'gradient-card':   'linear-gradient(135deg, #161616 0%, #1E1E1E 100%)',
        'gradient-radial-gold': 'radial-gradient(ellipse at center, rgba(201,168,76,0.15) 0%, transparent 70%)',
        'shimmer-base':    'linear-gradient(90deg, transparent 25%, rgba(201,168,76,0.08) 50%, transparent 75%)',
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
