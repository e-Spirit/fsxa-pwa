import express from 'express'
import fs from 'fs'
import path from 'path'

const router = express.Router()

router.get('/', async (req, res) => {
  const host = [req.protocol, '://', req.headers.host].join('')
  const routesFile = fs.readFileSync(
    path.resolve(process.cwd(), './dist/routes.json'),
    {
      encoding: 'UTF-8'
    }
  )
  let routes: any[] = JSON.parse(routesFile)
  routes = routes.filter((item) => item.name !== 'fsxa-page')
  const navigation = await req.fsxaApi.fetchNavigation(null, 'de_DE')
  if (!navigation) return res.send('NO')
  const locations = [
    ...new Set([
      ...Object.keys(navigation.seoRouteMap).map((route) =>
        route.toLowerCase()
      ),
      ...routes.map((route) => (route.path as string).toLowerCase() + '/')
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

  console.log(routes)
})

export default {
  router,
  route: '/sitemap'
}
