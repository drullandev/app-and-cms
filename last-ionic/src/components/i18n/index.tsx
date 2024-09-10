import i18n, { TFunction } from 'i18next';
import { useTranslation, initReactI18next } from 'react-i18next';
import detector from 'i18next-browser-languagedetector';
import { setLocale } from 'yup';
import { supportedLanguages, defaultLanguage } from '../../app/config/env';


import resources from '../../static/i18next/translations.json';

const debug = false;

// Locales to yup!!
export function buildYupLocale(t: TFunction): void {
  setLocale({
    mixed: {
      default: t('mixed.validation.invalid') ?? 'Invalid',
      required: t('mixed.required.key') ?? 'Required',
    },
    number: {
      min: ({ min }) => t('number.min.key') ?? 'Minimal',
      max: ({ max }) => t('number.max.key') ?? 'Maximal',
    },
    string: {
      email: t('string.email.key') ?? 'Must be an email',
      min: ({ min }) => t('string.min.key', { min }),
      max: t('string.max.key') ?? 'Exist a max value',
    },
  });
}

// Define un componente para la traducción
export function Tt(text: string) {
  const { t } = useTranslation();
  return <>{t(text) ?? text}</>;
}

// Inicializa i18next
i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    initImmediate: false,
    resources,
    fallbackLng: defaultLanguage,
    keySeparator: false,
    interpolation: {
      escapeValue: false, // React ya se encarga de proteger contra XSS
    },
    supportedLngs: supportedLanguages,
    react: {
      useSuspense: true,
    },
  })
  .then(() => {
    const { t } = i18n;
    buildYupLocale(t); // Construye el locale de Yup después de la inicialización
  })
  .catch((error) => {
    if (debug) console.error('Error initializing i18next:', error);
  });

// Actualiza el contenedor de la aplicación cuando cambie el idioma
i18n.on('languageChanged', () => {
  // Puede ser necesario reiniciar el contenedor o realizar otras actualizaciones
  // Por ejemplo, si tu AppContainer usa el hook useTranslation, el cambio de idioma debería reflejarse automáticamente
  if (debug) console.log('Language changed, updating the app container!');
});

// Exporta i18n para usarlo en otras partes de la aplicación
export default i18n;