import { ComparisonQueryOperatorEnum } from 'fsxa-api'
import { FSXABaseSection } from 'fsxa-pattern-library'
import { Sections } from 'fsxa-ui'
import { Component } from 'vue-property-decorator'

@Component({
  name: 'DealerMap'
})
class DealerMap extends FSXABaseSection {
  serverPrefetch() {
    return this.fetchItems()
  }

  mounted() {
    if (!this.locations) this.fetchItems()
  }

  async fetchItems() {
    const items = await this.fsxaApi.fetchByFilter(
      [
        {
          field: 'entityType',
          operator: ComparisonQueryOperatorEnum.EQUALS,
          value: 'locations'
        },
        {
          field: 'schema',
          operator: ComparisonQueryOperatorEnum.EQUALS,
          value: 'locations'
        }
      ],
      this.locale
    )
    this.setStoredItem('dealer_map_locations', items)
  }

  get locations():
    | {
        data: {
          tt_company: string
          tt_city: string
          tt_description: string
          tt_lat: string
          tt_long: string
          tt_street: string
        }
      }[]
    | null {
    return this.getStoredItem('dealer_map_locations') || null
  }

  render() {
    return (
      <div class="w-full screen-height-without-header bg-white">
        <Sections.GoogleMapsSection
          language={this.locale.split('_')[0]}
          apikey={process.env.GOOGLE_MAPS_APIKEY as string}
          startLocation={
            this.locations && this.locations.length > 0
              ? {
                  lat: parseFloat(this.locations[0].data.tt_lat),
                  lng: parseFloat(this.locations[0].data.tt_long)
                }
              : undefined
          }
          locations={
            this.locations
              ? this.locations.map((location) => ({
                  city: location.data.tt_city,
                  name: location.data.tt_company,
                  position: {
                    lat: parseFloat(location.data.tt_lat),
                    lng: parseFloat(location.data.tt_long)
                  },
                  street: location.data.tt_street,
                  description: location.data.tt_description
                }))
              : []
          }
        />
      </div>
    )
  }
}
export default DealerMap
