/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",

  ],
  theme: {
    screens: {
      'sm': '576px',
      // => @media (min-width: 576px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      screens: {
      'xs' : {'min':'320px' , 'max':'576px'},
      },
      boxShadow: {
        'custom': '0px 4px 10px 0px #00000040',
      },
      fontFamily: {
        noto: ['Noto Sans', 'sans-serif'],
      }
    },
    container: {
      center: true,
    },
  
  },
  plugins: [],
}

