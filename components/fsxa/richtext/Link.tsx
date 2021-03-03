import { FSXABaseRichTextElement } from 'fsxa-pattern-library'
import { Component } from 'vue-property-decorator'

export type Data = {
  type: 'internal_link'
  data: {
    lt_link: {
      value: {
        identifier: string
      }
    }
  }
}
@Component({
  name: 'RichTextLink'
})
class Link extends FSXABaseRichTextElement<Data> {
  render() {
    return (
      <a
        class="underline"
        href={
          this.data.type === 'internal_link'
            ? this.getUrlByPageId(this.data.data.lt_link.value.identifier) ||
              '#'
            : '#'
        }
        onClick={(event) => {
          event.preventDefault()
          this.triggerRouteChange({
            pageId: this.data.data.lt_link.value.identifier
          })
        }}
      >
        {this.renderContent()}
      </a>
    )
  }
}
export default Link
