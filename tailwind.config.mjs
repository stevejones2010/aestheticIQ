/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // AestheticIQ palette - Pharma Navy (production)
        navy: {
          900: '#0a1929', // primary dark - hero, footer, dark sections
          800: '#1a3a5c', // hero gradient end
          700: '#1a202c', // body text dark
          50: '#f8fafc',  // off-white section backgrounds
        },
        cyan: {
          500: '#00b4d8', // primary accent
          600: '#0097b8', // hover state
          700: '#0284a8', // darker variant for text on light bg
        },
        // ClinicScore palette - Editorial Clay (held in reserve)
        clay: {
          500: '#c15b37', // ClinicScore primary
          400: '#e89272', // ClinicScore lighter variant
        },
        // Functional greys
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          900: '#0f172a',
        },
      },
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"DM Serif Display"', 'Georgia', 'serif'],
        mono: ['"SF Mono"', 'Menlo', 'monospace'],
      },
      fontSize: {
        // Custom scale aligned to wireframes
        'xs': ['11px', '1.5'],
        'sm': ['12.5px', '1.55'],
        'base': ['14px', '1.65'],
        'lg': ['15.5px', '1.7'],
        'xl': ['17px', '1.6'],
        '2xl': ['1.4rem', '1.2'],
        '3xl': ['1.75rem', '1.2'],
        '4xl': ['2.2rem', '1.15'],
        '5xl': ['2.8rem', '1.1'],
        '6xl': ['3.4rem', '1.08'],
      },
      letterSpacing: {
        eyebrow: '0.15em', // for uppercase eyebrow labels
        wider: '0.05em',
        tighter: '-0.5px',
      },
      borderRadius: {
        'pill': '100px',
        'card': '14px',
        'large': '18px',
      },
      boxShadow: {
        'card': '0 10px 30px rgba(10, 25, 41, 0.06)',
        'card-hover': '0 15px 40px rgba(10, 25, 41, 0.08)',
        'card-strong': '0 10px 40px rgba(10, 25, 41, 0.06)',
      },
      maxWidth: {
        'container': '1200px',
        'tight': '880px',
        'reading': '720px',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
