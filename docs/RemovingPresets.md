[Readme](README.md) » Removing Presets

## Removing Presets

1. [Introduction](#introduction)
2. [FSXA-UI](#fsxa-ui)
3. [TailwindCSS](#tailwindcss)
4. [Vue-TSX-Support](#vue-tsx-support)
5. [Semantic-Release](#semantic-release)

### Introduction

This chapter introduces optional dependencies. Why we have them in our project and how you can easily remove them.
### FSXA-UI

The [FSXA-UI](https://github.com/e-Spirit/fsxa-ui) is a component library containing all sections that have been implemented in our project 'Smart Living'.

#### Why do we use this?

We use this component library to display the individual components in the PWA.
We do not have to implement them here, but provide them with a detailed documentation.

#### How to remove

To remove the FSXA UI from the project, the dependency must first be removed.

```shell
npm uninstall fsxa-ui
```

The FSXA UI must be removed from all components in the `components/fsxa` folder.

The best way to see if a component is used is to look at the imports at the beginning of a file.
If the FSXA-UI is imported there, this import and from the `render` function the component must be removed.

Also, the CSS file `'fsxa-ui/dist/fsxa-ui.css'` must be removed from the `css` attribute from the `nuxt.config.ts` file.

### TailwindCSS

[TailwindCSS](https://tailwindcss.com/) is a utility-first CSS framework. With which the writing of own CSS classes is no longer necessary.
#### Why do we use this?

We use TailwindCSS to create responsive designs without having to create additional CSS files.

#### How to remove

First, TailwindCSS and the required dependencies must be removed.
```shell
npm uninstall @nuxtjs/tailwindcss tailwindcss @tailwindcss/postcss7-compat postcss autoprefixer
```

Also, in `nuxt.config.ts` for the `buildModules` attribute, the `'@nuxtjs/tailwindcss'` entry must be removed.

Attention: By removing TailwindCSS, the classes used in the components are of course no longer present, so the styling will now look different.

### Vue-TSX-Support

[Vue-Tsx-Support](https://github.com/wonderful-panda/vue-tsx-support) is a library that allows to use the TSX syntax with Vue.js.

#### Why do we use this?

We use this library to get better TypeScript support.

#### How to remove

First, the dependency must be removed.
```shell
npm uninstall vue-tsx-support
```

Then all existing components must be adapted.
The file extension changes to `.vue` and inside the file a new tag `template` has to be created, containing the HTML.
If there are any conditions or loops in the HTML they have to be transferred into the Vue.js syntax.

### Semantic-Release

[Semantic-Release](https://github.com/semantic-release/semantic-release) is a library that allows to automate releases on GitHub.
#### Why do we use this?

We use this library to automatically increment the version number during our release process and publish release notes.

#### How to remove

First, all the required dependencies must be removed.
```shell
npm uninstall cz-conventional-changelog commitizen @semantic-release/changelog @semantic-release/commit-analyzer @semantic-release/git @semantic-release/github @semantic-release/release-notes-generator @commitlint/cli @commitlint/config-conventional
```

Also, the scripts need to be removed.
<br />
To do this, the entries `commit`, `commitmsg` and `semantic-release` must be removed in `package.json` under the attribute `scripts`.
