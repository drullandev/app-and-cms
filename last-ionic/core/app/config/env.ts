import i18n, { TFunction } from 'i18next';
import { shareSocialOutline, addCircleOutline, closeCircleOutline } from 'ionicons/icons';

export const all = import.meta.env

// Environment variables
export const nodeEnv = import.meta.env.VITE_NODE_ENV ?? 'development';

// https://ionicframework.com/docs/react/config#global-config
export const appSetup = {
  rippleEffect: true,
  animated: true
}

//console.log(import.meta.env)

// Icon for the app
export const appIcon = 'assets/icon/transp-icon-512.png';

// Debug mode based on the environment
export const debug = import.meta.env.VITE_TESTING;

// Default language setting
export const defaultLanguage = import.meta.env.VITE_DEFAULT_LANG ?? 'en';

// Supported languages setting
export const supportedLanguages = import.meta.env.VITE_SUPPORTED_LANGS 
  ? import.meta.env.VITE_SUPPORTED_LANGS.split(',')
  : ['en', 'es'];

// Language priority order
export const langsPriority = supportedLanguages;

// ASCII Art for the project
export const asciiArt = import.meta.env.VITE_PROJECT_ASCIIART 
  ?? "  ██░ ██ ▒█████  ▄▄▄▄      \n ▓██░ ██▒██▒  ██▓█████▄    \n ▒██▀▀██▒██░  ██▒██▒ ▄██   \n ░▓█ ░██▒██   ██▒██░█▀     \n ░▓█▒░██░ ████▓▒░▓█  ▀█▓   \n  ▒ ░░▒░░ ▒░▒░▒░░▒▓███▀▒   \n  ▒ ░▒░ ░ ░ ▒ ▒░▒░▒   ░    \n  ░  ░░ ░ ░ ░ ▒  ░    ░    \n  ░  ░  ░   ░ ░  ░         \n  ▄▄▄      ██▓███  ██▓███  \n ▒████▄   ▓██░  ██▓██░  ██▒\n ▒██  ▀█▄ ▓██░ ██▓▓██░ ██▓▒\n ░██▄▄▄▄██▒██▄█▓▒ ▒██▄█▓▒ ▒\n  ▓█   ▓██▒██▒ ░  ▒██▒ ░  ░\n  ▒▒   ▓▒█▒▓▒░ ░  ▒▓▒░ ░  ░\n   ▒   ▒▒ ░▒ ░    ░▒ ░     \n   ░   ▒  ░░      ░░       \n       ░  ░                      \n ᵦᵧ ᴅₐᵥᵢ𝓭 ᵣᵤₗₗáₙ ᴅíₐ𝆎 𝔀ᵢₜₕ ₗₒᵥₑ ;₎\n 𝖧ɑρρɣ ɕ𝗈ᑯ౿";

// Application-specific variables
export const appName = import.meta.env.VITE_APP_NAME ?? 'Festivore';
export const appDomain = import.meta.env.VITE_DOMAIN ?? 'localhost';
export const appProtocol = import.meta.env.VITE_PROTOCOL ?? 'http';
export const appPort = import.meta.env.VITE_PORT ?? '3000';
export const appUrl = import.meta.env.VITE_URL ?? `${appProtocol}://${appDomain}:${appPort}`;

// Application environment settings
export const cookiePath = import.meta.env.VITE_COOKIE_PATH ?? '/';
export const enableCaptcha = import.meta.env.VITE_ENABLE_CAPTCHA;
export const captchaExpiryTime = import.meta.env.VITE_CAPTCHA_EXPIRY_TIME 
  ? import.meta.env.VITE_CAPTCHA_EXPIRY_TIME 
  : 300000;
export const captchaCleanupInterval = import.meta.env.VITE_CAPTCHA_CLEANUP_INTERVAL 
  ? import.meta.env.VITE_CAPTCHA_CLEANUP_INTERVAL 
  : 60000;

// Backend configuration
export const apiProtocol = import.meta.env.VITE_PROTOCOL ?? 'http';
export const apiPort = import.meta.env.VITE_API_PORT ?? '1337';
export const apiUrl = import.meta.env.VITE_API_URL ?? `${apiProtocol}://localhost:${apiPort}/api`;
export const apiUploads = apiUrl + '/uploads/'

// Authentication and login path
export const authLoginPath = import.meta.env.VITE_AUTH_LOGIN ?? '/auth/login';

// Storage configuration
export const storageKey = import.meta.env.VITE_STORAGE_KEY ?? 'app';

// PWA settings
export const showPwaInstaller = import.meta.env.VITE_SHOW_PWA_INSTALLER;
export const showCookiesConsent = import.meta.env.VITE_SHOW_COOKIES_CONSENT;

// Paths and URLs
export const homePath = import.meta.env.VITE_HOME_PATH ?? '/login';

// Third-party integrations
export const ga4TrackingId = import.meta.env.VITE_GA4_TRACKING_ID ?? 'YOUR_GA4_TRACKING_ID';
export const mapboxKey = import.meta.env.VITE_MAPBOX_KEY ?? 'pk.eyJ1IjoiZHJ1bGxhbiIsImEiOiJja2l4eDBpNWUxOTJtMnRuejE1YWYyYThzIn0.y7nuRLnfl72qFp2Rq06Wlg';

// SQLite configuration
export const sqlitePath = import.meta.env.VITE_SQLITE_PATH ?? './default-database.db';

// CRM API configuration
export const crmApiUrl = import.meta.env.VITE_CRM_API_URL ?? `${apiProtocol}://localhost:${apiPort}`;

// Docker configuration
export const containerName = import.meta.env.VITE_CONTAINER ?? 'app';
export const nodeVersion = import.meta.env.VITE_NVM_NODE_VERSION ?? '20.3.0';
export const dockerNodeVersion = import.meta.env.REACT_VITE_DOCKER_NODE_VERSION ?? '20.3.0-alpine';
export const installMode = import.meta.env.VITE_INSTALL_MODE ?? '--legacy-peer-deps';





// FOR STRAPI INTEGRATION

// Strapi image sizes names
// TODO: Move to a interface or model related with this images kind!!
export const imgSizes = ['thumbnail', 'small', 'medium', 'large'];

export const appAssets = import.meta.env + '/assets/'

export const loadingTime = 400

export const splashScreen = {
  showDuration: 4000,
  autoHide: true
}

export const fadeVelocity = 300

export const LOGIN_PATH = '/login'
export const SIGNUP_PATH = '/signup'

export const timeout = {
  buttonSpinner : 123,
  loadingPopup : 123,
  redirect : 123,
  refresh : 1000,
  readToast : 3000,
  doneMargin: 300,
}

export const paginator = {
  'size' : 8
}

/**
 * Configura los mensajes de validación de Yup.
 * Devuelve el objeto de configuración para Yup con las traducciones.
 *
 * @param t - La función de traducción de i18next.
 * @returns Objeto de configuración para Yup.
 */
export function getYupLocaleConfig(t: TFunction) {
  return {
    mixed: {
      default: t('mixed.validation.invalid', { defaultValue: t('Invalid') }),
      required: t('mixed.required.key', { defaultValue: t('Required') }),
    },
    number: {
      min: ({ min }: { min: number }) => t('number.min.key', { min, defaultValue: t('Minimal')+`: ${min}` }),
      max: ({ max }: { max: number }) => t('number.max.key', { max, defaultValue: t('Maximal')+`: ${max}` }),
    },
    string: {
      email: t('string.email.key', { defaultValue: 'Must be an email' }),
      min: ({ min }: { min: number }) => t('string.min.key', { min, defaultValue: t('Minimum length')+`: ${min}` }),
      max: ({ max }: { max: number }) => t('string.max.key', { max, defaultValue: t('Maximum length')+`: ${max}` }),
    },
  };
}

export const addToHomeScreenImages = [
  {
    src: shareSocialOutline, // Debes asegurarte de que 'icon.shareIcon' está definido en alguna parte.
    alt: i18n.t('Tap the Share Icon'),
  },
  {
    src: addCircleOutline, // Asegúrate de definir esto correctamente.
    alt: i18n.t('We are adding to homescreen...'),
  },
  {
    src: closeCircleOutline, // Asegúrate de que exista esta referencia.
    alt: i18n.t("Select 'Add to home screen' entry!"),
  },
]