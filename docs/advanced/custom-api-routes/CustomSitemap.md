# Custom Sitemap

In this chapter we will describe how to implement a Rest interface so that you can define your own sitemap.

Please note the general preface on how to define CustomRoutes. Here we build directly on it.

As a starting point you can use the file `customSitemap.ts` with the content:

```typescript
import express, { Request, Response } from 'express'
// eslint-disable-next-line import/named
import { FSXAMiddlewareContext } from 'fsxa-nuxt-module'

export default {
  async handler(
    context: FSXAMiddlewareContext,
    request: Request,
    response: Response
  ) {
    const app = express()

    return app(request, response)
  },
  route: '/sitemap'
}
```

First of all, you want to display all the data from the navigation service in your sitemap.
To do this, after initializing the app, you have to create a new GET endpoint and make it asynchronous so you can use 
`await` and not have to work with `promise`.

```typescript
app.get('/', async (req, res) => {
  const host = [req.protocol, '://', req.headers.host].join('')
  const navigation = await context.fsxaAPI.fetchNavigation(null, 'de_DE')
  const locations = Object.keys(navigation?.seoRouteMap || [])

  res.set('Content-Type', 'text/xml')
  res.send(`<?xml version="1.0" encoding="UTF-8"?>
      <urlset>
      ${locations
        .map(
          (location) => `
            <url><loc>${host}${location}</loc></url>
            `
        )
        .join('\n')}
            </urlset>`)
})
```

Here you first compose the host by getting the protocol e.g. `http` and the host from the headers e.g. `localhost:3000`.
Next get the navigation with the FSXA-API. The FSXA API is available to us through the `context`.
There you don't have an `initalPath`, so enter `null` as first parameter and as locale enter `'de_DE'` to get all 
german routes back.

From the data of the navigation service you need only the information from the `seoRouteMap` and from it only the `keys`,
because these are the URLs.

In the response, you need to set the `Content-Type` to `text/xml` because the sitemap is rendered in XML.

Then you compose the sitemap in the response. Define the `version` and the `encoding` and as a frame a `<urlset>`.
You need to map the individual entries that are in the constant `locations` by enclosing each entry in `<url><loc>`.
As content use the `host`, which has been assembled before and the entry itself.

Send this string as a response.

In this example, in addition to the content that comes from the navigation service, we show how to add the routes that 
you can define under `~/pages`.

When the Nuxt application starts, a JSON file is generated under `~/dist/routes.json` in which all routes are listed. 
Use this file so that you can integrate the routes into our sitemap.

In the endpoint, you want to read the contents of this file and filter out the `fsxa-page` entry.

Therefore import the following packages:

```typescript
import fs from 'fs'
import path from 'path'
```

However, these do not need to be installed as they are part of Node's default API.

```typescript
const routesFile = fs.readFileSync(
  path.resolve(process.cwd(), './dist/routes.json'),
  {
    encoding: 'UTF-8'
  }
)
let routes: any[] = JSON.parse(routesFile)
routes = routes.filter((item) => item.name !== 'fsxa-page')
```

So that you can replace the `any[]`, create an interface and write it directly after the imports into the
`customSitemap.ts` file.

```typescript
interface RouteItem {
  name: string
  path: string
}
```

Change the type:

```typescript
let routes: RouteItem[] = JSON.parse(routesFile)
```

Add these routes to the `locations`.

```typescript
const locations = [...Object.keys(navigation?.seoRouteMap || []), ...routes]
```

If you try this now and create a few pages that have the same name as the pages you get back from the navigation 
service, you find that they now appear twice in the sitemap.

You need to put the routes in a consistent format. To do this, make all the letters lowercase and add 
a `/` to the local routes.

To avoid having duplicates, create a `Set`.


```typescript
const locations = [
  ...new Set([
    ...Object.keys(navigation?.seoRouteMap || []).map((route) =>
      route.toLowerCase()
    ),
    ...routes.map((route) => route.path.toLowerCase() + '/')
  ])
]
```

The final version of the `customSitemap.ts` file looks like this:

```typescript
import express, { Request, Response } from 'express'
import fs from 'fs'
import path from 'path'
// eslint-disable-next-line import/named
import { FSXAMiddlewareContext } from 'fsxa-nuxt-module'

interface RouteItem {
  name: string
  path: string
}

export default {
  async handler(context: FSXAMiddlewareContext, req: Request, res: Response) {
    const app = express()
    app.get('/', async (request, response) => {
      const host = [req.protocol, '://', req.headers.host].join('')
      const routesFile = fs.readFileSync(
        path.resolve(process.cwd(), './dist/routes.json'),
        {
          encoding: 'UTF-8'
        }
      )
      let routes: RouteItem[] = JSON.parse(routesFile)
      routes = routes.filter((item) => item.name !== 'fsxa-page')
      const navigation = await context.fsxaAPI.fetchNavigation(null, 'de_DE')
      const locations = [
        ...new Set([
          ...Object.keys(navigation?.seoRouteMap || []).map((route) =>
            route.toLowerCase()
          ),
          ...routes.map((route) => route.path.toLowerCase() + '/')
        ])
      ]

      res.set('Content-Type', 'text/xml')
      res.send(`<?xml version="1.0" encoding="UTF-8"?>
      <urlset>
      ${locations
        .map(
          (location) => `
            <url><loc>${host}${location}</loc></url>
            `
        )
        .join('\n')}
            </urlset>`)
    })
    return app(req, res)
  },
  route: '/sitemap'
}
```
