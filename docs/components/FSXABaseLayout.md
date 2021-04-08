[Readme](../../README.md) » [BaseComponents](../README.md) » FSXABaseLayout

# FSXABaseLayout

1. [Introduction](#introduction)
2. [Usage](#usage)
3. [Properties](#properties)
4. [Methods](#methods)

## Introduction

The FSXABaseLayout is there to have a basic component to be able to implement further layout components.
Thereby different attributes and a method are given, which should simplify the development significantly. These are described in this chapter.
This component inherits all the attributes and methods of the [FSXABaseComponent](FSXABaseComponent.md).

## Usage

To use this base component a new class has to be created which extends the `FSXABaseLayout`.

```tsx
@Component
class LayoutComponent extends FSXABaseLayout {}
```

If you want to have type support for you data attribute you can provide an interface and pass it as an generic like here the `Data` interface.

```tsx
@Component
class LayoutComponent extends FSXABaseLayout<Data> {}
```

If you want additionally type support for your meta, you can pass a second interface.

```tsx
@Component
class LayoutComponent extends FSXABaseLayout<Data, Meta> {}
```

Note: If you only want type support for your meta and not the data you have to pass and empty interface `{}` as the data generic.

## Properties

### `data` - Object

Returns all available data information of the page.

### `meta` - Object

Returns all available meta information of the page.

### `pageId` - string

Returns the pageId of the displayed page.

## Methods

### `renderContentByName`

```typescript
renderContentByName(name: string)
```

The prerendered sections are injected as slots into the component. You can access the slot directly through `this.$scopedSlots.contentName` or by calling this method and passing in the name of the content section.
