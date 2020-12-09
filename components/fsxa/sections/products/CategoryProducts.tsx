import {
  ComparisonQueryOperatorEnum,
  Dataset,
  QueryBuilderQuery
} from 'fsxa-api'
import { FSXABaseSection } from 'fsxa-pattern-library'
import { Component } from 'vue-property-decorator'
import { Container, ProductListItem, Sections } from 'fsxa-ui'
import Loader from '../../Loader'

interface Payload {
  filterParams: {
    category?: string
  }
  entityType: string
  schema: string
}
@Component({
  name: 'CategoryProducts'
})
class CategoryProducts extends FSXABaseSection<Payload> {
  serverPrefetch() {
    return this.fetchProducts()
  }

  mounted() {
    if (!this.products) {
      this.fetchProducts()
    }
  }

  async fetchProducts() {
    const params: QueryBuilderQuery[] = [
      {
        field: 'entityType',
        operator: ComparisonQueryOperatorEnum.EQUALS,
        value: this.payload.entityType
      },
      {
        field: 'schema',
        operator: ComparisonQueryOperatorEnum.EQUALS,
        value: this.payload.schema
      }
    ]
    const response = await this.fsxaApi.fetchByFilter(params, this.locale)
    this.setStoredItem(this.storedKey, response)
  }

  get storedKey() {
    return `category-products${
      this.payload.filterParams.category
        ? '_' + this.payload.filterParams.category
        : ''
    }`
  }

  get products() {
    return this.getStoredItem<Dataset[]>(this.storedKey)
  }

  render() {
    const ListSection = (Sections as any).ListSection
    console.log(this.products)
    return (
      <Container>
        <ListSection
          items={this.products || []}
          renderItem={(item) => (
            <ProductListItem
              title={item.data.tt_name}
              description={item.data.tt_teaser_text}
              price={item.data.tt_price}
              image={
                item.data.tt_teaser_image
                  ? {
                      src: item.data.tt_teaser_image.resolutions.ORIGINAL.url
                    }
                  : undefined
              }
              handleClick={() => this.triggerRouteChange({ route: item.route })}
            />
          )}
        >
          {!this.products ? <Loader /> : undefined}
        </ListSection>
      </Container>
    )
  }
}
export default CategoryProducts
