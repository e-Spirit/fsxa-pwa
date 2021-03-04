[Index](./index.md)
# Removing TailwindCSS from your Project

If you want to use a different CSS framework or none at all, you will have to remove [TailwindCSS](https://tailwindcss.com/) first.
You can do this by running the following command

```bash
npm uninstall tailwindcss @nuxtjs/tailwindcss
```

Finally you have to remove the tailwind build module from the `nuxt.config.ts` file

```typescript
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/tailwindcss'],
```

Keep in mind however, that the tailwind css classes are still applied to the existing components.