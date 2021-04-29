# The Vuex-Store

[<< Back to Index](./index.md)

[Vuex](https://vuex.vuejs.org/#what-is-vuex) is a state management library for vue.js applications. It serves as a centralized store for all the components in an application, with rules ensuring that the state can only be mutated in a predictable fashion. Basically it stores all data needed to run your application.

When you run the FSXA-PWA, the store is initialized and used for client side hydration (see also [the SSR chapter](./SSR.md)). The FSXA-Pattern-Library used in the FSXA-PWA provides a rudimentary set of actions and getters associated with the FSXA application architecture. You can fetch and store navigation data, locale information, pages, configuration data and more. Most of this is handled in the background for you. But occasionally you might want to get navigation data for example.

```javascript
import { FSXAGetters } from 'fsxa-pattern-library'

//...
get navigationData(): NavigationData | null {
  return this.$store.getters[FSXAGetters.navigationData]
}
```

## Modules

In Nuxt.js you can add your own modules to the store by defining a subfolder in the `store` folder like for example `/store/myStore`. You can then access that store's getters and mutations like this: `this.$store.myStore.getters[]`. You can read more about this in the [Nuxt.js documentation](https://nuxtjs.org/docs/2.x/directory-structure/store#modules)