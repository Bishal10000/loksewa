import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        surface2: 'var(--color-surface-2)',
        border: 'var(--color-border)',
        text: 'var(--color-text)',
        muted: 'var(--color-muted)',
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        success: 'var(--color-success)',
        prasasan: 'var(--color-prasasan)',
        pararastra: 'var(--color-pararastra)',
        lekha: 'var(--color-lekha)',
        nyaya: 'var(--color-nyaya)',
        sansad: 'var(--color-sansad)',
        technical: 'var(--color-technical)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-plus-jakarta)', 'sans-serif'],
        devanagari: ['var(--font-tiro-devanagari)', 'serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(255,255,255,0.08), 0 24px 80px rgba(0,0,0,0.35)',
        card: '0 10px 30px rgba(0,0,0,0.22)',
      },
      backgroundImage: {
        'hero-gradient':
          'radial-gradient(circle at 20% 20%, rgba(181,23,43,0.35), transparent 28%), radial-gradient(circle at 80% 10%, rgba(0,53,128,0.35), transparent 28%), radial-gradient(circle at 50% 80%, rgba(245,166,35,0.18), transparent 30%)',
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '50%': { transform: 'translate3d(0, -16px, 0) scale(1.04)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        drift: 'drift 8s ease-in-out infinite',
        shimmer: 'shimmer 12s linear infinite',
      },
    },
  },
};

export default config;