import { FSXABaseRichTextElement } from 'fsxa-pattern-library'
import { Component } from 'vue-property-decorator'

@Component({
  name: 'RichTextParagraph'
})
class Block extends FSXABaseRichTextElement {
  render() {
    if (
      this.content.length === 1 &&
      typeof this.content[0].content === 'string'
    ) {
      return (
        <span
          class={
            this.data['data-fs-style'] === 'format.span_yellow_text'
              ? 'text-highlight'
              : ''
          }
        >
          {this.content[0].content}
        </span>
      )
    }
    return <div>{this.renderContent()}</div>
  }
}
export default Block
