import {
  FSXABaseAppLayout,
  FSXAGetters,
  AppLocale,
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

const getDropdownOptions = (locales: AppLocale[] = []): Option[] => {
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
  get currentPage(): CurrentPage | null {
    return this.$store.getters[FSXAGetters.currentPage]
  }

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
      <Navigation
        items={navItems}
        isActiveItem={(item) =>
          Boolean(
            this.currentPage &&
              this.currentPage.content &&
              item.id === this.currentPage.content.refId
          )
        }
        handleNavClick={({ id }) =>
          this.handleRouteChangeRequest({
            pageId: id
          })
        }
      >
        {this.locales ? (
          <Dropdown
            value={this.locale}
            options={getDropdownOptions(this.locales)}
            handleChange={(newLocale) => this.handleLocaleChange(newLocale.key)}
          >
            <i class="fas fa-globe-europe" />
          </Dropdown>
        ) : null}
      </Navigation>
    )
  }
  renderFooter() {
    const handleLinkClick = (link: FooterLink) => {
      const nextPage = this.navigationData?.idMap[link.referenceId]
      if (nextPage)
        this.handleRouteChangeRequest({
          pageId: nextPage.id,
          route: nextPage?.seoRoute
        })
    }
    if (this.settings) {
      const links: FooterLink[] = this.settings.data.gc_linklist
        .filter(
          (link) =>
            link.data.lt_link.referenceType && link.data.lt_link.referenceId
        )
        .map((link) => {
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
          copyright={this.settings.data.gc_copyright as string}
          links={links}
          handleClick={handleLinkClick}
          data-preview-id={this.settings.id}
        >
          {this.settings.data.gs_logo ? (
            <img src={this.settings.data.gs_logo.resolutions.ORIGINAL.url} />
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
        {this.appState === 'fetching' ? <Loader /> : this.content}
      </Page>
    )
  }
}

export default AppLayout
