import React from 'react';

import i18n from 'i18next';
import { useTranslation, initReactI18next } from 'react-i18next';
import detector from 'i18next-browser-languagedetector';
import { supportedLanguages, defaultLanguage } from '../../../app/config/env';
import resources from '../../../app/translations.json';

import { setLocale } from 'yup';
import { getYupLocaleConfig } from '../../../app/config/env'

// Modo debug
const debug = false;

// Define un componente de traducción
export function t({ text }: { text: string }) {
  const { t } = useTranslation();
  return <>{t(text)}</>;
}

// Inicializa i18next
i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: defaultLanguage,
    keySeparator: false,
    interpolation: {
      escapeValue: false, // React ya se encarga de proteger contra XSS
    },
    supportedLngs: supportedLanguages,
    debug,
    react: {
      useSuspense: true, // Habilitar Suspense
    },
  })
  .then(() => {
    const { t } = i18n;
    setLocale(getYupLocaleConfig(t));
  })
  .catch((error) => {
    {
      console.error('Error initializing i18next:', error);
    }
  });

// Maneja cambios en el idioma
i18n.on('languageChanged', () => {
  {
    console.log('Language changed, updating the app container!');
  }
});

// Exporta i18n para que esté disponible en toda la app
export default i18n;
