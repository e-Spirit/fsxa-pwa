import Component from 'vue-class-component'
import { FSXABaseSection, FSXARichText } from 'fsxa-pattern-library'
import { Sections } from 'fsxa-ui'
import { Image, RichTextElement } from 'fsxa-api'

export interface Payload {
  st_headline: RichTextElement[]
  st_jumbo_headline: string
  st_kicker: string
  st_picture?: Image
  st_picture_alt: string | null
  st_text: RichTextElement[]
  st_button?: {
    data: {
      lt_button_text: string
      lt_internal: {
        referenceId: string
        referenceType: string
      }
    }
  }
}
@Component({
  name: 'TeaserSection'
})
class TeaserSection extends FSXABaseSection<Payload> {
  render() {
    return (
      <Sections.TeaserSection
        headline={(<FSXARichText content={this.payload.st_headline} />) as any}
        kicker={this.payload.st_kicker}
        text={(<FSXARichText content={this.payload.st_text} />) as any}
        buttonText={this.payload.st_button?.data.lt_button_text}
        onButtonClick={() =>
          this.triggerRouteChange({
            pageId: this.payload.st_button?.data.lt_internal.referenceId
          })
        }
        media={
          this.payload.st_picture
            ? {
                type: 'image',
                src: this.payload.st_picture.resolutions.ORIGINAL.url,
                resolutions: this.payload.st_picture.resolutions,
                previewId: this.payload.st_picture.previewId
              }
            : undefined
        }
      />
    )
  }
}
export default TeaserSection
