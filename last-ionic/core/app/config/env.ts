import i18n, { TFunction } from 'i18next';
import { shareSocialOutline, addCircleOutline, closeCircleOutline } from 'ionicons/icons';

export const all = process.env

// https://ionicframework.com/docs/react/config#global-config
export const appSetup = {
  rippleEffect: true,
  animated: true
}

// Icon for the app
export const appIcon = 'assets/icon/transp-icon-512.png';

// Debug mode based on the environment
export const debug = process.env.REACT_APP_TESTING;

// Environment variables
export const nodeEnv = process.env.REACT_APP_NODE_ENV ?? 'development';

// Default language setting
export const defaultLanguage = process.env.REACT_APP_DEFAULT_LANG ?? 'en';

// Supported languages setting
export const supportedLanguages = process.env.REACT_APP_SUPPORTED_LANGS 
  ? process.env.REACT_APP_SUPPORTED_LANGS.split(',')
  : ['en', 'es'];

// Language priority order
export const langsPriority = supportedLanguages;

// ASCII Art for the project
export const asciiArt = process.env.REACT_APP_PROJECT_ASCIIART 
  ?? "  ██░ ██ ▒█████  ▄▄▄▄      \n ▓██░ ██▒██▒  ██▓█████▄    \n ▒██▀▀██▒██░  ██▒██▒ ▄██   \n ░▓█ ░██▒██   ██▒██░█▀     \n ░▓█▒░██░ ████▓▒░▓█  ▀█▓   \n  ▒ ░░▒░░ ▒░▒░▒░░▒▓███▀▒   \n  ▒ ░▒░ ░ ░ ▒ ▒░▒░▒   ░    \n  ░  ░░ ░ ░ ░ ▒  ░    ░    \n  ░  ░  ░   ░ ░  ░         \n  ▄▄▄      ██▓███  ██▓███  \n ▒████▄   ▓██░  ██▓██░  ██▒\n ▒██  ▀█▄ ▓██░ ██▓▓██░ ██▓▒\n ░██▄▄▄▄██▒██▄█▓▒ ▒██▄█▓▒ ▒\n  ▓█   ▓██▒██▒ ░  ▒██▒ ░  ░\n  ▒▒   ▓▒█▒▓▒░ ░  ▒▓▒░ ░  ░\n   ▒   ▒▒ ░▒ ░    ░▒ ░     \n   ░   ▒  ░░      ░░       \n       ░  ░                      \n ᵦᵧ ᴅₐᵥᵢ𝓭 ᵣᵤₗₗáₙ ᴅíₐ𝆎 𝔀ᵢₜₕ ₗₒᵥₑ ;₎\n 𝖧ɑρρɣ ɕ𝗈ᑯ౿";

// Application-specific variables
export const appName = process.env.REACT_APP_NAME ?? 'Festivore';
export const appDomain = process.env.REACT_APP_DOMAIN ?? 'localhost';
export const appProtocol = process.env.REACT_APP_PROTOCOL ?? 'http';
export const appPort = process.env.REACT_APP_PORT ?? '3000';
export const appUrl = process.env.REACT_APP_URL ?? `${appProtocol}://${appDomain}:${appPort}`;

// Application environment settings
export const cookiePath = process.env.REACT_APP_COOKIE_PATH ?? '/';
export const enableCaptcha = process.env.REACT_APP_ENABLE_CAPTCHA;
export const captchaExpiryTime = process.env.REACT_APP_CAPTCHA_EXPIRY_TIME 
  ? process.env.REACT_APP_CAPTCHA_EXPIRY_TIME 
  : 300000;
export const captchaCleanupInterval = process.env.REACT_APP_CAPTCHA_CLEANUP_INTERVAL 
  ? process.env.REACT_APP_CAPTCHA_CLEANUP_INTERVAL 
  : 60000;

// Backend configuration
export const apiProtocol = process.env.REACT_APP_PROTOCOL ?? 'http';
export const apiPort = process.env.REACT_APP_API_PORT ?? '1337';
export const apiUrl = process.env.REACT_APP_API_URL ?? `${apiProtocol}://localhost:${apiPort}`;
export const apiUploads = apiUrl + '/uploads/'

// Authentication and login path
export const authLoginPath = process.env.REACT_APP_AUTH_LOGIN ?? '/auth/login';

// Storage configuration
export const storageKey = process.env.REACT_APP_STORAGE_KEY ?? 'app';

// PWA settings
export const showPwaInstaller = process.env.REACT_APP_SHOW_PWA_INSTALLER;
export const showCookiesConsent = process.env.REACT_APP_SHOW_COOKIES_CONSENT;

// Paths and URLs
export const homePath = process.env.REACT_APP_HOME_PATH ?? '/login';

// Third-party integrations
export const ga4TrackingId = process.env.REACT_APP_GA4_TRACKING_ID ?? 'YOUR_GA4_TRACKING_ID';
export const mapboxKey = process.env.REACT_APP_MAPBOX_KEY ?? 'pk.eyJ1IjoiZHJ1bGxhbiIsImEiOiJja2l4eDBpNWUxOTJtMnRuejE1YWYyYThzIn0.y7nuRLnfl72qFp2Rq06Wlg';

// SQLite configuration
export const sqlitePath = process.env.REACT_APP_SQLITE_PATH ?? './default-database.db';

// CRM API configuration
export const crmApiUrl = process.env.REACT_APP_CRM_API_URL ?? `${apiProtocol}://localhost:${apiPort}`;

// Docker configuration
export const containerName = process.env.REACT_APP_CONTAINER ?? 'app';
export const nodeVersion = process.env.REACT_APP_NVM_NODE_VERSION ?? '20.3.0';
export const dockerNodeVersion = process.env.REACT_REACT_APP_DOCKER_NODE_VERSION ?? '20.3.0-alpine';
export const installMode = process.env.REACT_APP_INSTALL_MODE ?? '--legacy-peer-deps';





// FOR STRAPI INTEGRATION

// Strapi image sizes names
// TODO: Move to a interface or model related with this images kind!!
export const imgSizes = ['thumbnail', 'small', 'medium', 'large'];

export const appAssets = process.env + '/assets/'

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