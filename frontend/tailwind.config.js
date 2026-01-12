/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // AFP UNO Corporate Colors
        uno: {
          purple: '#784785',      // Primary - UNO Purple
          'purple-dark': '#5a3563',  // Darker shade for hover states
          'purple-light': '#9361a0', // Lighter shade for backgrounds
          blue: '#00a9df',        // Secondary - UNO Blue
          'blue-dark': '#0088b8',    // Darker shade for hover
          'blue-light': '#33bce8',   // Lighter shade for accents
        },
        // Semantic colors using UNO palette
        primary: {
          DEFAULT: '#784785',
          dark: '#5a3563',
          light: '#9361a0',
        },
        secondary: {
          DEFAULT: '#00a9df',
          dark: '#0088b8',
          light: '#33bce8',
        },
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif'
        ],
      },
      boxShadow: {
        'uno': '0 4px 6px -1px rgba(120, 71, 133, 0.1), 0 2px 4px -1px rgba(120, 71, 133, 0.06)',
        'uno-lg': '0 10px 15px -3px rgba(120, 71, 133, 0.1), 0 4px 6px -2px rgba(120, 71, 133, 0.05)',
        'uno-xl': '0 20px 25px -5px rgba(120, 71, 133, 0.1), 0 10px 10px -5px rgba(120, 71, 133, 0.04)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-in': 'slideIn 0.4s ease-out',
        'bounce-soft': 'bounceSoft 0.6s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
