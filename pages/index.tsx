import "vue-tsx-support/enable-check";
import { Vue, Component } from "vue-property-decorator";
import { FSXAComposedNavigation } from "fsxa-pattern-library";
import "fsxa-ui/dist/fsxa-ui.css";
import * as tsx from "vue-tsx-support";

@Component
export default class IndexPage extends tsx.Component<{}> {
  render() {
    return (
      <div class="container p-20">
        <FSXAComposedNavigation handleNavClick={() => console.log("CLICK")} />
      </div>
    )
  }
}
