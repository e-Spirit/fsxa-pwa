[Readme](../../README.md) » [BaseComponents](../README.md) » FSXABaseSection

# FSXABaseSection

1. [Introduction](#introduction)
2. [Usage](#usage)
3. [Properties](#properties)
4. [Methods](#methods)

## Introduction

The FSXABaseSection is there to have a basic component to be able to implement further layout sections.
Sections form the content of a page by displaying texts, tables, pictures, etc.
It provides different attributes and methods, which should simplify the development significantly. These are described in this chapter.
This component inherits all the attributes and methods of the [FSXABaseComponent](FSXABaseComponent.md).

## Usage

To use this base component a new class has to be created which extends the `FSXABaseSection`.

```tsx
@Component
class Component extends FSXABaseSection {}
```

<hr>
If you want to have type support you can provide interfaces and pass them as generics.

```tsx
@Component
class Component extends FSXABaseSection<Payload, Meta, EventsWithOn, Slots> {}
```

Note: Please keep in mind that the order is important and you can leave out some interfaces you do not want, but you cannot skip any.
For example: If you only want to provide the `EventsWithOn` interface, you have to pass an empty interface for `Payload` and `Meta`.

```tsx
@Component
class Component extends FSXABaseSection<{}, {}, EventsWithOn> {}
```

## Properties

### `id` - string

Returns the id of the section.

### `meta`

Returns the `meta` data of a section.

### `payload`

Returns the data that is maintained in FirstSpirit.

## Methods

### `renderContentElement`

This method can be used to render additional child sections. In principle, the component could be linked directly to the data, but this would undermine the automatism that enables the editing of sections in the ContentCreator. Therefore, it is best to render child sections as well as datasets using this method.
