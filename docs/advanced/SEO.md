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

By default, the npm package name will be your page title but you can change this to whatever you want. Any settings you add here, will be added to every page of your application. You can also import scripts by adding a script array property and even import stylesheets by adding objects to the `link` array.

```javascript
head: {
  script: [
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'
    }
  ],
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css?family=Roboto&display=swap'
    }
  ]
}
```

## Local Configuration

When you declare your component class you can define a `head()` function which returns an object similar to the `head` object in the global configuration. This way you have access to data and computed properties.

SFC-Example

```javascript vue
<template>
  <h1>About page with jQuery and Roboto font</h1>
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
        script: [
          {
            src:
              'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'
          }
        ],
        link: [
          {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css?family=Roboto&display=swap'
          }
        ]
      }
    }
  }
</script>

<style scoped>
  h1 {
    font-family: Roboto, sans-serif;
  }
</style>
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
      script: [
        {
          src:
            'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'
        }
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Roboto&display=swap'
        }
      ]
    }
  }
})
export class MyComponent extends FSXABaseComponent<{}>{
  render(){
    return <h1 style="font-family: Roboto, sans-serif">About page with jQuery and Roboto font</h1>
  }
}
```