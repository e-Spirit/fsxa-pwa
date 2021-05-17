[<< Back to Index](./index.md)

# FSXABaseRichTextElement

1. [Introduction](#introduction)
2. [Usage](#usage)
3. [Properties](#properties)
4. [Methods](#methods)

## Introduction

The FSXABaseRichTextElement is there to have a basic component to be able to implement further rich text elements.
Usually a rich text contains multiple elements like links, lists, blocks etc.
<br />
It provides different attributes and methods, which should simplify the development significantly. These are described in this chapter.
This component inherits all the attributes and methods of the [FSXABaseComponent](FSXABaseComponent.md).

## Usage

To use this base component a new class has to be created which extends the `FSXABaseRichTextElement`.

```tsx
@Component
class Component extends FSXABaseRichTextElement {}
```

<hr>
If you want to have type support for your data you can provide an interface and pass it as an generic like here the `Data` interface.

```tsx
@Component
class Component extends FSXABaseRichTextElement<Data> {}
```

## Properties

### `data` - Object

Returns all available data attributes, for example the `data-fs-style` to determinate the styling.

### `content` - Array

Returns the available content. This property can contain multiple nested rich text elements.

## Methods

### `renderContent`

```typescript
renderContent(): string | RichTextElement | MissingRichTextComponent
```

Should be used to render the existing content. <br />
If the content is a string, the string will be rendered. <br />
If there a more nested elements which are implemented these will be rendered.<br />
If there a more nested elements which are **not** implemented and the `devMode` is enabled, the `MissingRichTextComponent` will appear. This component provides additional information which element is missing and what information it provides.

For more information see [DevMode](./DevMode.md).
