import { FSXABaseRichTextElement } from 'fsxa-pattern-library'
import { Component } from 'vue-property-decorator'

@Component({
  name: 'RichTextListItem'
})
class ListItem extends FSXABaseRichTextElement {
  render() {
    return <li>{this.renderContent()}</li>
  }
}
export default ListItem
