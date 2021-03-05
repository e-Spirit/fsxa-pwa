# Server Side Rendering (SSR)

[<< Back to index](./index.md)

The FSXA-PWA project is based on the [nuxt.js](https://nuxtjs.org) framework which supports server side rendering ([SSR](https://ssr.vuejs.org/#what-is-server-side-rendering-ssr)). This means that as opposed to the single page application, the server does not just send json data but instead a fully rendered page to the browser. This allows for search engines to crawl the pages easily. Most of the javascript code will be executed on the server which means that the time until content appears on the screen is much faster. On the other hand switching from one page to another takes longer than in a single page application.

In order to utilize SSR you need a node.js environment to serve the webpage. This also means that when writing code in this project you have to keep in mind that you do not have access to the `window` or `document` objects except in the `beforeMount` or `mounted` hooks.

SSR is enabled in the FSXA-PWA by default. You can build the project for SSR deployment using

```bash
npm run build
```

You can turn SSR off in the `nuxt.config.ts`by setting `ssr` to `false`.

## Prerendered HTML

If all you want is [SEO](./SEO.md) you can also generate prerendered html pages by adding the following line to the `Configuration` object in the `nuxt.config.ts. In this case you also do not need to serve the html from a node.js environment.

```typescript
target: "static",
```

You can then generate all available routes as html using

```bash
npm run generate
```

You can find more information on this topic in the [nuxt.js documentation](https://nuxtjs.org/docs/2.x/get-started/commands#static-deployment-pre-rendered).
