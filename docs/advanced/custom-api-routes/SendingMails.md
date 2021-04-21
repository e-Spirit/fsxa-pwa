In diesem Kapitel werden wir eine REST-API-Schnittstelle implementieren, die E-Mails verschicken kann.
Dazu werden wir in dem FSXA-PWA Projekt eine neue route anlegen und mit [Nodemailer](TODO) umsetzen.

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
    app.use(express.json())

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

Und wenn wir das in Postman ausprobieren, bekommen wir auch das entsprechende Ergebnis.

![MailServiceBasicRequest](imgs/../../../imgs/CustomApiRoutes/MailServiceBasicRequest.png)

Wir wollen zunächst zusehen, dass wir bei jedem Request auch wirklich einen Namen, eine Email, einen Firmennamen und eine Nachricht bekommen und wir wollen überprüfen ob die Email, die angegeben wurde überhaupt so stimmen kann.

We destructure the body of the request und nehmen die Werte, von denen wir erwarten dass sie dort vorhanden sind.

```typescript
const { email, subject, company, content } = req.body
```

Als nächstes überprüfen wir, ob alle Werte gesetzt sind und falls dies nicht der Fall ist, senden wir den Status Code 422 (Unprocessable Entity) mit einer entsprechenden Fehlermeldung. Wir stellen mit dem `return` sicher, dass der Code hier nicht weiter durchgegangen wird, da wir ja schon die Nachricht gesendet haben.

```typescript
if (!email || !subject || !company || !content) {
  return res.status(422).send({
    code: 422,
    message: 'Please provide email, subject, company and content'
  })
}
```

Diese Logik kann man allerdings auch in eine eigene Methode auslagern, was dafür sorgen kann, dass die Logik in den Request ein wenig übersichterlich aussieht. Das machen wir in dem nächsten Beispiel, in dem wir überprüfen ob die Email valide ist.

Dazu schreiben wir **über** dem `export default` eine neue Methode `isEmailValid` die einen string entgegen nimmt.

```typescript
const isEmailValid = (email: string) => {
  return email.includes('@')
}
```

Dort überprüfen wir, um es einfach zu halten, nur ob die Email auch ein @-Zeichen enthält. Diese Methode kann man im Nachhinein sehr bequem erweitern.

Jetzt können wir die Methode in unseren POST-Request einbauen und falls keine valide Email angegeben wurde eine Fehlermeldung herausgeben.

```typescript
if (!isEmailValid(email)) {
  return res
    .status(422)
    .send({ code: 422, message: 'Please provide a valid email' })
}
```

Das können wir wieder einmal ausprobieren und sehen, dass wenn wir eine Email ohne @-Zeichen angeben, genau diese Fehlermeldung erscheint.

Nun wollen wir aber diese Informationen nehmen und endlich eine Email verschicken.

Dazu benutzen wir die Library [Nodemailer](TODO). In diesem Beispiel können wir nicht auf alle Möglichkeiten und Eigenschaften von Nodemailer eingehen. Bei Interesse empfehlen wir einen Blick in die [Dokumentation](TODO).

Zunächst installieren wir Nodemailer per npm.

```bash
npm install nodemailer
```

und importieren es ganz oben in unserer `mailService.ts`-Datei

```bash
import nodemailer from 'nodemailer'
```

Mit Nodemailer bietet die Möglichkeit zusammen mit [ethereal.email](TODO) einen Testaccount zu erstellen. Das werden wir in diesem Beispiel machen, du kannst dafür deinen eigenen Account nehmen, achte nur darauf deine Zugangsdaten nicht öffentlich zu stellen.

Wir erstellen eine neue Methode um die Email zu schicken, dort erstellen wir den Testaccount und den Transporter, bei dem wir die Verbindung zu dem SMTP-Server herstellen.

```typescript
const sendMail = async (mailContent: MailContent) => {
  const testAccount = await nodemailer.createTestAccount()
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    }
  })
}
```

Mit diesem Transporter können wir nun eine Methode aufrufen, um eine Email zu senden.
Dort wird der Absender, der Empfänger, der Betreff und der Inhalt der Email angegeben.
Das fügen wir direkt nach der Erstellung des `transporter` hinzu.

```typescript
const info = await transporter.sendMail({
  from: '"Sending Test Account" <sender@example.com>',
  to: 'Receiving Test Account <receiver@example.com> ',
  subject: 'Testing Mail',
  text: 'Hello World',
  html: '<h1>Hello World</h1>'
})
return info
```

Hier bei geben wir `text` **und** `html` an. Dabei dient der `text` als fallback, falls ein Email-Provider kein HTML unterstützt.

Wir können nun die `sendMail`-Methode in unserem Controller aufrufen:

```typescript
sendMail()
  .then((info) => {
    console.log(nodemailer.getTestMessageUrl(info))
    res.send(info)
  })
  .catch((err) => {
    res
      .status(err.responseCode || 400)
      .send({ code: err.responseCode || 400, err })
  })
```

Wenn das Senden der Email erfolgreich war, haben wir die Möglichkeit mit `Nodemailer` uns die URL mit der Message herausgeben zu lassen und außerdem werden die Informationen als Antwort an den Request zurück geschickt. <br />
Falls das Senden nicht erfolgreich, soll der entsprechende Status Code, oder falls es diesen nicht gibt `400` und die Fehlermeldung zurück geschickt werden.

Wenn du die URL die in der Konsole ausgeloggt wurde im Browser öffnest, siehst du die Nachricht die versendet wurde.

Diese Email wollen wir jetzt mit unserem eigenen Inhalt versehen.
Dafür erstellen wir erstmal ein `interface` in dem wir sagen, welche Inhalte wir verwenden wollen:

```typescript
interface MailContent {
  email: string
  subject: string
  company: string
  content: string
}
```

Als nächstes erstellen wir zwei Funktionen, die einen Text mithilfe der Parameter erstellen sollen, einmal als ganz normaler Text und einmal als Email.

```typescript
const generateText = ({ email, subject, company, content }: MailContent) => {
  return `
NEW MESSAGE RECEIVED
Data:
Subject: ${subject}
Email: ${email}
Company: ${company}
Content: ${content}
`
}

const generateHTML = ({ email, subject, company, content }: MailContent) => {
  return `
  <h1>NEW MESSAGE RECEIVED</h1>
  <p>Data: 
  <ul>
    <li>Email: ${email}</li>
    <li>Subject: ${subject}</li>
    <li>Company: ${company}</li>
    <li>Content: <pre>${content}</pre></li>
  </ul>
  </p>
`
}
```

In unserer `sendMail` Funktionen können wir jetzt auch den Content übergeben und unsere erstellten Funktionen benutzen.

```typescript
const sendMail = async (mailContent: MailContent) => {
  const testAccount = await nodemailer.createTestAccount()
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    }
  })
  const info = await transporter.sendMail({
    from: '"Sending Test Account" <sender@example.com>',
    to: 'Receiving Test Account <receiver@example.com> ',
    subject: 'Test',
    text: generateText(mailContent),
    html: generateHTML(mailContent)
  })
  return info
}
```

Die gesamte Datei sollte am Ende wie folgt aussehen:

```typescript
import express, { Request, Response } from 'express'
// eslint-disable-next-line import/named
import { FSXAMiddlewareContext } from 'fsxa-nuxt-module'
import nodemailer from 'nodemailer'

interface MailContent {
  email: string
  subject: string
  company: string
  content: string
}

const generateText = ({ email, subject, company, content }: MailContent) => {
  return `
NEW MESSAGE RECEIVED
Data:
Subject: ${subject}
Email: ${email}
Company: ${company}
Content: ${content}
`
}

const generateHTML = ({ email, subject, company, content }: MailContent) => {
  return `
  <h1>NEW MESSAGE RECEIVED</h1>
  <p>Data: 
  <ul>
    <li>Email: ${email}</li>
    <li>Subject: ${subject}</li>
    <li>Company: ${company}</li>
    <li>Content: <pre>${content}</pre></li>
  </ul>
  </p>
`
}

const sendMail = async (mailContent: MailContent) => {
  const testAccount = await nodemailer.createTestAccount()
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    }
  })
  const info = await transporter.sendMail({
    from: '"Sending Test Account" <sender@example.com>',
    to: 'Receiving Test Account <receiver@example.com> ',
    subject: 'Test',
    text: generateText(mailContent),
    html: generateHTML(mailContent)
  })
  return info
}

const isEmailValid = (email: string) => {
  return email.includes('@')
}

export default {
  async handler(context: FSXAMiddlewareContext, req: Request, res: Response) {
    const app = express()
    app.post('/', async (req, res) => {
      const { email, subject, company, content } = req.body
      if (!email || !subject || !company || !content) {
        return res.status(422).send({
          code: 422,
          message: 'Please provide email, subject, company and content'
        })
      }
      if (!isEmailValid(email)) {
        return res
          .status(422)
          .send({ code: 422, message: 'Please provide a valid email' })
      }

      sendMail({
        email,
        subject,
        company,
        content
      })
        .then((info) => {
          console.log(nodemailer.getTestMessageUrl(info))
          res.send(info)
        })
        .catch((err) => {
          res
            .status(err.responseCode || 400)
            .send({ code: err.responseCode || 400, err })
        })
    })
    return app(req, res)
  },
  route: '/test123'
}

const router = express.Router()

router

export default {
  router,
  route: '/mailService/'
}
```
