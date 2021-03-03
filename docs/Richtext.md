# Working with RichText

RichText ermöglicht dir im FirstSpirit-Context das Darstellen von Informationen mit Hilfe von großartigen und anpassbaren Formatierungen. Das bringt eine gewisse Komplexität mit sich.

Um dem entgegenzuwirken haben wir unseren Automatismus erweiter, so dass er nicht nut Layouts und Sections lädt, sondern auch RichText-Komponenten. Damit deine Komponente automatisch geladen wird, musst du eine Datei, welche dem Namensschema entspricht in deinem [konfigurierten](Configuration.md#richtext) richtext Ordner ablegen.

> Wir empfehlen, dass du von dem [`FSXABaseRichTextElement`](components/FSXABaseRichTextElement.md) ableitest. Dort sind die Eigenschaften bereits gemapped und nützliche Helfer-Funktionen, wie zum Beispiel das Rendern von Kind-Knoten, stehen dir zur Verfügung.

In unserem fsxa-pwa Beispielprojekt haben wir bereits einige Beispiel-Komponenten inkludiert, welche du natürlich so verwenden, anpassen oder erweiteren kannst. Im Laufe der Zeit kann es aber passieren, dass du Formatierungen verwendest die noch keine Frontend-Komponente als Gegenspieler haben oder du bestehende Formatierungen anpasst.

Bei aktiviertem (DevMode)[DevMode.md] werden dir nützliche Informationen zu noch fehlenden RichText-Komponenten angezeigt.

> TODO: Add Screenshot
