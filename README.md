# FSXA-PWA
The FSXA-PWA is an example project and can be used as basis for developing your own PWA 
in the context of the FirstSpirit Experience Accelerator.

### About the FSXA
The FirstSpirit Experience Accelerator (FSXA) is the hybrid solution of a digital 
experience platform, combining a headless approach with enterprise capabilities. 
If you are interested in the FSXA check this 
[Overview](https://docs.e-spirit.com/module/fsxa/overview/benefits-hybrid/index.html). You can order 
a demo [online](https://www.e-spirit.com/us/specialpages/forms/on-demand-demo/).

## Getting Started

### Create `.env` file in root-directory

```bash
# APIKey used for authentication against the CaaS
FSXA_API_KEY= ...
# URL pointing to your CaaS Instance
FSXA_CAAS= ...
# ID of your project
FSXA_PROJECT_ID= ...
# URL pointing to the NavigationService
FSXA_NAVIGATION_SERVICE= ...
# Which mode should be used? (preview/release)
FSXA_MODE= ...
# KEY:VALUE map where semicolon is used as separator (key:uuid;key:uuid)
FSXA_REMOTES= ...
```

### How to run dev and build mode

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

This project is using the [FSXA-Pattern-Library](https://www.npmjs.com/package/fsxa-pattern-library) and [FSXA-UI](https://www.npmjs.com/package/fsxa-ui)

The pattern-library is referenced in two entry points.

### /src/pages/\_.tsx

The page structure in nuxt is mapped via files and folders inside of the pages folder. To leave the routing decision all requests are mapped to the generic IndexPage (\_.tsx) file. This will pass the current route to the FSXAPage. If the FSXAPage decides that a route-change is needed it will call the provided callback `handleRouteChange` with the next route and the IndexPage will pass it through the the router that is embedded in nuxt.

### /src/store/fsxa.ts

The pattern-library is using Vuex in the background to be able to provide a working server-side-rendering mechanism. All fetched data is stored in the Vuex Store and is passed to the Client after hydration. Since Vuex is already included and setup in nuxt, we need to add the vuex-store-module provided by the pattern-library to the existing one. This is done via adding the file `fsxa.ts`. It exports the store, actions, getters and mutations used inside of the pattern-library. The module itself is prefixing every action and getter with `fsxa` so that there are no unwanted name clashes.

### /src/store/index.ts

Nuxt is calling the action `nuxtServerInit` in the client hydration process. To pipe the input through to the pattern-library the `index.ts` exists and is listening to the `nuxtServerInit`. The payload is passed through to the `FSXAActions.setInitialStateFromServer`.

### Enabling Dev-Mode

Every FSXAInstance can be wrapped with an `FSXAConfigProvider`-Instance. By passing the `devMode`-Prop to it the UI will be enhanced with additional components to provide useful information for the development process.

```bash
<FSXAConfigProvider devMode>
    <FSXAPage />
</FSXAConfigProvider>
```

### Adding new Section Templates

It is very easy to add new section templates. Just create your own template in the components-folder and make sure that you extends the `FSXABaseSection` provided by the FSXA-Pattern-Library.

```bash
# /src/components/MyNewSectionTemplate.jsx

import { FSXABaseSection } from "fsxa-pattern-library"

# Your custom payload. You can find out which json is passed to your component when you enable the devMode
interface Payload {
    ...
}
class MyNewSectionTemplate extends FSXABaseSection<Payload> {
    render() {
        return (<div>Add your custom markup in here</div>)
    }
}
```

At last you have to wrap your `FSXAPage` with an `FSXAConfigProvider` Instance and pass a sections configuration.

```bash
import MyNewSectionTemplate from "~/components/MyNewSectionTemplate.tsx"

# in your render-method
<FSXAConfigProvider
    sections={{
        # you can find the template key when enabling the DevMode
        section_template_key: MyNewSectionTemplate,
    }}
>
    ...
</FSXAConfigProvider>
```

> You can override existing section templates in the same way. Just pass your component with the existing sections template key. The pattern library will use the last occurrence.

### Changing visual appearance with CSS-Variables

The FSXA-UI library provides multiple css-variables that can be set to change visual characteristics of the components.

```bash
~/assets/css/global.css

:root {
    # This will change the highlight color to red
    --fsxa-text-highlight-color: #FF0000;
}
```

## Legal Notices
FSXA-PWA is a product of [e-Spirit AG](http://www.e-spirit.com) AG, Dortmund, Germany.
The FSXA-PWA is subject to the Apache-2.0 license.

## Disclaimer
This document is provided for information purposes only.
e-Spirit may change the contents hereof without notice. 
This document is not warranted to be error-free, nor subject to any 
other warranties or conditions, whether expressed orally or 
implied in law, including implied warranties and conditions of 
merchantability or fitness for a particular purpose. e-Spirit 
specifically disclaims any liability with respect to this document 
and no contractual obligations are formed either directly or 
indirectly by this document. The technologies, functionality, services, 
and processes described herein are subject to change without notice.
