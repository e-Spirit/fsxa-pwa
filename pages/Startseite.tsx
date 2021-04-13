import Component from 'vue-class-component'
import { Component as TsxComponent } from 'vue-tsx-support'

@Component
class Test extends TsxComponent<{}> {
  render() {
    return <div>Hallo Welt</div>
  }
}
export default Test
