/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        custom: {
          'base-1': '#F9F9F9',
          'base-2': '#F5F5F5',
          'base-3': '#E8E8E8',
          'base-4': '#BFBFBF',
          'base-5': '#5E5E5E',
          'base-6': '#353535',
          primary: '#F22539',
          secondary: '#C00E20',
          accent: '#ECA539',
        },
      },
    },
  },
  plugins: [],
}
