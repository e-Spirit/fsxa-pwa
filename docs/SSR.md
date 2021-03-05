# Server Side Rendering (SSR)

[<< Back to index](./index.md)

The FSXA-PWA project is based on the [nuxt.js](https://nuxtjs.org) framework which supports server side rendering ([SSR](https://ssr.vuejs.org/#what-is-server-side-rendering-ssr)). This means that as opposed to the single page application, the server does not just send json data but instead a fully rendered page to the browser. This allows for search engines to crawl the pages easily. Most of the javascript code will be executed on the server which means th

In order to utilize SSR you need a node.js environment to serve the webpage. This also means that when writing code in this project you have to keep in mind that you do not have access to the `window` or `document` objects except in the `beforeMount` or `mounted` hooks.

You can turn SSR off in the `nuxt.config.ts`by setting `ssr` to `false`