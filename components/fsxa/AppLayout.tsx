import {
  FSXABaseAppLayout,
  FSXAGetters,
  FSXAAppState
} from 'fsxa-pattern-library'
import {
  Page,
  Dropdown,
  Navigation,
  Option,
  NavigationItem,
  Footer,
  FooterLink,
  Loader
} from 'fsxa-ui'
import { NavigationData, StructureItem, Page as APIPage } from 'fsxa-api'
import Component from 'vue-class-component'

interface CurrentPage extends NavigationItem {
  content: APIPage
}

const getDropdownOptions = (
  locales: Record<string, string>[] = []
): Option[] => {
  return locales.map((locale) => {
    if (typeof locale === 'string')
      return {
        key: locale,
        label: locale
      }
    else {
      return {
        key: locale.value,
        label: locale.label
      }
    }
  })
}
const mapStructureItemToNavigationItem = (
  structure: StructureItem,
  navigationData: NavigationData
): NavigationItem => {
  const item = navigationData.idMap[structure.id]
  return {
    children: structure.children.map((structureItem) =>
      mapStructureItemToNavigationItem(structureItem, navigationData)
    ),
    id: structure.id,
    label: item.label,
    path: item.seoRoute
  }
}
@Component({
  name: 'AppLayout'
})
class AppLayout extends FSXABaseAppLayout {
  get navigationData(): NavigationData | null {
    return this.$store.getters[FSXAGetters.navigationData]
  }

  renderNavigation() {
    const navItems = []
    const navigationData = this.navigationData
    if (navigationData !== null) {
      navItems.push(
        ...navigationData.structure.map((structure) =>
          mapStructureItemToNavigationItem(structure, navigationData)
        )
      )
    }
    return (
      <div class="flex items-center justify-center space-x-3">
        <Navigation
          items={navItems}
          isActiveItem={() => false}
          handleNavClick={({ id }) =>
            this.triggerRouteChange({
              pageId: id
            })
          }
        ></Navigation>
        <Dropdown
          value={this.locale}
          options={getDropdownOptions([
            {
              value: 'de_DE',
              label: 'DE'
            },
            {
              value: 'en_GB',
              label: 'EN'
            }
          ])}
          handleChange={(newLocale) =>
            this.triggerRouteChange({
              locale: newLocale.key
            })
          }
        >
          Bla
          <i class="fas fa-globe-europe" />
        </Dropdown>
      </div>
    )
  }

  renderFooter() {
    const handleLinkClick = (link: FooterLink) => {
      const nextPage = this.navigationData?.idMap[link.referenceId]
      if (nextPage)
        this.triggerRouteChange({
          pageId: nextPage.id,
          route: nextPage?.seoRoute
        })
    }
    if (this.globalSettings) {
      const links: FooterLink[] = this.globalSettings.data.gc_linklist
        .filter(
          (link: any) =>
            link.data.lt_link.referenceType && link.data.lt_link.referenceId
        )
        .map((link: any) => {
          return {
            referenceId: link.data.lt_link.referenceId,
            label: link.data.lt_text,
            isActive:
              link.data.lt_link.referenceType === 'PageRef' &&
              link.data.lt_link.referenceId === this.currentPage?.id,
            referenceType:
              link.data.lt_link.referenceType === 'PageRef'
                ? 'page'
                : 'fragment'
          }
        })
      return (
        <Footer
          copyright={this.globalSettings.data.gc_copyright as string}
          links={links}
          handleClick={handleLinkClick}
          data-preview-id={this.globalSettings.id}
        >
          {this.globalSettings.data.gs_logo ? (
            <img
              src={this.globalSettings.data.gs_logo.resolutions.ORIGINAL.url}
            />
          ) : null}
        </Footer>
      )
    }
    return null
  }

  render() {
    return ['initializing', 'not_initialized'].includes(this.appState) ? (
      <Loader />
    ) : (
      <Page
        renderNavigation={this.renderNavigation}
        renderFooter={this.renderFooter}
      >
        {this.$slots.default}
      </Page>
    )
  }
}

export default AppLayout
