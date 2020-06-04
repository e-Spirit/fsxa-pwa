import { FSXABaseSection } from 'fsxa-pattern-library'
import { Component } from 'vue-property-decorator'

export interface Payload {
  st_headline: string
}
@Component({
  name: 'WelcomeSection'
})
class WelcomeSection extends FSXABaseSection<Payload> {
  render() {
    return (
      <div class="p-10 bg-pink-800 text-white">
        Well Hello from our Nuxt-App:
        <p domPropsInnerHTML={this.payload.st_headline} />
      </div>
    )
  }
}
export default WelcomeSection
