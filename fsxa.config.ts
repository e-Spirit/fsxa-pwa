export default {
  devMode: false,
  defaultLocale: 'de_DE',
  useErrorBoundaryWrapper: true, // TODO: switch to false, when TNG-1196 is done
  components: {
    sections: '~/components/fsxa/sections',
    layouts: '~/components/fsxa/layouts',
    richtext: '~/components/fsxa/richtext',
    appLayout: '~/components/fsxa/AppLayout',
    loader: '~/components/fsxa/Loader',
    page404: '~/components/fsxa/Page404'
  },
  customRoutes: '~/customRoutes'
}
