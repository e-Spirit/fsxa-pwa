# Server Side Rendering (SSR)

[<< Back to index](./index.md)

The FSXA-PWA project is based on the [Nuxt.js](https://nuxtjs.org) framework which supports server side rendering ([SSR](https://ssr.vuejs.org/#what-is-server-side-rendering-ssr)). In a single page application which uses client side rendering (CSR) the webserver only serves an almost empty HTML page and usually larger amounts of javascript. The javascript then gets executed in the browser where all the required json data gets requested. The application then renders the view using the requested data. The SSR approach is different in that the json data gets requested from the webserver and the rendering of the view takes place there. A fully rendered page is then sent to the client. This allows for search engines to crawl the pages more easily since they do not have the necessity to be able to execute javascript code. It also saves time on the initial download of the page because there is no additional code execution step in between downloads. Nuxt.js uses a hybrid approach where the generated javascript bundle is able to hydrate the client (ie. request json data and render on the client side) from this point onwards.

In order to utilize SSR you need a node.js environment to serve the webpage. This also means that when writing code in this project you have to keep in mind that you do not have access to the `window` or `document` objects except in the `beforeMount` or `mounted` hooks.

SSR is enabled in the FSXA-PWA by default. You can build the project for SSR deployment using

```bash
npm run build
```

This will create a `.nuxt` folder in your working directory with all the files required to run your application in SSR mode. You can start serving the application using

```bash
npm run start
```

You can turn SSR off in the `nuxt.config.ts`by setting `ssr` to `false`.

## Prerendered HTML

If all you need is [SEO](./SEO.md) you can also generate prerendered HTML pages by adding the following line to the `Configuration` object in the `nuxt.config.ts`. In this case you also do not need to serve the HTML from a node.js environment.

```typescript
target: "static",
```

You can then generate all available routes as HTML using

```bash
npm run generate
```

This will create a `dist` folder in your working directory containing all the files required to statically host your application. You can put these files on your own webserver or host them directly from your working directory using the following command

```bash
npm run start
```

This command will check your `nuxt.config.ts` to ensure it serves the correct version.
You can find more information on this topic in the [Nuxt.js documentation](https://nuxtjs.org/docs/2.x/get-started/commands#static-deployment-pre-rendered).