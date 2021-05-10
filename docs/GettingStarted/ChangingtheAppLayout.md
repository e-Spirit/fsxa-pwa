[<< Back to Index](./index.md)

# Changing the App Layout

In the app layout you can specify a frame for all pages.
For example, if all pages include navigation, it can be specified there.

Thereby the FSXABaseAppLayout is extended to adjust attributes like the `appState` and `appError`. More information can be found [here](./docs/components/FSXABaseAppLayout.md).

In the JSX/TSX context `{this.$slots.default}` defines where the contents of the container will be displayed.

Example:
```tsx
render(){
  return (
    <div>
        <Navigation />
        {this.$slots.default}
    </div>)
}
```

In the SFC context this is achieved with `<slot></slot>`.

Example: 

```vue
<template>
  <div>
    <Navigation />
    <slot></slot>
  </div>
</template>
```

Furthermore, here you have all the possibilities that have already been described in the chapters ["My First Template"](#my-first-template) and ["Custom CSS"](#custom-css). 
