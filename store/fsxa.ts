import { getFSXAModule } from 'fsxa-pattern-library'
import axios from 'axios'

export default getFSXAModule(
  {
    apiKey: process.env.FSXA_API_KEY as string,
    mode: process.env.FSXA_MODE as 'preview' | 'release',
    projectId: process.env.FSXA_PROJECT_ID as string,
    remotes: process.env.FSXA_REMOTES
      ? process.env.FSXA_REMOTES.split(';').reduce(
          (result: any, remote: string) => {
            const [key, value] = remote.split(':')
            return {
              ...result,
              [key]: value
            }
          },
          {}
        )
      : {},
    caas: process.env.FSXA_CAAS as string,
    navigationService: process.env.FSXA_NAVIGATION_SERVICE as string
  },
  axios
)
