import { FSXABaseComponent } from 'fsxa-pattern-library'
import { Component } from 'vue-property-decorator'

@Component({ name: 'Page404' })
class Page404 extends FSXABaseComponent {
  render() {
    return (
      <div class="h-full w-full flex items-center justify-center">
        <div>
          <div class="ui-block ui-text-center ui-uppercase ui-mt-6 ui-leading-10">
            404 Error
          </div>
          <div class="ui-block ui-text-center ui-text-4xl ui-font-bold ui-mb-6 ui-leading-10">
            Page not found.
          </div>
        </div>
      </div>
    )
  }
}
export default Page404
