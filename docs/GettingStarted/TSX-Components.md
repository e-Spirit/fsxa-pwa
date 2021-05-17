[<< Back to Index](./index.md)

# Writing JSX/TSX Components

In this section we will be exploring how to go about implementing a missing Teaser section.

When you go to the home page in the development mode, you will see that one component is missing.

![MissingSection](./../imgs/WritingComponents/MissingSection.png)

This infobox tells us that the app expects a component of type `Section`. We can also see that the key of this missing section is `teaser`.

In the `fsxa.config.ts` file we can see that our section components are located in `~/components/fsxa/sections`.
That's where you want to create a new file for the component.

Make sure you name the file just like the key that is required. In our case it is `teaser` so we name our new file `Teaser.tsx`.

Next we need to import two classes that are required to define our new component:

```typescript jsx
import Component from 'vue-class-component'
import { FSXABaseSection } from 'fsxa-pattern-library'
```

With this we can start writing our class.

```typescript jsx
@Component
class TeaserSection extends FSXABaseSection<{}> {}
```

This class expects us to implement `render` function. This function describes which HTML will be displayed in our component.
To keep things simple for now we will write just a simple `render` function to see if our component is recognized.

```typescript jsx
render() {
  return <div>Hello Component</div>
}
```

To wrap things up we need to export our class.

```typescript jsx
export default TeaserSection
```

In the end our `Teaser.tsx` should look something like this:

```typescript jsx
import Component from 'vue-class-component'
import { FSXABaseSection } from 'fsxa-pattern-library'

@Component
class TeaserSection extends FSXABaseSection<{}> {
  render() {
    return <div>Hello Component</div>
  }
}

export default TeaserSection
```

When we go back to the browser, instead of the infobox we should see our component.

![Hello Component](./../imgs/WritingComponents/HelloComponent.png)

Our component is recognized correctly. But we still do not display the data from the [CaaS](https://docs.e-spirit.com/module/caas/CaaS_FSM_Documentation_EN.html) in our component.
For that we hover over our component and click on the appearing question mark on the right side.

![Available Properties](./../imgs/WritingComponents/AvailableProperties.png)

This shows us the data available to display.
For the first example we want to display the `st_jumbo_headline`.

For this we create an interface in our component and define the name of the attribute and its type.

```typescript
interface Payload {
  st_jumbo_headline: string
}
```

We update the use of the `FSXABaseSection` with our new payload: `class TeaserSection extends FSXABaseSection<Payload>`
and use the `st_jumbo_headline` in our `render` function.

```typescript jsx
render() {
    return <div>Headline: {this.payload.st_jumbo_headline}</div>
  }
```

Every attribute in our payload is accessible via `this.payload`

The result should look like this:
![Displayed Headline](./../imgs/WritingComponents/DisplayedHeadline.png)

Next we want to continue to implement our payload interface.
For some objects we use interfaces from the [FSXA-Api](https://github.com/e-Spirit/fsxa-api), so we also have to import them.

```typescript
import { Image, RichTextElement } from 'fsxa-api'
```

The final interface looks like this:

```typescript
interface Payload {
  st_headline: RichTextElement[]
  st_jumbo_headline: string
  st_kicker: string
  st_picture?: Image
  st_picture_alt: string | null
  st_text: RichTextElement[]
  st_button?: {
    data: {
      lt_button_text: string
      lt_internal: {
        referenceId: string
        referenceType: string
      }
    }
  }
}
```

Note that attributes followed by a question mark are optional.

In order to display all this information, we can use a component from the [fsxa-ui](https://github.com/e-Spirit/fsxa-ui/).
First we need to import it. It is located under Sections in the fsxa-ui.

```typescript
import { Sections } from 'fsxa-ui'
```

Since we are using richtext we also need to import FSXARichText from the [fsxa-pattern-library](https://github.com/e-Spirit/fsxa-pattern-library)

```typescript
import { FSXABaseSection, FSXARichText } from 'fsxa-pattern-library'
```

And then we can use them in our `render` function:

```typescript jsx
render() {
    return (
      <Sections.TeaserSection
        headline={(<FSXARichText content={this.payload.st_headline} />) as any}
        kicker={this.payload.st_kicker}
        text={(<FSXARichText content={this.payload.st_text} />) as any}
        buttonText={this.payload.st_button?.data.lt_button_text}
        onButtonClick={() =>
          this.triggerRouteChange({
            pageId: this.payload.st_button?.data.lt_internal.referenceId
          })
        }
        media={
          this.payload.st_picture
            ? {
                type: 'image',
                src: this.payload.st_picture.resolutions.ORIGINAL.url,
                resolutions: this.payload.st_picture.resolutions,
                previewId: this.payload.st_picture.previewId
              }
            : undefined
        }
      />
    )
  }
```

Finally, we can name our component. We do this in the `@Component` annotation.

```typescript jsx
@Component({
  name: 'TeaserSection'
})
```

The final `Teaser.tsx` file looks like this:

```typescript jsx
import Component from 'vue-class-component'
import { FSXABaseSection, FSXARichText } from 'fsxa-pattern-library'
import { Sections } from 'fsxa-ui'
import { Image, RichTextElement } from 'fsxa-api'

interface Payload {
  st_headline: RichTextElement[]
  st_jumbo_headline: string
  st_kicker: string
  st_picture?: Image
  st_picture_alt: string | null
  st_text: RichTextElement[]
  st_button?: {
    data: {
      lt_button_text: string
      lt_internal: {
        referenceId: string
        referenceType: string
      }
    }
  }
}

@Component({
  name: 'TeaserSection'
})
class TeaserSection extends FSXABaseSection<Payload> {
  render() {
    return (
      <Sections.TeaserSection
        headline={(<FSXARichText content={this.payload.st_headline} />) as any}
        kicker={this.payload.st_kicker}
        text={(<FSXARichText content={this.payload.st_text} />) as any}
        buttonText={this.payload.st_button?.data.lt_button_text}
        onButtonClick={() =>
          this.triggerRouteChange({
            pageId: this.payload.st_button?.data.lt_internal.referenceId
          })
        }
        media={
          this.payload.st_picture
            ? {
                type: 'image',
                src: this.payload.st_picture.resolutions.ORIGINAL.url,
                resolutions: this.payload.st_picture.resolutions,
                previewId: this.payload.st_picture.previewId
              }
            : undefined
        }
      />
    )
  }
}

export default TeaserSection
```

Here you can see the result.
![Finished Component](./../imgs/WritingComponents/FinishedComponent.png)
