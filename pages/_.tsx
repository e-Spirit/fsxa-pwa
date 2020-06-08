import 'vue-tsx-support/enable-check'
import { Component } from 'vue-property-decorator'
import { FSXAPage, FSXAConfigProvider } from 'fsxa-pattern-library'
import 'fsxa-pattern-library/dist/fsxa-pattern-library.css'
import 'fsxa-ui/dist/fsxa-ui.css'
import * as tsx from 'vue-tsx-support'

@Component
export default class IndexPage extends tsx.Component<{}> {
  render() {
    const path = this.$router.currentRoute.path
    return (
      <div class="w-full">
        <FSXAConfigProvider editMode debugMode>
          <FSXAPage path={path} handleRouteChange={route => this.$router.push({ path: route })} />
        </FSXAConfigProvider>
      </div>
    )
  }
}
