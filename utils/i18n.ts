import get from 'lodash.get'

const fallbackTranslations = {
  de_DE: {
    language: {
      label: 'Sprache',
      de_DE: 'Deutsch',
      en_GB: 'Englisch'
    },
    product_detail: {
      tt_categories: 'Kategorien',
      tt_compatibility: 'Kompatibilität',
      tt_delivery: 'Lieferumfang',
      tt_installation: 'Installationsanleitung'
    }
  },
  en_GB: {
    language: {
      label: 'Language',
      de_DE: 'German',
      en_GB: 'English'
    },
    product_detail: {
      tt_categories: 'Categories',
      tt_compatibility: 'Compatibility',
      tt_delivery: 'Delivery',
      tt_installation: 'Installation'
    }
  }
}

export const getFallbackTranslation = (keyPath: string[]): string => {
  return get(fallbackTranslations, keyPath, keyPath.join('.'))
}
