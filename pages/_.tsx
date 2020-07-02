import 'vue-tsx-support/enable-check'
import { Component } from 'vue-property-decorator'
import { FSXAPage, FSXAConfigProvider } from 'fsxa-pattern-library'
import * as tsx from 'vue-tsx-support'
import './../assets/css/global.css'

@Component
export default class IndexPage extends tsx.Component<{}> {
  render() {
    const path = this.$router.currentRoute.path
    return (
      <div class="w-full w-full">
        <FSXAConfigProvider>
          <FSXAPage
            path={path}
            handleRouteChange={(route) => this.$router.push({ path: route })}
          />
        </FSXAConfigProvider>
      </div>
    )
  }
}
