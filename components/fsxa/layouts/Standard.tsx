import Component from 'vue-class-component'
import { FSXABaseLayout, FSXAGetters } from 'fsxa-pattern-library'
import { NavigationData, Image } from 'fsxa-api'
import { Sections } from 'fsxa-ui'

interface HeaderSectionPayload {
  pt_text: string
  pt_picture?: Image
  pageId: string
}

@Component({
  name: 'FSXAStandardLayout'
})
class StandardLayout extends FSXABaseLayout<HeaderSectionPayload> {
  get navigationData(): NavigationData {
    return this.$store.getters[FSXAGetters.navigationData]
  }

  renderHeader() {
    const currentPage = this.navigationData.idMap[this.data.pageId]
    return (
      <Sections.HeaderSection
        title={this.data.pt_text}
        breadcrumbs={
          currentPage
            ? currentPage.parentIds.map((parentId) => {
                const page = this.navigationData.idMap[parentId]
                return {
                  label: page.label || '',
                  path: page.seoRoute,
                  referenceId: parentId,
                  referenceType: 'PageRef'
                }
              })
            : []
        }
        backgroundImage={
          this.data.pt_picture?.resolutions.ORIGINAL
            ? {
                src: this.data.pt_picture.resolutions.ORIGINAL.url,
                dimensions: {
                  width: this.data.pt_picture.resolutions.ORIGINAL.width,
                  height: this.data.pt_picture.resolutions.ORIGINAL.height
                }
              }
            : undefined
        }
        handleItemClick={(item: any) =>
          this.triggerRouteChange({ pageId: item.referenceId })
        }
      />
    )
  }

  render() {
    return (
      <div>
        {this.renderHeader()}
        {this.renderContentByName('content')}
      </div>
    )
  }
}
export default StandardLayout
