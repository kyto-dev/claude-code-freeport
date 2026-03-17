import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        'surface-2': 'var(--surface-2)',
        'surface-3': 'var(--surface-3)',
        gold: 'var(--gold)',
        'gold-2': 'var(--gold-2)',
        'gold-dim': 'var(--gold-dim)',
        text: {
          DEFAULT: 'var(--text)',
          2: 'var(--text-2)',
          3: 'var(--text-3)',
        },
        green: 'var(--green)',
        red: 'var(--red)',
        blue: 'var(--blue)',
        purple: 'var(--purple)',
        border: 'var(--border)',
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}

export default config
