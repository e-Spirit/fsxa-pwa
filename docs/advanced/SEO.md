# SEO

[<< Back to index](./index.md)

In the FSXA-PWA there are a variety of ways to configure your meta tags for search engine optimization. You can configure them globally in the `nuxt.config.ts` or locally when you declare a component and then only when this component is rendered, which basically only makes sense for pages or layouts.

## Global Configuration

In the `nuxt.config.ts` you will find a property named head. This is basically the same as an HTML head tag except it's a javascript object.

```javascript
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  }
```

By default, the npm package name will be your page title but you can change this to whatever you want. Any settings you add here, will be added to every page of your application. You can also import scripts by adding a script array property and even import stylesheets by adding objects to the `link` array. But for SEO you will probably want to add keywords to the `meta` tag.

```javascript
  head: {
    meta: [
      {
        name: 'keywords'
        content: "nuxt, fsxa, seo"
      }
    ]
  }
```

## Local Configuration

In order to add tags to certain pages and not others you can use a local configuration. When you declare your component class you can define a `head()` function which returns an object similar to the `head` object in the global configuration. This way you have access to data and computed properties. Declaring meta tags both here and in the global config will cause both configurations to appear on this page. Title tags will be overwritten instead.

SFC-Example

```javascript vue
<template>
  <h1>About page with additional keywords</h1>
</template>

<script>
  export default {
    data() {
      return {
        title: 'My dynamic data driven title'
      }
    },
    head() {
      return {
        title: this.title,
        meta: [
          {
            name: 'keywords',
            content: 'my, page, specific, keywords'
          }
        ]
      }
    }
  }
</script>
```

In TSX you will have to declare the `data` and `head` functions inside your `@Component` annotation.

TSX-Example

```typescript jsx
import Component from 'vue-class-component'
import { FSXABaseComponent } from 'fsxa-pattern-library'

@Component({
  name: 'MyComponent',
  data(){
    return {
      title: 'My dynamic data driven title'
    }
  }
  head(){
    return {
      title: this.title,
      meta: [
        {
          name: 'keywords',
          content: 'my, page, specific, keywords'
        }
      ]
    }
  }
})
export class MyComponent extends FSXABaseComponent<{}>{
  render(){
    return <h1>About page with additional keywords</h1>
  }
}
```

In both of these examples the head of this specific page will look like this when rendered.

```html
<head>
  <title>My dynamic data driven title</title>
  <meta name="keywords" content="nuxt, fsxa, seo"></meta>
  <meta name="keywords" content="my, page, specific, keywords"></meta>
</head>
```
