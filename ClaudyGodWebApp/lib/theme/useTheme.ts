import { colors, hexToRgbString } from './colors';

/**
 * JS-level access to the theme tokens for the cases a Tailwind class can't
 * cover — inline `style={{ background: ... }}` gradients, SVG fills,
 * `--brand` CSS custom properties passed to hover states, ambient glow
 * orbs. Before this existed, components reached for a hardcoded hex value
 * in those spots (e.g. `rgba(124,58,237,0.12)`) because there was nowhere
 * else to get one — that's what silently drifted out of sync with the
 * actual palette. Pull the value from here instead:
 *
 *   const theme = useTheme();
 *   style={{ background: theme.rgba('purple', 600, 0.12) }}
 *
 * Not backed by React context — the palette is static (no user-facing
 * light/dark toggle exists), so this is a plain accessor, not a
 * subscription. Named/shaped like a hook for two reasons: it reads
 * naturally at every existing call site, and it's the natural seam to
 * grow into a real context-backed hook later if the site ever adds
 * runtime theme switching, without changing every caller.
 */
export function useTheme() {
  return {
    colors,
    /** Hex string for a token step, e.g. theme.hex('purple', 600) -> '#614991'. */
    hex(
      token: Exclude<keyof typeof colors, 'brand' | 'status'>,
      step: keyof (typeof colors)['purple']
    ): string {
      const scale = colors[token] as Record<string | number, string>;
      return scale[step];
    },
    /** `rgb(r g b / alpha)` string for a token step, ready to drop into an inline style or gradient. */
    rgba(
      token: Exclude<keyof typeof colors, 'brand' | 'status'>,
      step: keyof (typeof colors)['purple'],
      alpha: number
    ): string {
      const scale = colors[token] as Record<string | number, string>;
      return `rgb(${hexToRgbString(scale[step])} / ${alpha})`;
    },
  };
}
