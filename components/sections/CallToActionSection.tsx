import { FSXABaseSection } from 'fsxa-pattern-library'
import { Component } from 'vue-property-decorator'
import { FSXAButton, FSXARichText, FSXAContainer } from 'fsxa-ui'

export interface Payload {
  // eslint-disable-next-line
  st_text: string
}
@Component({
  name: 'CallToActionSection'
})
class CallToActionSection extends FSXABaseSection<Payload> {
  render() {
    return (
      <div class="w-full">
        <FSXAContainer>
          <FSXARichText text={this.payload.st_text} />
          <FSXAButton variant="animated"></FSXAButton>
        </FSXAContainer>
      </div>
    )
  }
}
export default CallToActionSection
