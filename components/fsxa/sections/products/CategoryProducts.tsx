import {
  ComparisonQueryOperatorEnum,
  Dataset,
  QueryBuilderQuery
} from 'fsxa-api'
import { FSXABaseSection } from 'fsxa-pattern-library'
import { Component } from 'vue-property-decorator'
import { Container, Sections } from 'fsxa-ui'
import Loader from '../../Loader'
import ProductListItem from './ProductListItem'

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
    return (
      <Container>
        <ListSection
          items={this.products || []}
          renderItem={(item: Dataset) => {
            return this.renderContentElement({
              ...item,
              template:
                item.template === 'products.product_list_item'
                  ? item.template
                  : 'products.product_list_item'
            })
          }}
        >
          {!this.products ? <Loader /> : undefined}
        </ListSection>
      </Container>
    )
  }
}
export default CategoryProducts
