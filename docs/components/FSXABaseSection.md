# FSXABaseSection

Wir haben die FSXABaseSection erstellt, um dir nützliche Dinge an die Hand zu geben.

TODO: Was ist ein Absatz bei FirstSpirit? Wie ist er in die PWA integriert?

> Diese Klasse erbt von der [FSXABaseComponent](FSXABaseComponent.md). Schau dir die Dokumentation dieser für weiterführende Informationen an.

### Properties

#### `id` - string

Diese Eigenschaft wird automatisch mit der ID des Absatzes befüllt.

#### `meta`

Die Eigenschaft `meta` enthält alle Meta-Daten eines Absatzes.

> Du kannst `meta` über ein Generic mit [TypeScript](#typescript) typisieren.

#### `payload`

Der `payload` enthält alle in FirstSpirit gepflegten Daten des Absatzes.

> Du kannst `payloud` über ein Generic mit [TypeScript](#typescript) typisieren.

### Methods

#### `renderContentElement`

This method can be used to render additional child sections. In principle, the component could be linked directly to the data, but this would undermine the automatism that enables the editing of sections in the Content Creator. Therefore, it is best to render child sections as well as datasets using this method.

### TypeScript

If you are using TypeScript it is possible to explicitly type the properties `payload` and `meta` through Generics.

```typescript
import { FSXABaseSection } from 'fsxa-pattern-library'

export interface Payload {
  customProperty: string
}

export interface Meta {
  customMetaProperty: string
}

@Component({
  name: 'MyCustomComponent'
})
class MyCustomComponent extends FSXABaseSection<Payload, Meta> {
  get computedProperty() {
    // this property is explicitly typed through the generic
    return this.payload.customProperty
  }
}
export default MyCustomComponent
```
