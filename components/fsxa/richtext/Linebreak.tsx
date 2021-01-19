import { FSXABaseRichTextElement } from 'fsxa-pattern-library'
import { Component } from 'vue-property-decorator'

@Component({
  name: 'RichTextLinebreak'
})
class Linebreak extends FSXABaseRichTextElement {
  render() {
    return <br />
  }
}
export default Linebreak
