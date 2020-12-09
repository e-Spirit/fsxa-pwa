import { FSXABaseComponent } from 'fsxa-pattern-library'
import { Component } from 'vue-property-decorator'
import { Loader as UILoader } from 'fsxa-ui'

@Component({ name: 'Loader' })
class Loader extends FSXABaseComponent {
  render() {
    return (
      <div class="h-full w-full flex items-center justify-center">
        <UILoader />
      </div>
    )
  }
}
export default Loader
