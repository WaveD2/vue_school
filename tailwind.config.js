/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false,
  content: [],
  theme: {
    extend: {
      colors: {
        primary: '#696CFF',

        secondary: '#8592A3',

        success: '#71DD37',

        info: '#03C3EC',

        warning: '#FFAB00',

        error: '#FF3E1D',
        background: '#F5F5F9',

        slate: '#f1f3f4',

        green: {
          50: '#30AF5B',
          90: '#292C27'
        }
      },
      backgroundImage: {
        header: "url('/src/assets/bg-header.jpeg')",
        bannerOffset: "url('/src/assets/bg_be_gai.png')"
      },
      screens: {},
      maxWidth: {},
      borderRadius: {}
    }
  },
  plugins: []
}
