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
        'text': '#ebf9ff',
        'background': '#012532',
        'background_pop': '#0b3647',
        'primary': '#FEEDB4',
        'secondary': '#61d1ff',
        'rose': '#F2B2B2',
        'bg_prim': '#344d4c',
        'bg_sec': '#14485b',
      },
    },
  },
  plugins: [],
}
