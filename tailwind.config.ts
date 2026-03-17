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
        accent: 'var(--accent)',
        'accent-2': 'var(--accent-2)',
        'accent-dim': 'var(--accent-dim)',
        text: {
          DEFAULT: 'var(--text)',
          2: 'var(--text-2)',
          3: 'var(--text-3)',
        },
        green: 'var(--green)',
        red: 'var(--red)',
        blue: 'var(--blue)',
        purple: 'var(--purple)',
        orange: 'var(--orange)',
        yellow: 'var(--yellow)',
        border: 'var(--border)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
