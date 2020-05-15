import { getFSXAModule } from 'fsxa-pattern-library'

const { getters, mutations, actions, state } = getFSXAModule({
  apiKey: '49be300d-5314-8fa5-6768-7814ed22509b',
  caas:
    'https://demo-caas-api.e-spirit.cloud/390d0e28-90bf-4640-8211-ea63f3f794e6/preview.content',
  navigationService:
    'https://coba-demo-navigationservice.e-spirit.cloud/navigation/preview.390d0e28-90bf-4640-8211-ea63f3f794e6',
  locale: 'de_DE'
})

export { getters, mutations, actions, state }
