/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    VITE_APP_NAME: string;
    VITE_DOMAIN: string;
    VITE_HOST_URL: string;
    VITE_PROTOCOL: string;
    VITE_API_PORT: string;
    VITE_API_URL: string;
    VITE_TESTING: string; // A veces se usa "string" en vez de boolean en .env
    VITE_DEFAULT_LANG: string;
    VITE_SUPPORTED_LANGS: string;
    VITE_HOME_PATH: string;
    VITE_GA4_TRACKING_ID: string;
    VITE_SLITE_PATH: string;
    VITE_STORAGE_KEY: string;
    VITE_CAPTCHA_EXPIRY_TIME: number;
    VITE_CAPTCHA_CLEANUP_INTERVAL: number;
    VITE_COOKIE_PATH: string;
    VITE_CRM_API_URL: string;
    VITE_AUTH_LOGIN: string;
    VITE_SHOW_PWA_INSTALLER: boolean;
    VITE_SHOW_COOKIES_CONSENT: boolean;
    VITE_ENABLE_CAPTCHA: boolean;
  }
}
