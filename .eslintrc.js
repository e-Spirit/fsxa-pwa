module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  ignorePatterns: ['.gitignore', '*.d.ts', '.prettierrc'],
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
    'plugin:cypress/recommended'
  ],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    camelcase: 'off',
    'vue/script-setup-uses-vars': 'off'
  }
}
