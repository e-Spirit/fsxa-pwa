import Component from "vue-class-component";
import { FSXABaseLayout } from "fsxa-pattern-library";
import { Layouts } from "fsxa-ui";
import HeaderSection, { Payload as HeaderSectionPayload } from "../sections/Header";
import { Image } from "fsxa-api";

@Component({
  name: "FSXAStandardLayout",
})
class StandardLayout extends FSXABaseLayout<HeaderSectionPayload> {
  render() {
    console.log("MEINS!")
    if (this.content.length === 0) return null;
    return (
      <Layouts.SingleColumnLayout data-preview-id={this.content[0].previewId}>
        <HeaderSection
          payload={{
            pt_picture: this.data.pt_picture,
            pt_text: this.data.pt_text,
            pageId: this.pageId,
          }}
          content={[]}
        />
        <h1>MEINS!</h1>
        {this.content.length > 0 && this.renderContentElements(0)}
      </Layouts.SingleColumnLayout>
    );
  }
}
export default StandardLayout;
