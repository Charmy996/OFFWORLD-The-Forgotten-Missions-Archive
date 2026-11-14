/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mars: {
          dark: '#0c0a09',
          rust: '#b91c1c',
          amber: '#d97706',
          sand: '#ca8a04',
          ochre: '#ea580c',
          soil: '#78350f',
          copper: '#c2410c',
          dust: '#451a03'
        },
        space: {
          void: '#050507',
          surface: '#111217',
          card: '#16181f',
          border: '#272a38',
          subtle: '#363b4e',
          cyan: '#38bdf8'
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
