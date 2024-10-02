/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    // Application Configuration
    VITE_APP_NAME: string;
    VITE_APP_COOKIE_PATH: string;
    VITE_APP_STORAGE_KEY: string;

    // APP Configuration
    VITE_APP_PROTOCOL: string;
    VITE_APP_DOMAIN: string;
    VITE_APP_PORT: string;
    VITE_APP_HOST_URL: string;

    // API Configuration
    VITE_API_PROTOCOL: string;
    VITE_API_DOMAIN: string;
    VITE_API_PORT: string;
    VITE_API_URI: string;
    VITE_API_URL: string;

    // Google Analytics
    VITE_GA4_TRACKING_ID: string;

    // Internationalization (i18n)
    VITE_DEFAULT_LANG: string;
    VITE_SUPPORTED_LANGS: string;

    // Authentication and Security
    VITE_HOME_PATH: string;
    VITE_CAPTCHA_EXPIRY_TIME: number;
    VITE_CAPTCHA_CLEANUP_INTERVAL: number;
    VITE_ENABLE_CAPTCHA: boolean;

    // Feature Toggles
    VITE_TESTING: string; // A veces se usa "string" en vez de boolean en .env
    VITE_SHOW_PWA_INSTALLER: boolean;

    // Database Configuration
    VITE_SQLITE_PATH: string;

    // Other
    VITE_CRM_API_URL: string;
    VITE_AUTH_LOGIN: string;
    VITE_SHOW_COOKIES_CONSENT: boolean;
  }
}
