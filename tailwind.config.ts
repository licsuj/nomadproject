import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: { '2xl': '1320px' },
    },
    extend: {
      fontFamily: {
        display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        // Surface
        background: 'hsl(var(--background))',
        paper: 'hsl(var(--paper))',
        border: 'hsl(var(--border))',
        // Text
        ink: {
          DEFAULT: 'hsl(var(--ink))',
          soft: 'hsl(var(--ink-soft))',
          mute: 'hsl(var(--ink-mute))',
        },
        // Accents
        sea: 'hsl(var(--sea))',
        accent: 'hsl(var(--accent))',
        terracotta: 'hsl(var(--terracotta))',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
} satisfies Config;
