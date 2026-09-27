import type { Config } from 'tailwindcss';

/**
 * Design tokens shared with spots.nomadmalta.com (spots/assets/board.css).
 * Limestone ground, white cards, deep grotto blue, sea-blue links,
 * one loud luzzu-boat yellow for primary actions.
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: { '2xl': '1200px' },
    },
    extend: {
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        sans: ['"Instrument Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        salt: '#EEF3F3',
        card: '#FFFFFF',
        line: '#D3DEE0',
        ink: { DEFAULT: '#0B1A24', soft: '#2F4552', mute: '#50636E' },
        grotto: { DEFAULT: '#08395F', 2: '#0D4C7C' },
        sea: '#0079BA',
        turq: '#22B8C6',
        luzzu: '#F6C21C',
        flag: '#C62D26',
        'on-dark': { DEFAULT: '#EAF6F8', mute: '#A9C6D3' },
        // Older names kept so nothing breaks
        background: '#EEF3F3',
        paper: '#FFFFFF',
        border: '#D3DEE0',
        accent: '#0079BA',
        terracotta: '#08395F',
      },
      borderRadius: {
        card: '18px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
} satisfies Config;
