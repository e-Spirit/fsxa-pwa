Für die Entwicklung empfehlen wir mit [Postman](TODO LINK) zu arbeiten und werden in den Beispielen auch darauf eingehen. Jedoch ist das nicht zwingend nötig und jedes andere Tool kann auch verwendet werden.

Zunächst muss sichergestellt sein, dass es einen Ordner gibt in dem alle API-Schnittstellen definiert werden.
Normalerweise gibt es dafür den Ordner `customRoutes` in dem eine neue `.ts` Datei angelegt werden kann. Der Pfad zu diesem Ordner ist auch in der `fsxa.config.ts` angegeben unter dem Attribut `customRoutes`. Falls es diesen Ordner nicht gibt, kann irgendwo im Projekt ein solcher Ordner erstellt werden, wichtig ist nur, dass der Pfad dazu in der `fsxa.config.ts` angegeben wird. Das Gleiche gilt, wenn der Ordner umbenannt werden soll.

Nach dem in dem jeweiligen Ordner eine neue Datei erstellt wird, müssen wir eine Grundstruktur anlegen, damit das `FSXA-Nuxt-Module` die route automatisch erkennt und weiter verarbeiten kann.

```typescript
import express, { Request, Response } from 'express'
// eslint-disable-next-line import/named
import { FSXAMiddlewareContext } from 'fsxa-nuxt-module'

export default {
  async handler(
    context: FSXAMiddlewareContext,
    request: Request,
    response: Response
  ) {
    const app = express()

    return app(request, response)
  },
  route: '/your-custom-route'
}
```

Dabei werden alle nötigen dependencies von `express` und dem `FSXA-Nuxt-Module` importiert.
Außerdem exportieren wir als default einen `handler` und eine `route`.

Der `handler` übernimmt die komplette Logik der einzelnen Route und stellt die einzelnen Endpunkt zur Verfügung. Dabei hat man alle Freiheiten, die durch `express` zur Verfügung gestellt werden. Wir werden hier nicht alle Funktionalitäten ansprechen, da empfehlen wir die Dokumentation von [express](TODO LINK) selbst.

In dem handler können wir den `context` benutzen, dieser stellt uns die vorkonfigurierte [FSXA-API] zur Verfügung.
Außerdem haben wir unter `request` den eingehenenden request und unter `response` ein Objekt mit dem wir eine Antwort schicken können zur Verfügung.

Bei der `route` wird der grundsätzliche Pfad zur der API-Schnittstelle festgelegt.
