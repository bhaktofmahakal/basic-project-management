/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        "primary": "#1dd341",
        "primary-dark": "#15a031",
        "background-light": "#f6f8f6",
        "background-dark": "#112114",
        "sidebar-bg": "#0F1B2C",
        "zebra-stripe": "#F5E9DA",
        "surface-light": "#ffffff",
        "surface-dark": "#1a2e1e",
      },
      fontFamily: {
        "display": ["Inter", "sans-serif"],
        "body": ["IBM Plex Sans", "sans-serif"],
      },
      borderRadius: {
        "DEFAULT": "0.5rem",
        "lg": "1rem",
        "xl": "1.5rem",
        "full": "9999px",
      },
    },
  },
  plugins: [],
}
