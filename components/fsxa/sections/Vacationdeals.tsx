import Component from 'vue-class-component'
import { FSXABaseSection, FSXARichText } from 'fsxa-pattern-library'
import { RichTextElement } from 'fsxa-api'

export interface Payload {
  st_headline: RichTextElement[]
  st_featured_products_picture: {
    data: {
      tt_abstract: string
      tt_teaser_text: string
      tt_teaser_image: {
        resolutions: {
          portrait: {
            url: string
          }
        }
      }
    }
  }[]
}
@Component({
  name: 'VacationDeals'
})
class VacationDeals extends FSXABaseSection<Payload> {
  render() {
    return (
      <div class="px-5 py-10 flex flex-col text-gray-800 bg-gray-50">
        <div class="ui-mx-auto ui-relative sm:ui-container ui-px-6 md:ui-px-10 lg:ui-px-12 ui-py-6 md:ui-py-12 lg:ui-py-24">
          <h6 class="uppercase text-4xl mb-6">
            <div>
              <FSXARichText content={this.payload.st_headline} />
            </div>
          </h6>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 xl:gap-10">
            {this.payload.st_featured_products_picture.map((item) => (
              <div class="group shadow-lg relative overflow-hidden">
                <img
                  src={item.data.tt_teaser_image.resolutions.portrait.url}
                  alt=""
                  class="rounded transition duration-300 filter group-hover:brightness-50"
                />
                <div class="absolute top-0 tracking-wider w-full left-1/2 transform -translate-x-1/2 backdrop-filter backdrop-blur-md backdrop-contrast-50 bg-gray-800 group-hover:text-gray-100 bg-opacity-0 text-center text-gray-50 text-2xl  px-2 py-1 rounded">
                  <span>{item.data.tt_teaser_text}</span>
                </div>
                <div class="absolute bottom--4 group-hover:-translate-y-40 text-3xl sm:text-xl sm:group-hover:-translate-y-24 transition-all duration-500 left-1/2 transform -translate-x-1/2 group-hover:block text-gray-200 w-full text-center">
                  {item.data.tt_abstract}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}
export default VacationDeals
