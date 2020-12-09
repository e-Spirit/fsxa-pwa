export default {
  devMode: true,
  defaultLocale: 'de_DE',
  components: {
    sections: '~/components/fsxa/sections',
    layouts: '~/components/fsxa/layouts',
    appLayout: '~/components/fsxa/AppLayout',
    loader: '~/components/fsxa/Loader'
  },
  globalSettingsKey: 'global_settings',
  mapDataQuery: (_: any) => {
    return []
  }
}
