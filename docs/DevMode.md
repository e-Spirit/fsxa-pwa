# Development Mode

[<< Back to index](index.md)

The FSXA-PWA features a development mode that helps you to easily map the content coming from the CaaS to your components.

To enable the development mode, the variable `devMode` must be set to `true` in the `fsxa.config.ts` file. Be aware that you have to restart the server when you change anything in this file. This file is also checked into git. So be sure to change the variable back to `false` before deploying to production.

If you are in development mode and a component on the page has not been developed yet, you will get an info box which shows exactly which component is missing and what information can be addressed.

![Missing Layout](../assets/documentation/MissingLayout.png)

If you have already implemented a component, you will see a question mark icon when hovering over the element.

![QuestionMark](../assets/documentation/QuestionMark.png)

Clicking on this question mark will provide you with more information about which component is being displayed and what data is available.
