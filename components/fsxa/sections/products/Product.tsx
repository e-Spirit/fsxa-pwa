import { FSXABaseSection } from 'fsxa-pattern-library'
import { Sections } from 'fsxa-ui'
import { Component } from 'vue-property-decorator'

interface Payload {
  tt_name: string
  tt_price: string
  tt_abstract: string
}
@Component({
  name: 'Product'
})
class Product extends FSXABaseSection<Payload> {
  render() {
    return (
      <Sections.ProductDetailSection
        headline={this.payload.tt_name}
        propertyList={[]}
        description={this.payload.tt_abstract}
        price={this.payload.tt_price}
      />
    )
  }
}
export default Product
