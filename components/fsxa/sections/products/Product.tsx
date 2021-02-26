import { RichTextElement } from 'fsxa-api/dist/types'
import { FSXABaseSection, FSXARichText } from 'fsxa-pattern-library'
import { Sections, Accordion } from 'fsxa-ui'
import { Component } from 'vue-property-decorator'
import { getFallbackTranslation } from '~/utils/i18n'

interface Image {
  id: string
  previewId: string
  resolutions: {
    [resolution: string]: {
      width: number
      height: number
      url: string
    }
  }
}

interface Media {
  data: {
    st_media: Image
    st_media_alt_text: string | null
  }
  previewId: string
}

interface KeyValuePair {
  key: string
  value: string
}

interface Payload {
  tt_categories: Array<KeyValuePair>
  tt_compatibility: Array<KeyValuePair>
  tt_name: string
  tt_price: string
  tt_abstract: string
  tt_installation: RichTextElement[]
  tt_delivery: RichTextElement[]
  tt_media: Media[]
}
@Component({
  name: 'Product'
})
class Product extends FSXABaseSection<Payload> {
  toProductProperties(title: string, properties: Array<KeyValuePair>) {
    return {
      title,
      properties: properties.map(({ key, value }) => ({
        id: key,
        name: value
      }))
    }
  }

  // TODO: add button with text
  render() {
    const deliveryTitle = this.globalSettings?.data.pt_label_product_delivery ||
    getFallbackTranslation([
      this.locale,
      'product_detail',
      'tt_delivery'
    ])
    const installationTitle = this.globalSettings?.data.pt_label_product_installation ||
    getFallbackTranslation([
      this.locale,
      'product_detail',
      'tt_installation'
    ])
    return (
      <Sections.ProductDetailSection
        headline={this.payload.tt_name}
        images={this.payload.tt_media.map((item) => ({
          src: item.data.st_media.resolutions.ORIGINAL.url,
          resolutions: item.data.st_media.resolutions,
          previewId: item.previewId,
          type: 'image'
        }))}
        propertyList={[
          this.toProductProperties(
            this.globalSettings?.data.pt_label_product_categories ||
              getFallbackTranslation([
                this.locale,
                'product_detail',
                'tt_categories'
              ]),
            this.payload.tt_categories
          ),
          this.toProductProperties(
            this.globalSettings?.data.pt_label_product_compatibility ||
              getFallbackTranslation([
                this.locale,
                'product_detail',
                'tt_compatibility'
              ]),
            this.payload.tt_compatibility
          )
        ]}
        scopedSlots={{
          additionalContent: () => (
            <div class="ui-w-full ui-mx-2 ui-px-6">
              <Accordion title={deliveryTitle} dark>
                <FSXARichText content={this.payload.tt_delivery} />
              </Accordion>
              <Accordion title={installationTitle} dark>
                <FSXARichText content={this.payload.tt_installation} />
              </Accordion>
            </div>
          )
        }}
        description={this.payload.tt_abstract}
        price={this.payload.tt_price}
      />
    )
  }
}
export default Product
