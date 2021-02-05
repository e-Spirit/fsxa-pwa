module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  /**
   * We will prefix tailwind classes with tw- so we do not have any naming clashes with the fsxa-ui
   */
  prefix: 'tw-',
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
  plugins: []
}
