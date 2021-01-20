import { RichTextElement } from 'fsxa-api/dist/types'
import { FSXABaseSection, FSXARichText } from 'fsxa-pattern-library'
import { Container, Sections } from 'fsxa-ui'
import { Component } from 'vue-property-decorator'

interface Payload {
  st_acc: {
    id: string
    previewId: string
    template: string
    data: {
      st_header_acc: string
      st_text_acc: RichTextElement[]
    }
  }[]
  st_header: string
}
@Component({
  name: 'Accordion'
})
class Accordion extends FSXABaseSection<Payload> {
  render() {
    return (
      <Container>
        <Sections.AccordionSection
          title={this.payload.st_header}
          items={this.payload.st_acc.map((item) => ({
            text: <FSXARichText content={item.data.st_text_acc} />,
            title: item.data.st_header_acc
          }))}
        />
      </Container>
    )
  }
}
export default Accordion
