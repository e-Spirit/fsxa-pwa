import Component from 'vue-class-component'
import { FSXABaseLayout } from 'fsxa-pattern-library'

export interface Slide {
  previewId: string
  identifier: string
  data: any
}
export interface Data {
  pt_show_chat: boolean
  pt_slider: Slide[]
}
@Component({
  name: 'HomepageLayout'
})
class HomepageLayout extends FSXABaseLayout<Data> {
  render() {
    return <div>{this.renderContentByName('content')}</div>
  }
}
export default HomepageLayout
