import { FSXABaseRichTextElement } from 'fsxa-pattern-library'
import { Component } from 'vue-property-decorator'

@Component({
  name: 'RichTextList'
})
class List extends FSXABaseRichTextElement {
  render() {
    return <ul class="list-disc ml-4">{this.renderContent()}</ul>
  }
}
export default List
