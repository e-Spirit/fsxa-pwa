import express, { Request, Response } from 'express'
// eslint-disable-next-line import/named
import { FSXAMiddlewareContext } from 'fsxa-nuxt-module'

export default {
  async handler(context: FSXAMiddlewareContext, req: Request, res: Response) {
    const app = express()
    app.get('/', (request, response) => {
      response.send('OK')
    })
    return app(req, res)
  },
  route: '/test123'
}
