import { FSXABaseSection } from 'fsxa-pattern-library'
import { Component } from 'vue-property-decorator'
import {
  FSXARichText,
  FSXAButton,
  FSXAContainer,
  FSXARow,
  FSXACol
} from 'fsxa-ui'

export interface Payload {
  st_text: string
  st_button: {
    data: {
      lt_button_text: string
      lt_internal: {
        referenceId: string
      }
    }
  }
}
@Component({
  name: 'CallToActionSection'
})
class CallToActionSection extends FSXABaseSection<Payload> {
  render() {
    return (
      <FSXAContainer>
        <FSXARow class="py-48 items-center justify-center">
          <FSXACol lg_width="8">
            <FSXARichText text={this.payload.st_text} class="text-2xl" />
          </FSXACol>
          <FSXACol lg_width="4">
            <FSXAButton
              variant="animated"
              handleClick={() =>
                this.handleRouteChangeRequest({
                  pageId: this.payload.st_button.data.lt_internal.referenceId
                })
              }
            >
              {this.payload.st_button.data.lt_button_text}
            </FSXAButton>
          </FSXACol>
        </FSXARow>
      </FSXAContainer>
    )
  }
}
export default CallToActionSection
