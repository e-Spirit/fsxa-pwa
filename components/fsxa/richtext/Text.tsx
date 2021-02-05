import { FSXABaseRichTextElement } from 'fsxa-pattern-library'
import { Component } from 'vue-property-decorator'

@Component({
  name: 'RichTextText'
})
class Text extends FSXABaseRichTextElement {
  render() {
    return <span>{this.renderContent()}</span>
  }
}
export default Text
