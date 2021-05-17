[<< Back to index](./index.md)

# Removing Tailwind CSS from your Project

This project comes with [Tailwind CSS](https://tailwindcss.com/) installed by default. If you want to use a different CSS framework or none at all, you will have to remove [Tailwind CSS](https://tailwindcss.com/) first.
You can do this by running the following command

```bash
npm uninstall tailwindcss @nuxtjs/tailwindcss
```

Next you have to remove the tailwind build module from the `nuxt.config.ts` file

```typescript
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/tailwindcss'],
```

Finally you can delete the `tailwind.config.js` configuration file as it is no longer needed. This should completely remove tailwind from your project. Keep in mind however that the tailwind css classes are still applied to the existing html in your components.
