# OCM-Snap

[OCM-Snap](https://docs.e-spirit.com/tpp/index.html.en) is a Javascript library designed to connect the FirstSpirit ContentCreator UI with dynamically generated HTML elements (like in a PWA). This connection is achieved using preview ids. When you add a known preview id as an attribute to an HTML element the Snap library will automatically decorate it using borders and buttons when your PWA is viewed in the FirstSpirit ContentCreator. This allows editors to edit the contents of dynamically generated HTML Elements. The library also offers the tools to add your own buttons to the UI as you see fit.

## Nested Elements

At layout and section level, the FSXA takes care of enriching the UI so that the elements are editable in the ContentCreator. However, as soon as we have sections within a dataset or a section, there is currently no automatism. So you have to take action here that your child sections can also be edited in the ContentCreator.

This is really simple.

To enable the editing of such a component make sure to provide a custom preview id for both the nested component as well as the parent component using the syntax #PARENT_COMPONENT_NAME and #NESTED_COMPONENT_INDEX as the following examples show.

### Examples

#### TSX

```typescript
import { FSXABaseSection } from 'fsxa-pattern-library'
import { Component } from 'vue-property-decorator'

@Component({ name: 'MyCustomSection' })
class MyCustomSection extends FSXABaseSection {
  render() {
    /**
     * Replace both occasions of childSections with the name of your property
     * data-preview-id must match the properties name
     */
    const sections = this.payload.childSections
    return (
      <div data-previewId="#childSections">
        {sections.childSections.map((section, index) => (
          <div data-preview-id={`#${index}`} key={index}>
            Render your nested section in here ...
          </div>
        ))}
      </div>
    )
  }
}
```

#### SFC

```typescript
<template>
    <div data-preview-id="#childSections">
        <div v-for="(section, index) in payload.childSections" :data-preview-id="'#' + index" :key="index">
            Render your section in here
        </div>
    </div>
</template>

<script lang="typescript">
import { FSXABaseSection } from 'fsxa-pattern-library'
import { Component } from 'vue-property-decorator'

@Component({ name: 'MyCustomSection' })
class MyCustomSection extends FSXABaseSection {}
</script>
```

Further information can be found in the documentation for the [TPP-Snap](https://docs.e-spirit.com/tpp/snap/index.html#nested-components) library, which is automatically integrated in the preview mode and enables these functionalities.

## Inline Editing

For some FirstSpirit input components inline editing is possible. Please refer to the [TPP-Snap documentation](https://docs.e-spirit.com/tpp/snap/index.html#inline-editing) for further information.
