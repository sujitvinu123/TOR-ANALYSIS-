/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'gov-primary': '#1e40af',      // Professional government blue
        'gov-secondary': '#3b82f6',    // Lighter blue
        'gov-accent': '#2563eb',       // Accent blue
        'gov-success': '#059669',      // Success green
        'gov-warning': '#d97706',      // Warning orange
        'gov-danger': '#dc2626',       // Danger red
        'gov-purple': '#7c3aed',       // Purple accent
        'gov-teal': '#14b8a6',         // Teal accent
        'gov-indigo': '#6366f1',       // Indigo accent
        'gov-rose': '#e11d48',         // Rose accent
        'gov-light': '#f8fafc',        // Light background
        'gov-gray': '#64748b',         // Gray text
        'gov-dark': '#1e293b',         // Dark text
        'gov-border': '#e2e8f0',       // Border color
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Poppins', 'Inter', 'sans-serif'],
        heading: ['Space Grotesk', 'Inter', 'sans-serif'],
        body: ['Roboto', 'Inter', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
        '4xl': '72px',
      },
      animation: {
        'grid': 'grid 20s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
        'glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        grid: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { left: '-100%' },
          '100%': { left: '100%' },
        },
        'pulse-glow': {
          '0%, 100%': { 
            opacity: '1',
            boxShadow: '0 0 20px rgba(0, 212, 255, 0.5)',
          },
          '50%': { 
            opacity: '0.8',
            boxShadow: '0 0 40px rgba(0, 212, 255, 0.8)',
          },
        },
      },
      boxShadow: {
        'glow': '0 0 20px rgba(0, 212, 255, 0.5)',
        'glow-lg': '0 0 40px rgba(0, 212, 255, 0.8)',
        'glow-purple': '0 0 20px rgba(124, 58, 237, 0.5)',
        'inner-glow': 'inset 0 0 20px rgba(0, 212, 255, 0.3)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

