import Test from '~/components/Test';
import { Vue, Component, Prop } from "vue-property-decorator";
import { Button } from "fsxa-ui";
import "fsxa-ui/dist/fsxa-ui.css";

@Component
export default class IndexPage extends Vue {
  render() {
    return (
      <div class="container">
          <div>
            <h1 class="title">enterprise-pwa</h1>
            <h2 class="subtitle">Demo PWA built with FSXA</h2>
            <Test title="Das ist mein Title" />
            <Button size="lg" variant="default">Blakeks</Button>
            <div class="links">
              <a
                href="https://nuxtjs.org/"
                target="_blank"
                class="button--green"
              >
                Documentation
              </a>
              <a
                href="https://github.com/nuxt/nuxt.js"
                target="_blank"
                class="button--grey"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
    )
  }
}
