- Schnelles Hands-On
- Neues Backend - Neue Datenstruktur
  Gerade wenn man bei der Frontend-Entwicklung gegen ein neues Backend arbeitet kann es oft zu anfänglichen Problemen kommen. Die FSXA-Pattern-Library
-

Key Concepts

- Konfiguration
- Komponenten
  - AppLayout
  - Layouts
  - Sections
  - RichText
- SSR
- Vuex-Store
- Routing
- App Context
- FSXA-API
- Adding global css

### Basis-Komponenten

#### FSXABaseComponent

`triggerRouteChange({ pageId, locale, route }: { pageId?: string, locale?: string, route?: string }): void;`

This method will trigger a route change request. You can pass in a `pageId`, `route` or `locale`.

`currentPage(): NavigationItem | null`

Get the NavigationItem that is matching the current path

If null is returned, no current route could be matche to the current path

`isEditMode(): boolean`

    FSXABaseSection
    FSXABaseRichTextElement
    FSXABaseAppLayout
    FSXABaseLayout

Advanced Concepts

- Custom API-Endpoints
- Overriding Component-Mapping
