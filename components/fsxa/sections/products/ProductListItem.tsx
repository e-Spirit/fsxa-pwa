import { FSXABaseSection } from 'fsxa-pattern-library'
import { Component } from 'vue-property-decorator'
import { ProductListItem as UIProductListItem } from 'fsxa-ui'

export interface Payload {
  tt_name: string
  tt_teaser_text: string
  tt_teaser_image: {
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
  tt_price: string
}
export interface Meta {
  route: string
}
@Component({
  name: 'ProductListItem'
})
class ProductListItem extends FSXABaseSection<Payload, Meta> {
  render() {
    return (
      <UIProductListItem
        class="h-full"
        title={this.payload.tt_name}
        image={{
          type: 'image',
          previewId: this.payload.tt_teaser_image.previewId,
          src: this.payload.tt_teaser_image.resolutions.ORIGINAL.url,
          resolutions: this.payload.tt_teaser_image.resolutions,
          sizes:
            '(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw'
        }}
        description={this.payload.tt_teaser_text}
        price={this.payload.tt_price}
        url={this.meta.route}
        handleClick={() => this.triggerRouteChange({ route: this.meta.route })}
      />
    )
  }
}
export default ProductListItem
