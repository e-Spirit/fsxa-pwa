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
        highlight: '#D5DD02'
      }
    }
  },
  variants: {},
  plugins: [require('@tailwindcss/aspect-ratio')]
}
