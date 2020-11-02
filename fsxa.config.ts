export default {
  devMode: true,
  sections: '~/components/fsxa/sections',
  layouts: '~/components/fsxa/layouts',
  mapDataQuery: (query) => {
    console.log(query)
    return []
  }
}
