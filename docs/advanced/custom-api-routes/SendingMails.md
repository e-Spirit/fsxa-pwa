In diesem Kapitel werden wir eine REST-API-Schnittstelle implementieren, die E-Mails verschicken kann.
Dazu werden wir in dem FSXA-PWA Projekt eine neue route anlegen und mit Nodemailer umsetzen.

In diesem Beispiel werden wir ein Kontaktformular umsetzen, bei dem wir Informationen wie den Namen, die Email, den Firmennamen und die Nachricht entgegen nehmen und in einer Email weiterschicken.

Bitte beachte das generelle Vorwort wie man die CustomRoutes definiert. Hier knüpfen wir direkt daran an.

Als Ausgangssituation haben wir eine Datei namens `mailService.ts` mit dem Inhalt

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
  route: '/mail-service'
}
```

Zunächst möchten wir einen neuen Endpunkt erstellen, der bei einer POST-Anfrage die erforderlichen Daten entgegen nimmt und um es einfach zu halten genau wieder zurück schickt.

Dazu erstellen wir, nach dem die express-app initalisiert wurde, einen neuen POST-Endpunkt und schicken den body, wenn wir bekommen haben wieder zurück.

```typescript
app.post('/', (req, res) => {
  res.send(req.body)
})
```
