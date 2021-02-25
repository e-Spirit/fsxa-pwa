import { Component } from 'vue-property-decorator'

import { RichTextElement } from 'fsxa-api'
import { FSXABaseSection } from 'fsxa-pattern-library'
import { Sections } from 'fsxa-ui'

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
    const videoParams = this.payload.st_autoPlay.valueOf() == true ? [] : [{ param: "autoplay", value: "1" }];
    return (
      <Sections.VideoSection
        youtubeId={this.payload.st_youtubeVideo.value[0].identifier}
        description={this.payload.st_youtubeVideo.value[0].value.description}
        title={this.payload.st_youtubeVideo.value[0].value.title}
        parameters={videoParams}
      />
    )
  }
}
export default InteractiveYouTubeVideo
