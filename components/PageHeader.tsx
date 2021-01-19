import { Component, Prop, Watch } from 'vue-property-decorator'
import { Component as TsxComponent } from 'vue-tsx-support'

export interface PageHeaderProps {
  fullscreen?: boolean
}
export interface PageHeaderEventsWithOn {
  onOverlayClick: { test: string }
}
export interface PageHeaderSlots {
  overlay: {}
}
@Component({
  name: 'PageHeader'
})
class PageHeader extends TsxComponent<
  PageHeaderProps,
  PageHeaderEventsWithOn,
  PageHeaderSlots
> {
  @Prop({ default: false }) fullscreen!: PageHeaderProps['fullscreen']

  @Watch('fullscreen')
  watchFullscreen(nextVal: boolean) {
    if (nextVal) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }

  beforeDestroy() {
    document.body.classList.remove('overflow-hidden')
  }

  render() {
    const overlayContent =
      this.$scopedSlots.overlay && this.$scopedSlots.overlay({})
    return (
      <div
        class={`tw-fixed tw-top-0 tw-left-0 tw-w-full tw-flex tw-flex-col tw-z-10 ${
          this.fullscreen ? 'tw-h-screen' : ''
        }`}
      >
        {this.$slots.default}
        {overlayContent ? (
          <div
            class="tw-w-full tw-bg-gray-900 tw-bg-opacity-80 tw-flex-grow tw-overflow-hidden"
            onClick={(event) => {
              event.preventDefault()
              event.stopImmediatePropagation()
              this.$emit('overlayClick')
            }}
          >
            {overlayContent}
          </div>
        ) : null}
      </div>
    )
  }
}
export default PageHeader
