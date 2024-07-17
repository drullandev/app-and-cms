import i18n, { TFunction } from 'i18next'
import { initReactI18next } from 'react-i18next'
import { useTranslation } from 'react-i18next'

import detector from 'i18next-browser-languagedetector'
import { setLocale } from 'yup'

import App from '../../app'
import resources from '../../../public/static/i18next/translations.json'

export function buildYupLocale(_: unknown, t: TFunction): void {
  setLocale({
    mixed: {
      default: t('mixed.validation.invalid') ?? 'Invalid',
      required: t('mixed.required.key') ?? 'Required',
    },
    number: {
      min: ({ min }) =>t('number.min.key') ?? 'Minimal',
      max: ({ max }) =>t('number.max.key') ?? 'Maximal'
    },
    string: {
      email:  t('string.email.key') ?? 'Must be an email',
      min: ({ min }) => t('string.min.key', { min }),
      max: t('string.max.key') ?? 'Exist a max value'
    }
  });
}

export function Tt(text: string){
  const { t } = useTranslation()
  return <>{t(text) ?? text}</>
}

i18n
  .use(detector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    initImmediate: false,
    resources,
    fallbackLng: 'en', // use en if detected lng is not available
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false // react already safes from xss
    },
    supportedLngs: ['en', 'es'],
    react: {      
      useSuspense: true,
    }
  },
  buildYupLocale)

i18n.on('languageChanged', () => {
  return <App/>
})

export default i18n
