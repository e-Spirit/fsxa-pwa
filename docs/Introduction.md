[README](../README.md) » Introduction

# Introduction

## General

The FSXA PWA is a project that demonstrates how to build a *Progressive Web App* that is consuming contents created and continuosly updated with the enterprise content management system [FirstSpirit](https://www.e-spirit.com/en/product/firstspirit-dxp/enterprise-cms/). It is part of the [FirstSpirit Experience Accelerator](https://docs.e-spirit.com/module/fsxa/), a set of projects allowing you to set up a state-of-the-art web presence in a fraction of the time required previously or by competing products.

## Projects used

The FSXA PWA connects to several other projects:

* [FSXA-UI](https://github.com/e-Spirit/fsxa-ui)/ Component Library
* [FSXA-Pattern-Library](https://github.com/e-Spirit/fsxa-pattern-library)
* [FSXA-API](https://github.com/e-Spirit/fsxa-api)
* [FSXA-Nuxt-Module](https://github.com/e-Spirit/fsxa-nuxt-module)
* [Omnichannel Manager](http://docs.e-spirit.com/tpp/)

The role of each of these is best seen in the architecture layout depicted below:

## Architecture

![FSXA Architecture](./imgs/FSXA_PWA_Architecture.svg)

### Omnichannel Manager


### FSXA-UI / Component-Library

FSXA-UI is a component library used by the FSXA-PWA and released under the Apache 2 license.

It contains all components used in the sample project. The Component Library is maintained and continuously extended by the e-Spirit AG.

### Pattern-Library

The FSXA-Pattern-Library manages the connection to the “outside world”. This means it handles the data coming from the CaaS (the FSXA-API acting as an intermediate stage) as well as the navigational data coming from the Navigation Service and provides this data to the PWA. It also connects the PWA to the Omnichannel-Manager to have components editable in the FirstSpirit ContentCreator.

### FSXA-API

In headless environments, the editorial content from FirstSpirit is provided via the CaaS. In turn, the navigation structure of the page can be accessed via the Navigation Service.

To make using these two services as easy as possible, we have developed the FSXA API. This project already provides a rich API to communicate with both services in a standardized way. It also transforms the responses of the CaaS and the navigation service and enriches them with other useful data.

For example, it converts the navigation service tree structure into easy to use maps and also extracts the start page directly.

The responses of the CaaS are transformed as well and unnecessary information for the frontend is removed.

### NUXT-Module

The FSXA-Nuxt-Module integrates the FSXA-Pattern-Library on a Node.js server. This Node.js server with NUXT is used for Server Side Rendering.

## Deployment?

https://confluence.e-spirit.de/pages/viewpage.action?pageId=40276757


Rancher Kubernetes Helm


CCD-Doku?
ccd pipeline
bitbucket
automatisches Deployment, ...
High Availability