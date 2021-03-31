# Routing

[<< Back to index](./index.md)

1. [Basic Routing Principles](#basic-routing-principles)
2. [FirstSpirit Navigation Service](#firstspirit-navigation-service)
3. [The triggerRouteChange Function](#the-triggerroutechange-function)

## Basic Routing Principles

In [Nuxt.js](https://nuxtjs.org) routing works via convention. You can link to any pages you may have created in the `pages` folder using the `<NuxtLink>` component. It has a prop called `to` that takes a route as parameter. If you have subfolders in the `pages` folder you can add them to the route as well.

SFC-Example

```vue
<template>
  <NuxtLink to="/">Home page</NuxtLink>
  <NuxtLink to="/myPage">Links to MyPage.vue in the pages folder </NuxtLink>
  <NuxtLink to="/aboutPages/myAboutPage">Links to MyAboutPage.vue in the pages/aboutPages folder.</NuxtLink>
</template>
```

TSX-Example

```typescript jsx

render() {
  declare const NuxtLink: Component
  return (
    <NuxtLink to="/">Home Page</NuxtLink>
  )
}
```

## FirstSpirit Navigation Service

The FSXA-PWA directly maps the navigation structure of the underlying FirstSpirit project into the predefined navigation component. This is achieved using the navigation service which maps all of the routes as defined in FirstSpirit to CaaS URLs.

## The triggerRouteChange Function

When you implement a component that extends [<FSXABaseComponent>](components/FSXABaseComponent.md) you get access to the `triggerRouteChange` function. You can either pass it a FirstSpirit `pageId`, a `route` (like in the `<NuxtLink>` component) or a `locale`. If you pass it a locale it will cause your app to stay on the same page but change the language.

SFC-Example

```vue
<template>
  <a href="#"
    v-on:click="handleClick($event)"
  >Home Page</a>
</template>
```

In your script tag where you define your component props, data and methods you will have to define the handleClick method like this.

```javascript
//...
methods: {
  handleClick: function(event) {
      event.preventDefault()
      this.triggerRouteChange({
        {
          route: "/"
        }
      })
  }
}
```

TSX-Example

```typescript jsx
render(){
  return(
    <a href="#"
      onclick={(event) => {
        event.preventDefault()
        this.triggerRouteChange({
          {
            route: "/"
          }
        })
      }}
    >Home Page</a>
  )
}
```
