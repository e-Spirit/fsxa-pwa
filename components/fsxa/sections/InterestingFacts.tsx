import Component from "vue-class-component";
import { Sections } from "fsxa-ui";
import { FSXABaseSection } from "fsxa-pattern-library";
import { Image } from "fsxa-api";

export interface Payload {
  st_background_image?: Image;
  st_counters?: Array<{
    previewId: string;
    identifier: string;
    data: {
      st_number: number;
      st_text: string;
    };
  }>;
  st_headline: string;
  st_tagline: string;
  /** This can contain html */
  st_text: string;
}
@Component({
  name: "InterestingFactsSection",
})
class InterestingFactsSection extends FSXABaseSection<Payload> {
  render() {
    return (
      <Sections.InterestingFactsSection
        headline={this.payload.st_headline}
        tagline={this.payload.st_tagline}
        text={this.createLinksInRichText(this.payload.st_text)}
        counters={(this.payload.st_counters || []).map(counter => ({
          previewId: counter.previewId,
          value: counter.data.st_number,
          label: counter.data.st_text,
        }))}
        backgroundImage={
          this.payload.st_background_image?.resolutions.ORIGINAL
            ? {
                src: this.payload.st_background_image.resolutions.ORIGINAL.url,
                dimensions: {
                  width: this.payload.st_background_image.resolutions.ORIGINAL
                    .width,
                  height: this.payload.st_background_image.resolutions.ORIGINAL
                    .height,
                },
              }
            : undefined
        }
      />
    );
  }
}
export default InterestingFactsSection;
