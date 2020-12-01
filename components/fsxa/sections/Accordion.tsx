import Component from 'vue-class-component'
import { Sections } from 'fsxa-ui'
import { FSXABaseSection } from 'fsxa-pattern-library'

export interface Payload {
  st_acc: Array<{
    previewId: string
    identifier: string
    data: {
      st_header_acc: string
      st_text_acc: string
    }
  }>
  st_color: {
    fsType: string
    label: string
    identifier: string
  }
  st_header: string
}

@Component({
  name: 'AccordionSection'
})
class AccordionSection extends FSXABaseSection<Payload> {
  render() {
    console.log(this.payload, (this.payload.st_acc || []).map((item) => ({
        previewId: item.previewId,
        title: item.data.st_header_acc,
        text: item.data.st_text_acc
      })))
    return (
        <div>
      <client-only>
        <Sections.AccordionSection
          title={this.payload.st_header}
          items={(this.payload.st_acc || []).map((item) => ({
            previewId: item.previewId,
            title: item.data.st_header_acc,
            text: item.data.st_text_acc
          }))}
          dark={
            this.payload.st_color.identifier == 'acc-bg-gray' ? true : false
          }
        />
      </client-only>
      </div>
    )
  }
}
export default AccordionSection
