module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  /**
   * We will prefix tailwind classes with tw- so we do not have any naming clashes with the fsxa-ui
   */
  prefix: 'tw-',
  purge: [],
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
