/// <reference types="react-scripts" />

declare namespace NodeJS {

  interface ProcessEnv {

    VITE_APP_VERSION: string;

    // =============================
    // Application Configuration
    // =============================
    VITE_APP_NAME: string;
    VITE_APP_COOKIE_PATH: string;
    VITE_APP_STORAGE_KEY: string;

    // =============================
    // APP Configuration
    // =============================
    VITE_APP_PROTOCOL: 'http' | 'https'; // Protocolo debe ser solo 'http' o 'https'
    VITE_APP_DOMAIN: string;
    VITE_APP_PORT: string;
    VITE_APP_HOST_URL: string;
    VITE_APP_NODE_ENV: 'development' | 'production' | 'test'; // Environment values

    // =============================
    // API Configuration
    // =============================
    VITE_API_PROTOCOL: 'http' | 'https'; // Igual que el protocolo de la app
    VITE_API_DOMAIN: string;
    VITE_API_PORT: string;
    VITE_API_URI: string;
    VITE_API_URL: string;

    // =============================
    // Google Analytics
    // =============================
    VITE_GA4_TRACKING_ID: string;

    // =============================
    // Internationalization (i18n)
    // =============================
    VITE_DEFAULT_LANG: 'en' | 'es' | 'fr' | string; // Define los lenguajes compatibles
    VITE_SUPPORTED_LANGS: string; // Este puede ser una lista delimitada por comas, ej: 'en,es,fr'

    // =============================
    // Authentication and Security
    // =============================
    VITE_HOME_PATH: string;
    VITE_SHOW_ENABLE_COOKIES_CONSENT: 'true' | 'false';
    VITE_ENABLE_SHOW_PWA_INSTALLER: 'true' | 'false';

    // RECAPTCHA settings
    VITE_CAPTCHA_EXPIRY_TIME: number;
    VITE_CAPTCHA_CLEANUP_INTERVAL: number;
    VITE_ENABLE_CAPTCHA: 'true' | 'false';

    // =============================
    // Feature Toggles
    // =============================
    VITE_TESTING: 'true' | 'false';

    // =============================
    // Database Configuration
    // =============================
    VITE_SQLITE_PATH: string;

    // =============================
    // Sentry Tracking Configuration
    // =============================
    VITE_SENTRY_DNS: string;
    VITE_SENTRY_ENV: string;
    VITE_SENTRY_TOKEN: string;

    // =============================
    // Other
    // =============================
    VITE_CRM_API_URL: string;
    VITE_AUTH_LOGIN: string;
  }

}
