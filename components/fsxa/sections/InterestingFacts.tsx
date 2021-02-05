import Component from 'vue-class-component'
import { Sections } from 'fsxa-ui'
import { FSXABaseSection, FSXARichText } from 'fsxa-pattern-library'
import { Image, RichTextElement } from 'fsxa-api'

export interface Payload {
  st_background_image?: Image
  st_counters?: Array<{
    previewId: string
    identifier: string
    data: {
      st_number: number
      st_text: string
    }
  }>
  st_headline: string
  st_tagline: string
  /** This can contain html */
  st_text: RichTextElement[]
}
@Component({
  name: 'InterestingFactsSection'
})
class InterestingFactsSection extends FSXABaseSection<Payload> {
  render() {
    return (
      <Sections.InterestingFactsSection
        headline={this.payload.st_headline}
        tagline={this.payload.st_tagline}
        text={<FSXARichText content={this.payload.st_text} />}
        counters={(this.payload.st_counters || []).map((counter) => ({
          previewId: counter.previewId,
          value: counter.data.st_number,
          label: counter.data.st_text
        }))}
        backgroundImage={
          this.payload.st_background_image?.resolutions.ORIGINAL
            ? {
                type: 'image',
                src: this.payload.st_background_image.resolutions.ORIGINAL.url,
                resolutions: this.payload.st_background_image.resolutions,
                previewId: this.payload.st_background_image.previewId
              }
            : undefined
        }
      />
    )
  }
}
export default InterestingFactsSection
