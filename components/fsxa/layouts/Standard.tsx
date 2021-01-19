import Component from 'vue-class-component'
import { FSXABaseLayout, FSXAGetters } from 'fsxa-pattern-library'
import { NavigationData, Image, NavigationItem } from 'fsxa-api'
import { Sections } from 'fsxa-ui'
import { Breadcrumb } from 'fsxa-ui/src/types/sections'

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

  get breadcrumbs() {
    const indexPage: NavigationItem = this.navigationData.idMap[
      this.navigationData.seoRouteMap[this.navigationData.pages.index]
    ]
    const breadcrumbs: Breadcrumb[] = [
      {
        label: indexPage.label,
        path: indexPage.seoRoute,
        referenceId: indexPage.id,
        referenceType: 'PageRef'
      }
    ]
    if (this.currentPage) {
      this.currentPage.parentIds.forEach((parentId) => {
        const page = this.navigationData.idMap[parentId]
        breadcrumbs.push({
          label: page.label || '',
          path: page.seoRoute,
          referenceId: parentId,
          referenceType: 'PageRef'
        })
      })
    }
    return breadcrumbs
  }

  renderHeader() {
    return (
      <Sections.HeaderSection
        title={this.data.pt_text}
        breadcrumbs={this.breadcrumbs}
        backgroundImage={
          this.data.pt_picture?.resolutions.ORIGINAL
            ? {
                type: 'image',
                src: this.data.pt_picture.resolutions.ORIGINAL.url,
                resolutions: this.data.pt_picture.resolutions
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
