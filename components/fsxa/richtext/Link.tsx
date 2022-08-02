import type { Link as RichTextLink, Reference, CaaSApi_Option } from 'fsxa-api'
import { FSXABaseRichTextElement } from 'fsxa-pattern-library'
import { Component } from 'vue-property-decorator'

export interface InternalLink extends RichTextLink {
  template: 'internal_link'
  data: {
    lt_link: Reference
    lt_text: string
  }
}

export interface ExternalLink extends RichTextLink {
  template: 'external_link'
  data: {
    lt_url: string
    lt_text: string
    lt_link_behavior: CaaSApi_Option
  }
}

@Component({
  name: 'RichTextLink'
})
class Link extends FSXABaseRichTextElement<InternalLink | ExternalLink> {
  render() {
    switch (this.data.template) {
      case 'internal_link':
        return (
          <a
            class="underline"
            href={
              this.getUrlByPageId(this.data.data.lt_link.referenceId) || '#'
            }
            onClick={(event) => {
              event.preventDefault()
              this.triggerRouteChange({
                pageId: (this.data as InternalLink).data.lt_link.referenceId
              })
            }}
          >
            {this.renderContent()}
          </a>
        )
      case 'external_link':
        return (
          <a
            class="underline"
            href={this.data.data.lt_url || '#'}
            target={this.data.data.lt_link_behavior.identifier}
          >
            {this.renderContent()}
          </a>
        )
    }
  }
}
export default Link
