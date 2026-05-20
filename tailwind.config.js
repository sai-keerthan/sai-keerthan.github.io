/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Editorial Dark — Engineering Edition
        ink: {
          900: '#0a0a0b',   // deep page background
          800: '#0f0f11',   // section background
          700: '#141417',   // card background
          600: '#1a1a1e',   // raised card
          500: '#2a2a30',   // strong border
          400: '#3a3a42',   // muted border
        },
        bone: {
          100: '#f5f5f3',   // primary text
          200: '#d4d4d0',   // secondary text
          300: '#a3a39d',   // tertiary text
          400: '#73736d',   // disabled / decorative
        },
        accent: {
          // Restrained cryptographic teal — used sparingly for emphasis only
          DEFAULT: '#5eead4',
          dim: '#2dd4bf',
          deep: '#0d9488',
        },
      },
      fontFamily: {
        display: ['"Cabinet Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['"Satoshi"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.025em',
      },
      lineHeight: {
        none: '1',
        tight: '0.95',
        snug: '1.1',
      },
      animation: {
        'fade-up': 'fade-up 800ms cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'orb-drift': 'orb-drift 24s ease-in-out infinite',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'orb-drift': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)', opacity: '0.4' },
          '50%': { transform: 'translate(20px, -10px) scale(1.05)', opacity: '0.55' },
        },
      },
      backdropBlur: {
        xs: '4px',
      },
    },
  },
  plugins: [],
}
