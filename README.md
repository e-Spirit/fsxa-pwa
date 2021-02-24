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

This chapter describes how to set up the project and complete the first steps.

### Requirements

- [node](https://nodejs.org/en/) - latest LTS Version: 14.15.5.
- A text editor - like [VS Code](https://code.visualstudio.com/) with the [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur) plugin.
- A terminal - like VS Code's integrated [terminal](https://code.visualstudio.com/docs/editor/integrated-terminal)
- [Git](https://git-scm.com/) - latest major version: > 2.

### Setting up the project

1. Open the terminal and if needed, navigate in your preferred directory where the project should be saved.


2. Clone the project via the terminal command `git clone https://github.com/e-Spirit/fsxa-pwa.git`. After a few moments the project should appear in your directory.


3. Navigate to the newly created folder with `cd fsxa-pwa`


4. Copy the existing `.env.template` file and paste it with the new name `.env` or simply run the command `cp .env.template .env`.


5. The .env file must contain all the information you need to access your own system. You can get this information from your contact person at e-Spirit AG. By default, this file is located in the `.gitignore` and is therefore not persisted. Each required attribute is explained briefly, for a more detailed description please check the [configuration page](TODO).


6. To install all needed dependencies run the command `npm install`.


7. After all dependencies are installed, you can start a local development server with `npm run dev`.


8. After the server is started, it is accessible at http://localhost:3000 in your browser.

### Development mode

There is a development mode that helps to easily map the content coming from the CaaS.

To enable the development mode, the variable `devMode` must be set to `true` in the `fsxa.config.ts` file.

If you are in development mode and the component that is on the page has not been developed yet, you will get an info box. This shows exactly which component is missing and what information can be addressed.

![Missing Layout](./assets/documentation/MissingLayout.png)

If you are in development mode and you have already implemented the component, then you will see question marks when hovering over the elements.

![QuestionMark](./assets/documentation/QuestionMark.png)

By clicking on this question mark you will get more information about which component is displayed and what information is available.

### Writing components

If we want to start implementing the missing components, we must first specify where these files will be located. We do this in the `fsxa.config.ts`.

There we see under the entry `components` the different types that are available. There we can specify the path. The `~` stands for the root of the project.

After you have created the file in these folders, you can start the implementation there. Make sure that the name of the file corresponds to the name of the required component.

There are some basic components that you can use to build your own components.
You can import `FSXABaseLayout`, `FSXABaseAppLayout`, `FSXABaseSection` from the `fsxa-pattern-library` to access the basic functionalities.
Extend these classes with your own and access the data from the CaaS.

Under the given variable `this.payload` you can access the actual payload and use it in your component.

## Legal Notices

FSXA-PWA is a product of [e-Spirit AG](http://www.e-spirit.com), Dortmund, Germany.
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
