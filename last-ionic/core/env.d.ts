/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_NAME: string;
    REACT_APP_DOMAIN: string;
    REACT_APP_HOST_URL: string;
    REACT_APP_PROTOCOL: string;
    REACT_APP_API_PORT: string;
    REACT_APP_API_URL: string;
    REACT_APP_TESTING: string; // A veces se usa "string" en vez de boolean en .env
    REACT_APP_DEFAULT_LANG: string;
    REACT_APP_SUPPORTED_LANGS: string;
    REACT_APP_HOME_PATH: string;
    REACT_APP_GA4_TRACKING_ID: string;
    REACT_APP_SLITE_PATH: string;
    REACT_APP_STORAGE_KEY: string;
    REACT_APP_CAPTCHA_EXPIRY_TIME: number;
    REACT_APP_CAPTCHA_CLEANUP_INTERVAL: number;
    REACT_APP_COOKIE_PATH: string;
    REACT_APP_CRM_API_URL: string;
    REACT_APP_AUTH_LOGIN: string;
    REACT_APP_SHOW_PWA_INSTALLER: boolean;
    REACT_APP_SHOW_COOKIES_CONSENT: boolean;
    REACT_APP_ENABLE_CAPTCHA: boolean;
  }
}
