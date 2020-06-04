import 'vue-tsx-support/enable-check'
import { Component } from 'vue-property-decorator'
import { FSXAPage, FSXAConfigProvider } from 'fsxa-pattern-library'
import 'fsxa-ui/dist/fsxa-ui.css'
import 'fsxa-pattern-library/dist/fsxa-pattern-library.css'
import * as tsx from 'vue-tsx-support'

@Component
export default class IndexPage extends tsx.Component<{}> {
  render() {
    const path = this.$router.currentRoute.path
    return (
      <div class="w-full">
        <FSXAConfigProvider editMode debugMode>
          <FSXAPage
            id="c8a158a3-2ba3-427c-a7e4-7d41d9844464"
            path={path}
            handleRouteChange={console.log}
          />
        </FSXAConfigProvider>
      </div>
    )
  }
}
