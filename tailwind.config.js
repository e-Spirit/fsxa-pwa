module.exports = {
  mode: 'jit',
  purge: {
    content: [
      './pages/**/*.vue',
      './pages/**/*.tsx',
      './pages/**/*.jsx',
      './components/**/*.vue',
      './components/**/*.tsx',
      './components/**/*.jsx',
      './assets/**/*.css'
    ]
  },
  theme: {
    extend: {
      colors: {
        highlight: '#4169e1'
      },
      fontFamily: {
        body: 'Montserrat'
      }
    }
  },
  variants: {},
  plugins: [require('@tailwindcss/aspect-ratio')]
}
