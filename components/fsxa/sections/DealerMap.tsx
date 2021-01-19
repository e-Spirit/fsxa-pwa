import { FSXABaseSection } from 'fsxa-pattern-library'
import { Component } from 'vue-property-decorator'

@Component({
  name: 'DealerMap'
})
class DealerMap extends FSXABaseSection {
  async fetchItems() {
    /**const items = await this.fsxaApi.fetchByFilter(
      [
        {
          field: 'schema',
          value: ''
        }
      ],
      this.locale
    )**/
  }

  render() {
    return <div>Blakeks</div>
  }
}
export default DealerMap
