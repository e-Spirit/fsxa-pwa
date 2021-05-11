For the development we recommend to work with [Postman](https://www.postman.com/) and will also discuss it in the examples.
However, this is not mandatory and any other fitting tool can also be used.

First you have to make sure that there is a folder where all API interfaces are defined.
Normally there is the folder `customRoutes` in which a new `.ts` file can be created. The path to this folder is also
specified in the `fsxa.config.ts` under the attribute `customRoutes`. If this folder does not exist, such a folder can
be created anywhere in the project, it is only important that the path to it is specified in the `fsxa.config.ts`.
The same applies if the folder is to be renamed.

After a new file is created in the respective folder, we have to create a basic structure so that the 'FSXA-Nuxt-Module'
can automatically recognize and process the route.

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
  route: '/your-custom-route'
}
```

With this you import all necessary dependencies from `express` and the `FSXA-Nuxt-Module` and also export a `handler`
and a `route` as default.

The `handler` takes over the complete logic of the single route and provides the endpoint. Thereby you have all the
freedoms provided by `express`. We will not discuss all functionalities here, we recommend the documentation
of [express](https://expressjs.com/) itself.

Also you have under `request` the incoming request and under `response` an object with which can be used to
send a response.

The `route` specifies the basic path to the API interface.
