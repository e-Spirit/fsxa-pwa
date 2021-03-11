# Adding Custom CSS to your Components

[<< Back to index](./index.md)

This project uses the [Tailwind CSS](https://tailwindcss.com/) framework for styling. The first two sections will explain in general how you can apply custom css to your components. And the final section will go into detail about some best practices for Tailwind CSS.

1. [JSX/TSX Components](#jsx/tsx-components)
2. [SFC Components](#sfc-components)
3. [Tailwind CSS](#tailwind-css)

## JSX/TSX Components

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

## SFC Components

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

## Tailwind CSS

When using [Tailwind CSS](https://tailwindcss.com/) you have two choices to apply styles to your components. You can either apply the tailwind classes directly.

```html
<div>
  <h1 class="text-red-300 text-xl font-bold font-sans">{{this.payload.st_title}}</h1>
</div>
```

Or if you need the same combination of classes more than once you can also declare them in your stylesheet or style tag using `@apply`.

```css
.headline {
  @apply text-red-300 text-xl font-bold font-sans
}
```