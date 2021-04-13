import { FSXAApi, FSXAContentMode } from 'fsxa-api'
import express from 'express'
const expressIntegration = require('fsxa-api/dist/lib/integrations/express')
  .default

const router = express.Router()

const enterpriseDev = new FSXAApi(FSXAContentMode.PREVIEW, {
  mode: 'remote',
  config: {
    apiKey: '77b6911e-ad45-42af-87b6-7f694e7ef3f2',
    caas: 'https://enterprise-dev-caas-api.e-spirit.cloud',
    navigationService:
      'https://enterprise-dev-navigationservice.e-spirit.cloud/navigation',
    projectId: '3a7eba65-3bd9-4df4-a176-350dbfa19104',
    tenantId: 'enterprise-dev'
  }
})

const enterprisePatchday = new FSXAApi(FSXAContentMode.PREVIEW, {
  mode: 'remote',
  config: {
    apiKey: '04c03f82-8db5-483a-a05d-1b6455db90a0',
    caas: 'https://enterprise-caas-api.e-spirit.cloud',
    navigationService:
      'https://enterprise-navigationservice.e-spirit.cloud/navigation',
    projectId: 'a5feeeae-5697-43d8-aa1d-fc3d4915c79d',
    tenantId: 'enterprise-prod'
  }
})

router.use('/dev', expressIntegration({ api: enterpriseDev }))
router.use('/patchday', expressIntegration({ api: enterprisePatchday }))

export default {
  router,
  route: '/projects'
}
