import { FSXABaseAppLayout, FSXAGetters } from 'fsxa-pattern-library'
import {
  Loader,
  Navigation,
  NavigationItem,
  MobileNavigation,
  FirstLevelNavigationItem,
  Footer,
  Layout,
  LayoutItem
} from 'fsxa-ui'
import { NavigationData } from 'fsxa-api'
import Component from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import PageHeader from '../PageHeader'
import { getFallbackTranslation } from '~/utils/i18n'
@Component({
  name: 'AppLayout'
})
class AppLayout extends FSXABaseAppLayout {
  showMobileNavigation = false

  @Watch('showMobileNavigation')
  onShowMobileNavigationChange(nextVal: boolean) {
    if (nextVal) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }

  get navigationData(): NavigationData | null {
    return this.$store.getters[FSXAGetters.navigationData]
  }

  get navigationItems(): FirstLevelNavigationItem[] {
    return this.navigationData
      ? this.navigationData.structure.map((item) => ({
          key: item.id,
          label: this.navigationData?.idMap[item.id].label,
          path: this.getUrlByPageId(item.id) || '#',
          children: item.children.map((child) => ({
            key: child.id,
            label: this.navigationData?.idMap[child.id].label,
            path: this.getUrlByPageId(child.id) || '#'
          }))
        }))
      : []
  }

  get logoUrl() {
    return this.globalSettings?.data.ps_logo.resolutions.ORIGINAL.url
  }

  getLangNavItem(isMobile: boolean): FirstLevelNavigationItem {
    return {
      key: 'language',
      path: '#',
      label: isMobile ? (
        this.globalSettings?.data.label_language ||
        getFallbackTranslation([this.locale, 'language', 'label'])
      ) : (
        <svg
          class="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"
            clip-rule="evenodd"
          ></path>
        </svg>
      ),
      children: [
        {
          key: 'language.de',
          label:
            this.globalSettings?.data.label_language_german ||
            getFallbackTranslation([this.locale, 'language', 'de_DE']),
          path: '#'
        },
        {
          key: 'language.en',
          label:
            this.globalSettings?.data.label_language_english ||
            getFallbackTranslation([this.locale, 'language', 'en_GB']),
          path: '#'
        }
      ],
      childPlacement: 'right'
    }
  }

  handleNavigationClick(item: NavigationItem) {
    if (['language.de', 'language.en'].includes(item.key as string)) {
      this.triggerRouteChange({
        pageId: this.currentPage?.id,
        locale: item.key === 'language.de' ? 'de_DE' : 'en_GB'
      })
    } else {
      this.triggerRouteChange({
        pageId: item.key as string
      })
    }
  }

  render() {
    // we will append the language menu as well
    const items = [...this.navigationItems]
    // Each NavigationItem contains an array of parentIds. This helps us construct the activeItemKeys for the Navigation components
    const activeItemKeys = this.currentPage
      ? [...this.currentPage.parentIds, this.currentPage.id]
      : []
    return ['initializing', 'not_initialized'].includes(this.appState) ? (
      <Loader />
    ) : (
      <div class="w-full h-full fixed-page-content pb-64">
        <PageHeader
          fullscreen={this.showMobileNavigation}
          onOverlayClick={() => {
            this.showMobileNavigation = false
          }}
          scopedSlots={{
            overlay: () =>
              this.showMobileNavigation ? (
                <MobileNavigation
                  items={[...items, this.getLangNavItem(true)]}
                  activeItemKeys={activeItemKeys}
                  onItemClicked={this.handleNavigationClick}
                />
              ) : null
          }}
        >
          <div class="bg-white fixed-page-header px-4 md:px-16 lg:px-20 xl:px-24 flex items-center justify-between scrollbar-fix-left text-gray-900">
            <a
              href={this.navigationData?.pages.index}
              class="flex-shrink-0"
              onClick={(event) => {
                event.preventDefault()
                this.triggerRouteChange({
                  pageId: this.navigationData?.seoRouteMap[
                    this.navigationData.pages.index
                  ]
                })
              }}
            >
              <img src={this.logoUrl} />
            </a>
            <div class="hidden md:block h-full">
              <Navigation
                items={[...items, this.getLangNavItem(false)]}
                activeItemKeys={activeItemKeys}
                onItemClicked={this.handleNavigationClick}
              />
            </div>
            <a
              href="#"
              class="flex -mr-5 md:hidden px-5 py-4 items-center justify-center"
              onClick={(event) => {
                event.preventDefault()
                this.showMobileNavigation = !this.showMobileNavigation
              }}
            >
              <svg
                class="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </a>
          </div>
        </PageHeader>
        <div class="w-full h-64 bg-gray-100 flex items-center text-xs fixed bottom-0 left-0 px-4 md:px-16 lg:px-20 xl:px-24 z-0">
          <div class="w-1/3 flex items-center justify-start">
            <a
              href={this.navigationData?.pages.index}
              class="flex-shrink-0"
              onClick={(event) => {
                event.preventDefault()
                this.triggerRouteChange({
                  pageId: this.navigationData?.seoRouteMap[
                    this.navigationData.pages.index
                  ]
                })
              }}
            >
              <img src={this.logoUrl} />
            </a>
          </div>
          <div class="w-1/3 flex items-center justify-center">
            © {this.globalSettings?.data.ps_footer.gc_copyright}
          </div>
          <div class="w-1/3 flex items-center justify-end gap-2">
            {this.globalSettings?.data.ps_footer.gc_linklist.map(
              (link: any) => (
                <a
                  href={
                    this.getUrlByPageId(link.data.lt_link.referenceId) || '#'
                  }
                  class={`text-xs hover:underline ${
                    this.currentPage?.id === link.data.lt_link.referenceId
                      ? 'text-gray-600'
                      : ''
                  }`}
                  onClick={(event: MouseEvent) => {
                    event.preventDefault()
                    this.triggerRouteChange({
                      pageId: link.data.lt_link.referenceId
                    })
                  }}
                >
                  {link.data.lt_text}
                </a>
              )
            )}
          </div>
        </div>
        <div class="bg-white relative">{this.$slots.default}</div>
      </div>
    )
  }
}

export default AppLayout
