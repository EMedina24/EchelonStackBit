module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.js',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {



    
    extend: {

      backgroundImage: theme => ({
        'hero-Echelon': "url('/src/assets/images/Hero.gif')",
         'col1-Echelon': "url('/src/assets/images/pic1.png')",
          'col2-Echelon': "url('/src/assets/images/pic2.jpeg')",
           'col3-Echelon': "url('/src/assets/images/pic3.png')",
        
       })
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
     require('@tailwindcss/custom-forms'),
  ],
}
