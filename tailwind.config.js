/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.{jsx,js,tsx,ts}",
    "./resources/views/**/*.blade.php",
  ],
  theme: {
    extend: {
      colors: {
        base: "#080C14",
        card: "#0F1624",
        accent: "#DC143C",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
