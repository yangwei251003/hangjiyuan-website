/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base dark blue background
        'base-dark': 'var(--color-base-dark)',
        // Area accent colors
        'accent-hero': 'var(--color-accent-hero)',
        'accent-agri': 'var(--color-accent-agri)',
        'accent-logi': 'var(--color-accent-logi)',
        'accent-fpv': 'var(--color-accent-fpv)',
        'accent-edu': 'var(--color-accent-edu)',
        
        // Dynamic active theme color mapped to scroll state
        'theme-accent': 'var(--theme-accent)',
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(var(--theme-accent-rgb), 0.2)',
        'glow-md': '0 0 25px rgba(var(--theme-accent-rgb), 0.4)',
        'glow-lg': '0 0 50px rgba(var(--theme-accent-rgb), 0.6)',
      }
    },
  },
  plugins: [],
}
