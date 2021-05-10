# Custom CSS

There are a few ways to include your own CSS. 
In this chapter a short overview will be provided. For further details please visit this [page](./docs/css/index.md).

## Using TailwindCSS

[TailwindCSS](https://tailwindcss.com/) is included by default in the FSXA-PWA. 
TailwindCSS is a utility-first framework to provide a lot of classes to design the website directly in the markup without the need to write additional classes.

## Global CSS

You can import one or more CSS files globally. These are then available in every component.
To include a CSS file, you have to modify the `css` attribute in the `nuxt.config.ts` file and create a new entry there.

Example: 

```typescript
  /*
   ** Global CSS
   */
  css: [
    'fsxa-pattern-library/dist/fsxa-pattern-library.css',
    'fsxa-ui/dist/fsxa-ui.css',
    '~/path/to/your/global.css'
  ],
```

Please keep in mind not to remove the CSS to the FSXA-Pattern-Library and FSXA-UI, when you want to use these projects.

## Using style in JSX/TSX components

When implementing components using `JSX` or `TSX`. You can simply declare your `CSS` classes in a stylesheet and import that stylesheet into your component using the Typescript or ES6 style import.

For example you can make a `style.css` file next to your component

```css
.headline {
  font-size: 2rem;
  font-family: sans-serif;
  font-weight: bold;
  color: coral;
}
```

And then import and use it in your component like this

```typescript jsx
...
import 'style.css'

interface Payload {
  st_title: string
}
@Component({
  name: "Headline",
})
class Headline extends FSXABaseComponent<Payload>{
  render() {
    return (
      <div>
        <h1 class="headline">{{this.payload.st_title}}</h1>
      </div>
    )
  }
}
```

## Using Style in SFC Components

When using vue single file components you simply add a style tag to your file and declare your CSS-Classes there. The classes are then available within the scope of your component.

```vue
<template>
  <div>
    <h1 class="headline">{{this.payload.st_title}}</h1>
  </div>
</template>
<script>
...
</script>
<style>
.headline {
  font-size: 2rem;
  font-family: sans-serif;
  font-weight: bold;
  color: coral;
}
</style>
```
