import { Request, Response } from 'express'
// eslint-disable-next-line import/named
import { FSXAMiddlewareContext } from 'fsxa-nuxt-module'

export default {
  async handler(context: FSXAMiddlewareContext, req: Request, res: Response) {
    if (!req.query.locale) {
      return res.status(404).json({
        error:
          'No locale was specified. Please provide it through ?locale query'
      })
    }
    if (!req.params.identifier) {
      return res.status(404).json({
        error: 'No identifier was specified'
      })
    }
    const media = await context.fsxaAPI.fetchElement({
      id: req.params.identifier,
      locale: req.query.locale as string
    })
    if (media.resolutions && media.resolutions.ORIGINAL) {
      return res.redirect(media.resolutions.ORIGINAL.url)
    }
    res.send({
      error: 'Unknown media type',
      media
    })
  },
  route: '/download/:identifier'
}
