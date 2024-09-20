import React from 'react';
import i18n from 'i18next';
import { useTranslation, initReactI18next } from 'react-i18next';
import detector from 'i18next-browser-languagedetector';
import { supportedLanguages, defaultLanguage } from '../../../app/config/env';
import resources from '../../../app/translations.json';
import { setLocale } from 'yup';
import { getYupLocaleConfig } from '../../../app/config/env';
import LoggerUtils from '../../../classes/utils/LoggerUtils';

// Configuración del logger
const debug = false; // Asume que puedes cambiar esto dinámicamente
const logger = LoggerUtils.getInstance(debug, 'i18nLogger');

// Define un componente de traducción reutilizable
export function t({ text }: { text: string }) {
  const { t } = useTranslation();
  return <>{t(text)}</>;
}

// Inicializa i18next
const initializeI18n = () => {
  let currentLanguage = i18n.language; // Usa esta variable para el idioma actual

  i18n
    .use(detector) // Detecta el idioma del navegador
    .use(initReactI18next) // Conecta i18n con React
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
    }) // Inicializa con la configuración definida
    .then(() => {
      const { t } = i18n;
      setLocale(getYupLocaleConfig(t)); // Configura Yup con las traducciones correctas
      logger.info('i18n initialized successfully');
    })
    .catch((error) => {
      logger.error('Error initializing i18next:', error);
    });

  // Maneja cambios de idioma
  i18n.on('languageChanged', (newLanguage) => {
    const previousLanguage = currentLanguage;
    currentLanguage = newLanguage; // Actualiza el idioma actual
    logger.log(`Language changed from '${previousLanguage}' to '${newLanguage}'`);
  });
};

// Ejecuta la inicialización al cargar el módulo
initializeI18n();

// Exporta i18n para que esté disponible en toda la aplicación
export default i18n;
