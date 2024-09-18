import i18n, { TFunction } from 'i18next';
import { shareSocialOutline, addCircleOutline, closeCircleOutline } from 'ionicons/icons';

export const all = process.env

// https://ionicframework.com/docs/react/config#global-config
export const appSetup = {
  rippleEffect: true,
  animated: true
}

// The default PWA values...
export const appName = 'MyAppSheet! ;)'

export const appIcon = 'assets/icon/transp-icon-512.png'

// The exported constants...
export const debug = process.env.REACT_APP_TESTING ?? true

export const nodeEnv = process.env.REACT_APP_NODE_ENV ?? 'development'

export const defaultLanguage = process.env.REACT_APP_DEFAULT_LANG ?? 'en';

export const supportedLanguages = process.env.REACT_APP_SUPPORTED_LANGS 
  ? process.env.REACT_APP_SUPPORTED_LANGS?.split('|')
  : ['en', 'es'];

// This is the list of available langs, also the prior order along app.
export const langsPriority = process.env.REACT_APP_SUPPORTED_LANGS 
  ? process.env.REACT_APP_SUPPORTED_LANGS?.split('|')
  : ['en', 'es'];

//export const allowedDomains = process.env.REACT_APP_ALLOWED_DOMAINS 
//  ? process.env.REACT_APP_ALLOWED_DOMAINS?.split('|')
//  : ['localhost:8100', 'localhost:3000', 'localhost:5173'];

export const asciiArt   = process.env.REACT_APP_PROJECT_ASCIIART 
  ?? "  ██░ ██ ▒█████  ▄▄▄▄      \n ▓██░ ██▒██▒  ██▓█████▄    \n ▒██▀▀██▒██░  ██▒██▒ ▄██   \n ░▓█ ░██▒██   ██▒██░█▀     \n ░▓█▒░██░ ████▓▒░▓█  ▀█▓   \n  ▒ ░░▒░░ ▒░▒░▒░░▒▓███▀▒   \n  ▒ ░▒░ ░ ░ ▒ ▒░▒░▒   ░    \n  ░  ░░ ░ ░ ░ ▒  ░    ░    \n  ░  ░  ░   ░ ░  ░         \n  ▄▄▄      ██▓███  ██▓███  \n ▒████▄   ▓██░  ██▓██░  ██▒\n ▒██  ▀█▄ ▓██░ ██▓▓██░ ██▓▒\n ░██▄▄▄▄██▒██▄█▓▒ ▒██▄█▓▒ ▒\n  ▓█   ▓██▒██▒ ░  ▒██▒ ░  ░\n  ▒▒   ▓▒█▒▓▒░ ░  ▒▓▒░ ░  ░\n   ▒   ▒▒ ░▒ ░    ░▒ ░     \n   ░   ▒  ░░      ░░       \n       ░  ░                      \n ᵦᵧ ᴅₐᵥᵢ𝓭 ᵣᵤₗₗáₙ ᴅíₐ𝆎 𝔀ᵢₜₕ ₗₒᵥₑ ;₎\n 𝖧ɑρρɣ ɕ𝗈ᑯ౿"

// FOR STRAPI INTEGRERATION

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