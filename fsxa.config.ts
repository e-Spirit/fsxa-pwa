import { CustomFilter } from 'fsxa-api/dist/types'

export default {
  devMode: false,
  defaultLocale: 'de_DE',
  components: {
    sections: '~/components/fsxa/sections',
    layouts: '~/components/fsxa/layouts',
    richtext: '~/components/fsxa/richtext',
    appLayout: '~/components/fsxa/AppLayout',
    loader: '~/components/fsxa/Loader',
    page404: '~/components/fsxa/Page404'
  },
  customRoutes: '~/customRoutes',
  customFilter: ((items) =>
    items.filter((item) => {
      if (typeof item === 'object' && 'data' in (item as object)) {
        const publishAt: string | undefined = (item as Record<'data', any>).data
          .tt_publish_at
        const published =
          !publishAt || new Date(publishAt).getTime() - Date.now() <= 0

        return published
      }

      return true
    })) as CustomFilter
}
