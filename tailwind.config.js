/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: true,
  content: [],
  theme: {
    extend: {
      colors: {
        primary: '#696CFF',
        active: '#1814F3',
        secondary: '#8592A3',
        purple: '#4D44B5',
        success: '#71DD37',
        orange: '#FB7D5B',
        yellow: '#FCC43E',
        text: '#303972',
        while: '#FFFFFF',
        info: '#03C3EC',
        warning: '#FFAB00',
        error: '#FF4550',
        background: '#F3F4FF',
        slate: '#f1f3f4',
        green: '#4CBC9A',
        linear: '#4D44B51A',
        grey: {
          1: '#F5F5F5',
          2: '#C1BBEB',
          3: '#A098AE'
        }
      },
      backgroundImage: {},
      screens: {},
      maxWidth: {},
      borderRadius: {},
      keyframes: {
        modalSlideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' }
        },
        modalSlideOutLeft: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' }
        }
      },
      animation: {
        'modal-slide-in-right': 'modalSlideInRight 0.2s ease-out',
        'modal-slide-out-left': 'modalSlideOutLeft 0.2s ease-in'
      }
    }
  },
  plugins: []
}
