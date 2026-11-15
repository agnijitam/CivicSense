/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ig: {
          black: '#000000',
          dark: '#0A0A0A',
          surface: '#121212',
          elevated: '#1A1A1A',
          card: '#181818',
          border: '#262626',
          'border-light': '#363636',
          text: '#F5F5F5',
          muted: '#A8A8A8',
          subtle: '#737373',
        },
        brand: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316',
          600: '#EA580C', // Vibrant Orange
          700: '#C2410C',
        }
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif'
        ],
      },
      boxShadow: {
        'ig-card': '0 2px 12px rgba(0, 0, 0, 0.4)',
        'orange-glow': '0 0 20px rgba(249, 115, 22, 0.45)',
      }
    },
  },
  plugins: [],
}
