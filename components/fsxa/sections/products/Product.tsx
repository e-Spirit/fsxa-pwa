import { FSXABaseSection } from 'fsxa-pattern-library'
import { Sections } from 'fsxa-ui'
import { ImageRef } from 'fsxa-ui/src/types/utils'
import { Component } from 'vue-property-decorator'

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
  tt_installation: string
  tt_delivery: string
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
    return (
      <Sections.ProductDetailSection
        headline={this.payload.tt_name}
        images={this.payload.tt_media
          ?.filter(
            (item) => item?.data?.st_media?.resolutions?.ORIGINAL != null
          )
          .map<ImageRef>((item) => {
            const {
              previewId,
              data: {
                st_media: {
                  resolutions: {
                    ORIGINAL: { url, width, height }
                  }
                }
              }
            } = item
            return { src: url, dimensions: { width, height }, previewId }
          })}
        // TODO: add translations for tt_categories, tt_compatibility
        propertyList={[
          this.toProductProperties('tt_categories', this.payload.tt_categories),
          this.toProductProperties(
            'tt_compatibility',
            this.payload.tt_compatibility
          )
        ]}
        // TODO: add translations for tt_delivery, tt_installation, tt_compatibility
        foldableContentList={{
          tt_delivery: this.payload.tt_delivery,
          tt_installation: this.payload.tt_installation,
          tt_compatibility: `<ul>${this.payload.tt_compatibility.map(
            ({ value }) => `<li>${value}</li>`
          )}</ul>`
        }}
        description={this.payload.tt_abstract}
        price={this.payload.tt_price}
      />
    )
  }
}
export default Product
