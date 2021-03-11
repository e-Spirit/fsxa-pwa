import { Component } from 'vue-property-decorator'

import { RichTextElement } from 'fsxa-api'
import { FSXABaseSection } from 'fsxa-pattern-library'
import { Headline, Container, LineSeparator, TeaserSection } from 'fsxa-ui'

export interface Payload {
  st_autoPlay: boolean
  st_catalog: []
  st_interactiveVideo: {
    fsType: string
    name: string
    value: {}
  },
  st_youtubeVideo: {
    fsType: string,
    name: string,
    dapType: string,
    value: [
      {
        fsType: string
        identifier: string
        url: string
        value: {
          description: RichTextElement[]
          id: string
          posterUrl: string
          thumbnailUrl: string
          title: string
        }
      }
    ]
  }
}
export interface Meta {
  route: string
}
@Component({
  name: 'InteractiveYouTubeVideo'
})
class InteractiveYouTubeVideo extends FSXABaseSection<Payload, Meta> {

  render() {
    const youtubeID = this.payload.st_youtubeVideo.value[0].identifier;
    const autoplayParam = this.payload.st_autoPlay.valueOf() == true ? "?autoplay=true" : "";
    const title = this.payload.st_youtubeVideo.value[0].value.title;
    const description = this.payload.st_youtubeVideo.value[0].value.description;
    const url = "https://www.youtube-nocookie.com/embed/"
    return (

      <div
        data-testid="fsxa-video-section">

        <Container>
          {title && <Headline>{title}</Headline>}
          {title && <LineSeparator />}
          <div class="aspect-w-16 aspect-h-9 my-3">
            <iframe
              class="m-auto"
              src={`${url}${youtubeID}${autoplayParam}`}
              frameborder="0"
              allowfullscreen
            />
          </div>
          {description && (
            <div class="m-1 uppercase text-sm md:pr-6 lg:pr-8">{description}</div>
          )}
        </Container>

      </div>
    )
  }
}
export default InteractiveYouTubeVideo
