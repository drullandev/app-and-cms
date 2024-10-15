import i18n, { TFunction } from 'i18next';
import { shareSocialOutline, addCircleOutline, closeCircleOutline } from 'ionicons/icons';

// =============================
// Application Setup
// =============================
export const appSetup = {
  rippleEffect: true,
  animated: true
};

export const appIcon = 'assets/img/ica-slidebox-img-1.png';
export const loadingTime = 400;
export const splashScreen = {
  showDuration: 4000,
  autoHide: true
};
export const fadeVelocity = 300;

// =============================
// Environment Variables
// =============================
export const all = import.meta.env;

// Node environment setting (default to 'development')
export const nodeEnv = all.VITE_APP_NODE_ENV ?? 'development';

// =============================
// Application-Specific Variables
// =============================
export const appName = all.VITE_APP_NAME ?? 'Festivore';
export const appDomain = all.VITE_APP_DOMAIN ?? 'localhost';
export const appProtocol = all.VITE_APP_PROTOCOL ?? 'http';
export const appPort = all.VITE_APP_PORT ?? '3000';
export const appUrl = all.VITE_APP_HOST_URL ?? `${appProtocol}://${appDomain}:${appPort}`;

// Debug mode based on environment
export const debug = all.VITE_TESTING === 'true';

// =============================
// Internationalization (i18n)
// =============================
export const defaultLanguage = all.VITE_DEFAULT_LANG ?? 'en';
export const supportedLanguages = all.VITE_SUPPORTED_LANGS 
  ? all.VITE_SUPPORTED_LANGS.split(',')
  : ['en', 'es'];

// =============================
// CAPTCHA Configuration
// =============================
export const enableCaptcha = all.VITE_ENABLE_CAPTCHA === 'true';
export const captchaExpiryTime = Number(all.VITE_CAPTCHA_EXPIRY_TIME) ?? 300000;
export const captchaCleanupInterval = Number(all.VITE_CAPTCHA_CLEANUP_INTERVAL) ?? 60000;

// =============================
// Backend API Configuration
// =============================
export const apiProtocol = all.VITE_API_PROTOCOL ?? 'http';
export const apiPort = all.VITE_API_PORT ?? '1337';
export const apiUrl = all.VITE_API_URL ?? `${apiProtocol}://localhost:${apiPort}/api`;
export const graphqlUrl = `${apiProtocol}://localhost:${apiPort}/api/graphql`;
export const apiUploads = `${apiUrl}/uploads/`;

// =============================
// Authentication and Login Path
// =============================
export const authLoginPath = all.VITE_AUTH_LOGIN ?? '/auth/login';
export const homePath = all.VITE_HOME_PATH ?? '/login';

// =============================
// Storage Configuration
// =============================
export const storageKey = all.VITE_APP_STORAGE_KEY ?? 'app';

// =============================
// PWA and Consent Settings
// =============================
export const showPwaInstaller = all.VITE_ENABLE_SHOW_PWA_INSTALLER === 'true';
export const showCookiesConsent = all.VITE_SHOW_ENABLE_COOKIES_CONSENT === 'true';
export const cookiePath = all.VITE_APP_COOKIE_PATH ?? '/';
// =============================
// Third-Party Integrations
// =============================
export const ga4TrackingId = all.VITE_GA4_TRACKING_ID ?? 'YOUR_GA4_TRACKING_ID';

// Sentry configuration
export const sentryDns = all.VITE_SENTRY_DNS ?? '';
export const sentryEnv = all.VITE_SENTRY_ENV ?? '';
export const sentryToken = all.VITE_SENTRY_TOKEN ?? '';

// Mapbox configuration
export const mapboxKey = all.VITE_MAPBOX_KEY ?? 'YOUR_MAPBOX_KEY';

// =============================
// SQLite Configuration
// =============================
export const sqlitePath = all.VITE_SQLITE_PATH ?? './default-database.db';

// =============================
// CRM API Configuration
// =============================
export const crmApiUrl = all.VITE_CRM_API_URL ?? `${apiProtocol}://localhost:${apiPort}`;

// =============================
// Docker and Node Configuration
// =============================
export const containerName = all.VITE_CONTAINER ?? 'app';
export const nodeVersion = all.VITE_NVM_NODE_VERSION ?? '20.3.0';
export const dockerNodeVersion = all.REACT_VITE_DOCKER_NODE_VERSION ?? '20.3.0-alpine';
export const installMode = all.VITE_INSTALL_MODE ?? '--legacy-peer-deps';

// =============================
// Strapi Integration
// =============================
export const imgSizes = ['thumbnail', 'small', 'medium', 'large']; // Image sizes in Strapi

export const appAssets = `${import.meta.env}/assets/`;

// =============================
// Paths and Routes
// =============================
export const LOGIN_PATH = '/login';
export const SIGNUP_PATH = '/signup';

// =============================
// Timeout Configuration
// =============================
export const timeout = {
  buttonSpinner: 123,
  loadingPopup: 123,
  redirect: 123,
  refresh: 1000,
  readToast: 3000,
  doneMargin: 300,
};

// =============================
// Pagination Configuration
// =============================
export const paginator = {
  size: 8,
};

// =============================
// Add to Home Screen Configuration
// =============================
export const addToHomeScreenImages = [
  {
    src: shareSocialOutline,
    alt: i18n.t('Tap the Share Icon'),
  },
  {
    src: addCircleOutline,
    alt: i18n.t('We are adding to homescreen...'),
  },
  {
    src: closeCircleOutline,
    alt: i18n.t("Select 'Add to home screen' entry!"),
  },
];

/**
 * Configures Yup validation messages.
 * Returns the configuration object for Yup with translations.
 * 
 * @param t - The i18next translation function.
 * @returns Configuration object for Yup.
 */
export function getYupLocaleConfig(t: TFunction) {
  return {
    mixed: {
      default: t('mixed.validation.invalid', { defaultValue: t('Invalid') }),
      required: t('mixed.required.key', { defaultValue: t('Required') }),
    },
    number: {
      min: ({ min }: { min: number }) => t('number.min.key', { min, defaultValue: `${t('Minimal')}: ${min}` }),
      max: ({ max }: { max: number }) => t('number.max.key', { max, defaultValue: `${t('Maximal')}: ${max}` }),
    },
    string: {
      email: t('string.email.key', { defaultValue: 'Must be an email' }),
      min: ({ min }: { min: number }) => t('string.min.key', { min, defaultValue: `${t('Minimum length')}: ${min}` }),
      max: ({ max }: { max: number }) => t('string.max.key', { max, defaultValue: `${t('Maximum length')}: ${max}` }),
    },
  };
}
