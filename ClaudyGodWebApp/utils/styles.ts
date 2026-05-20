/**
 * Centralized Tailwind class patterns.
 * Import individual groups or the default `s` object.
 * Every dev on this project uses these — don't inline ad-hoc classes for these patterns.
 *
 * Usage:
 *   import { s } from '@/utils/styles';
 *   <div className={s.card}>...</div>
 *
 *   Or named imports:
 *   import { layout, text, form } from '@/utils/styles';
 *   <section className={layout.section}>...</section>
 */

// ─── Layout ────────────────────────────────────────────────────────────────
export const layout = {
  /** 1280px max-width, responsive side padding */
  container:       'w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl',
  /** Narrower prose container */
  containerNarrow: 'w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl',
  /** Full-bleed wide layout */
  containerWide:   'w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-2xl',
  /** Standard vertical section padding */
  section:         'py-16 md:py-20 lg:py-24',
  sectionTop:      'pt-16 md:pt-20 lg:pt-24',
  sectionBottom:   'pb-16 md:pb-20 lg:pb-24',
  /** Hero: full viewport height, centered content */
  hero:            'relative min-h-dvh flex flex-col items-center justify-center overflow-hidden',
} as const;

// ─── Cards ─────────────────────────────────────────────────────────────────
export const card = {
  /** Base card surface */
  base:     'rounded-xl bg-surface-elevated border border-surface-border p-6',
  /** Card with hover elevation + gold border tint */
  hover:    'rounded-xl bg-surface-elevated border border-surface-border p-6 transition-all duration-300 hover:border-gold-500/25 hover:shadow-card-hover hover:-translate-y-0.5',
  /** Glassmorphism card */
  glass:    'rounded-xl glass p-6 transition-all duration-300 hover:border-gold-500/20',
  /** Flat minimal card */
  flat:     'rounded-xl bg-surface-muted border border-surface-border p-6',
} as const;

// ─── Text patterns ─────────────────────────────────────────────────────────
export const text = {
  /** Eyebrow / section label above headings */
  eyebrow:   'text-xs font-worksans font-medium uppercase tracking-widest text-gold-500',
  /** Gold gradient text */
  gradient:  'bg-gradient-gold bg-clip-text text-transparent',
  /** Body copy — readable line length */
  body:      'text-sm leading-relaxed text-neutral-300',
  /** Secondary/muted helper text */
  muted:     'text-xs text-neutral-500',
  /** Page hero subheading */
  subtitle:  'text-base md:text-lg leading-relaxed text-neutral-300',
} as const;

// ─── Dividers ──────────────────────────────────────────────────────────────
export const divider = {
  /** Standard horizontal rule */
  base:  'border-t border-surface-border',
  /** Prominent gold rule — used below section headings */
  gold:  'h-px w-12 bg-gradient-to-r from-gold-500 to-gold-300',
  /** Full-width gold bar */
  goldFull: 'h-px w-full bg-gradient-to-r from-transparent via-gold-500/50 to-transparent',
} as const;

// ─── Form elements ─────────────────────────────────────────────────────────
export const form = {
  /** Text / email / date inputs */
  input: [
    'w-full rounded-lg bg-surface-elevated border border-surface-border',
    'px-4 py-2.5 text-sm text-white placeholder:text-neutral-600',
    'transition-colors focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500/50',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  ].join(' '),
  /** <textarea> */
  textarea: [
    'w-full rounded-lg bg-surface-elevated border border-surface-border',
    'px-4 py-3 text-sm text-white placeholder:text-neutral-600 resize-y min-h-[120px]',
    'transition-colors focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500/50',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  ].join(' '),
  /** <select> */
  select: [
    'w-full rounded-lg bg-surface-elevated border border-surface-border',
    'px-4 py-2.5 text-sm text-white',
    'transition-colors focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500/50',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  ].join(' '),
  /** Field label */
  label:  'block text-xs font-worksans font-medium uppercase tracking-wide text-neutral-400 mb-1.5',
  /** Inline error message below a field */
  error:  'mt-1 text-xs text-status-error',
  /** Inline success/hint message below a field */
  hint:   'mt-1 text-xs text-neutral-500',
} as const;

// ─── Badge / pill ──────────────────────────────────────────────────────────
export const badge = {
  gold:    'inline-flex items-center gap-1 rounded-full bg-gold-500/10 px-2.5 py-0.5 text-xs font-medium text-gold-400 border border-gold-500/20',
  muted:   'inline-flex items-center gap-1 rounded-full bg-surface-elevated px-2.5 py-0.5 text-xs font-medium text-neutral-400 border border-surface-border',
  success: 'inline-flex items-center gap-1 rounded-full bg-status-successBg px-2.5 py-0.5 text-xs font-medium text-status-success border border-status-success/20',
  error:   'inline-flex items-center gap-1 rounded-full bg-status-errorBg px-2.5 py-0.5 text-xs font-medium text-status-error border border-status-error/20',
  warning: 'inline-flex items-center gap-1 rounded-full bg-status-warningBg px-2.5 py-0.5 text-xs font-medium text-status-warning border border-status-warning/20',
} as const;

// ─── Interactive states ─────────────────────────────────────────────────────
export const interactive = {
  /** Scale + brightness press effect for clickable elements */
  press:       'transition-all active:scale-[0.97]',
  /** Gold focus ring — apply on focusable elements */
  focusRing:   'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-base',
  /** Smooth color transition */
  transition:  'transition-colors duration-200',
} as const;

// ─── Image ─────────────────────────────────────────────────────────────────
export const image = {
  /** Dark gradient overlay on hero images */
  heroOverlay: 'absolute inset-0 bg-gradient-to-b from-transparent via-surface-base/70 to-surface-base',
  /** Subtle vignette for card images */
  cardOverlay: 'absolute inset-0 bg-gradient-to-t from-surface-base/90 via-transparent to-transparent',
  /** Aspect ratios */
  landscape:   'aspect-video object-cover w-full',
  portrait:    'aspect-[3/4] object-cover w-full',
  square:      'aspect-square object-cover w-full',
} as const;

// ─── Convenience default export (all groups) ───────────────────────────────
export const s = { layout, card, text, divider, form, badge, interactive, image } as const;
