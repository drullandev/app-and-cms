import i18n, { TFunction } from 'i18next'
import detector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import { setLocale } from 'yup'

import App from '../../App'
import resources from '../../data/static/i18next/translations.json'

export function buildYupLocale(_: unknown, t: TFunction): void {
  setLocale({
    mixed: {
      default: 'mixed.validation.invalid',
      required: 'mixed.required.key',
    },
    number: {
      min: ({ min }) =>'number.min.key',
      max: ({ max }) =>'number.max.key'
    },
    string: {
      email:  'string.email.key',
      min: ({ min }) => 'string.min.key',
      max: 'string.max.key'
    }
  })
}

i18n
  .use(detector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({    
    initImmediate: false,
    resources,
    lng: import.meta.env.REACT_APP_DEFAULT_LNG, // Main language
    fallbackLng: import.meta.env.REACT_APP_FALLBACK_LNG, // Use REACT_APP_FALLBACK_LNG if detected lng is not available
    keySeparator: false, // We do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false // React already safes from xss
    },
    //supportedLngs: import.meta.env.REACT_APP_SUPPORTED_LANGS ? import.meta.env.REACT_APP_SUPPORTED_LANGS : ['en'],
    react: {      
      useSuspense: true,
    }
  }, buildYupLocale)

// then re-render your app
i18n.on('languageChanged', () => <App/> )

export default i18n