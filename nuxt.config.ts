import path from 'path'
import { NuxtConfig } from '@nuxt/types/config'

const config: NuxtConfig = {
  ssr: true,
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** env variables
   */
  publicRuntimeConfig: {
    NUXT_HOST: process.env.NUXT_HOST,
    NUXT_PORT: process.env.NUXT_PORT,
    FSXA_CAAS: process.env.FSXA_CAAS,
    FSXA_PROJECT_ID: process.env.FSXA_PROJECT_ID,
    FSXA_NAVIGATION_SERVICE: process.env.FSXA_NAVIGATION_SERVICE,
    FSXA_MODE: process.env.FSXA_MODE,
    FSXA_TENANT_ID: process.env.FSXA_TENANT_ID,
    FSXA_MAPS_APIKEY: process.env.FSXA_MAPS_APIKEY,
    FSXA_REMOTES: process.env.FSXA_REMOTES
  },
  privateRuntimeConfig: {
    FSXA_API_KEY: process.env.FSXA_API_KEY
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    'fsxa-pattern-library/dist/fsxa-pattern-library.css',
    'fsxa-ui/dist/fsxa-ui.css',
    '~/assets/css/global.css'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/pwa'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    'fsxa-nuxt-module'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    babel: {
      plugins: [
        [
          '@babel/plugin-proposal-decorators',
          {
            legacy: true
          }
        ],
        [
          '@babel/plugin-proposal-class-properties',
          {
            loose: true
          }
        ]
      ]
    },
    /*
     ** You can extend webpack config here
     */
    extend(config) {
      config!.resolve!.alias!.vue = path.resolve('./node_modules/vue')
    }
  },
  buildDir: 'dist'
}

export default config
