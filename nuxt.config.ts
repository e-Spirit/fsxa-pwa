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
    FSXA_HOST: process.env.FSXA_HOST,
    FSXA_PORT: process.env.FSXA_PORT,
    FSXA_MAPS_APIKEY: process.env.FSXA_MAPS_APIKEY
  },
  privateRuntimeConfig: {},
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
    [
      'fsxa-nuxt-module',
      {
        NUXT_HOST: process.env.NUXT_HOST,
        NUXT_PORT: process.env.NUXT_PORT,
        FSXA_HOST: process.env.FSXA_HOST,
        FSXA_PORT: process.env.FSXA_PORT
      }
    ]
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
  buildDir: 'dist',
  server: {
    port: 3000
  }
}

export default config
