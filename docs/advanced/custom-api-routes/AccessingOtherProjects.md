In this chapter we will implement a REST interface so that we can access other projects.

Please note the general preface on how to define CustomRoutes. Here we build directly on it.

As a starting point we have a file named `fetchOtherProject.ts` with the content

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
  route: '/projects'
}
```

After we have `imported` the `FSXAApi` and FSXAContentMode

```typescript
import { FSXAApi, FSXAContentMode } from 'fsxa-api'
```

we can create a new instance of a FSXAApi, which we fill with the respective data of the project we want to target.

```typescript
const otherProject = new FSXAApi(FSXAContentMode.PREVIEW, {
  mode: 'remote',
  config: {
    apiKey: 'xxx',
    caas: 'xxx',
    navigationService: 'xxx',
    projectId: 'xxx',
    tenantId: 'xxx'
  }
})
```

As `mode` `remote` must be selected. The attributes in the `config` must also be filled. We recommend to write this data 
into the `.env` file and then call it with the help of `process.env`. This way there is no danger that important 
data will not be pushed.

This data is **not** displayed in the client when the application is running, 
because this code is executed exclusively on the server.

You now need to make the project available. For this you use the express integration provided by the FSXAApi:

```typescript
const expressIntegration = require('fsxa-api/dist/lib/integrations/express')
  .default
```

```typescript
export default {
  async handler(context: FSXAMiddlewareContext, req: Request, res: Response) {
    const app = express()
    app.use('/other', expressIntegration({ api: otherProject }))
    return app(req, res)
  },
  route: '/projects'
}
```

This endpoint can now be used in a component to retrieve the information from the targeted project.

To achieve this, you again create an instance of FSXAApi there, but with the `mode: 'proxy'`.

You have to give a `baseURL` as second argument. This is the URL you just created as endpoint.

```typescript
new FSXAApi(FSXAContentMode.PREVIEW, {
  mode: 'proxy',
  baseUrl: '/api/projects/other'
})
```

If you want to use this FSXAApi in multiple components, we recommend a base component in which you instantiate and 
inherit the FSXAApi. The components that should use the FSXAAApi can inherit from this base component and
have access to it.
