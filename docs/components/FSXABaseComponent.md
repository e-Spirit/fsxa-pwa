[Readme](../../README.md) » [BaseComponents](../README.md) » FSXABaseComponent

# FSXABaseComponent

1. [Introduction](#introduction)
2. [Usage](#usage)
3. [Properties](#properties)
4. [Methods](#methods)

## Introduction

The FSXABaseComponent is there to have a basic component to be able to implement further components.
Thereby different attributes and methods are given, which should simplify the development significantly. These are described in this section.

## Usage

To use this base component a new class has to be created which extends the `FSXABaseComponent`.

```tsx
@Component
class Component extends FSXABaseComponent {}
```

<hr>
If you want to have type support for your props you can provide an interface and pass it as an generic like here the `Props` interface.

```tsx
@Component
class Component extends FSXABaseComponent<Props> {}
```

<hr>
If you want additionally type support for your events, you can pass a second interface.

```tsx
@Component
class LayoutComponent extends FSXABaseComponent<Props, EventsWithOn> {}
```

Note: If you only want type support for your events and not the props you have to pass an empty interface `{}` as the data generic.

<hr>
To have additionally type support for your slots, you can pass a third interface.

```tsx
@Component
class LayoutComponent extends FSXABaseComponent<Props, EventsWithOn, Slots> {}
```

Note: If you only want type support for your slots and not the props or events you have to pass empty interfaces `{}` as the `Props` and `EventsWithOn` generic.

## Properties

### `currentPage` - string

This property returns the NavigationItem that is matching the current path. If null is returned, no current route could be matched to the current path.

### `fsxaApi` - Object

This property returns a preconfigured and ready-to-use FSXA-API instance.

### `globalSettings` - string

This property returns the globally configured project properties. If no projectProperties are defined in your CaaS this will return `null`.

### `isEditMode` - boolean

This property returns true if the app is delivering preview data. It will return false if it is released data.

### `locale` - string

This property returns the current locale abbreviation the content is displayed in e.g. `en_GB`.

### `navigationData` - Object

This property returns the current navigation data.

## Methods

### `getStoredItem`

```typescript
getStoredItem<T>(key: string): T
```

This method returns the stored data, which is set with the given key.

### `getUrlByPageId`

```typescript
getUrlByPageId(pageId: string, locale?: string | undefined): string | null
```

This method returns the corresponding route for a given `pageId`. If no page was found `null` will be returned.

### `setStoredItem`

```typescript
setStoredItem<T>(key: string, value: T, ttl?: number): void
```

This method saves your data in the `Vuex`-Store.
<br />
You can use this to store your data from 3rd party services that were fetched in the Server Side Rendering process to access it later in the client.

You can specify a time-to-live amount in ms, that determines how long the value will be valid. The default is `300000`ms.

### `triggerRouteChange`

```typescript
triggerRouteChange(params: {pageId?:string, route?:string, locale?:string}): Promise<void>
```

pageId?: string;
/\*\*

- the route the pattern-library should route to
  \*/
  route?: string;
  /\*\*
- the locale the new route should be in
-
- This can be used to switch language
- You could specify an additional pageId or route if you want to keep the current page
  \*/
  locale?: string;

This method will trigger a route change request. A `pageId`, `route` or `locale` can be passed in. If a corresponding page is found the route change will be triggered. Since this is only available when javascript is enabled, make sure that some kind of fallback is provided.
