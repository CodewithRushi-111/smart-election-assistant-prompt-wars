/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: { 50: '#FFF8EC', 500: '#FF9933', 600: '#E8882A', 900: '#7A3D05' },
        indigo:  { 50: '#EEF0FF', 500: '#1F3B8E', 600: '#172D6E', 900: '#0A1535' },
        green:   { 50: '#EDFAF0', 500: '#138808', 600: '#0F6A06', 900: '#063004' },
        navy:    '#000080' // Ashoka Chakra color
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Noto Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}
