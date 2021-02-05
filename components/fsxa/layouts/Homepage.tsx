import Component from 'vue-class-component'
import { FSXABaseLayout, FSXARichText } from 'fsxa-pattern-library'
import { Sections } from 'fsxa-ui'
import { RichTextElement } from 'fsxa-api/dist/types'

export interface Slide {}
export interface Data {
  pt_show_chat: boolean
  pt_slider: {
    data: {
      st_button: {
        data: {
          lt_button_text: string
          lt_internal: string | null
          lt_product_link: {
            route: string
          }
        }
      }
      st_picture: {
        previewId: string
        resolutions: Record<
          string,
          {
            url: string
            width: number
            height: number
          }
        >
      }
      st_picture_alt: string | null
      st_description: string
      st_title: RichTextElement[]
    }
  }[]
}
@Component({
  name: 'HomepageLayout',
  // We will set the page-title for every page that is using the homepage layout
  head() {
    return {
      title: (this as any).currentPage.label
    }
  }
})
class HomepageLayout extends FSXABaseLayout<Data> {
  render() {
    return (
      <div>
        <div class="tw-w-full screen-height-without-header apply-header-height-as-bottom-padding tw-bg-white">
          <Sections.FullWidthSliderSection
            slides={this.data.pt_slider.map((slide) => ({
              buttonContent: slide.data.st_button.data.lt_button_text,
              media: {
                type: 'image',
                previewId: slide.data.st_picture.previewId,
                src: slide.data.st_picture.resolutions.ORIGINAL.url,
                resolutions: slide.data.st_picture.resolutions
              },
              teaser: slide.data.st_description,
              title: <FSXARichText content={slide.data.st_title} />
            }))}
            onClick={({ slideIndex }) =>
              this.triggerRouteChange({
                route: this.data.pt_slider[slideIndex].data.st_button.data
                  .lt_product_link.route
              })
            }
          />
        </div>
        {this.renderContentByName('content')}
      </div>
    )
  }
}
export default HomepageLayout
