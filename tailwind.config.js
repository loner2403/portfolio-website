   /** @type {import('tailwindcss').Config} */
   export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          sans: ['Lato', 'sans-serif'], // Update with your chosen font
        },
        colors: {
          colors: {
            'music-primary': '#1DB954', // Bright green for primary elements
            'music-secondary': '#191414', // Dark background
            'music-text': '#FFFFFF', // White text for contrast
            'music-accent': '#FF5733', // Accent color for highlights
            'music-muted': '#B3B3B3', // Muted text color
          },
        },
        keyframes: {
          fillAndShrink: {
            '0%': { transform: 'scale(1)', opacity: '1' },
            '50%': { transform: 'scale(10)', opacity: '0.5' },
            '100%': { transform: 'scale(1)', opacity: '1' },
          },
        },
        animation: {
          fillAndShrink: 'fillAndShrink 3s ease-in-out forwards',
        },
      },
    },
    plugins: [],
  };