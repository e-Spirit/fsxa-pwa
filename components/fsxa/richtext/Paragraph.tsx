import { FSXABaseRichTextElement } from 'fsxa-pattern-library'
import { Component } from 'vue-property-decorator'

@Component({
  name: 'RichTextParagraph'
})
class Paragraph extends FSXABaseRichTextElement {
  render() {
    return <p>{this.renderContent()}</p>
  }
}
export default Paragraph
