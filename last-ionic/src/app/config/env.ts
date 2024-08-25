// This way was an awsome one!
import i18n from 'i18next'
import { keyTrans } from '../../classes/utils/TranslationUtils'
import * as icon from 'ionicons/icons'

export const all = import.meta.env


// The default PWA values...
export const appName = 'AppTestForm'
export const appIcon = 'assets/icon/transp-icon-512.png'

// The exported constants...
export const debug      = import.meta.env.REACT_APP_TESTING ?? true

// URLS
export const publicUrl  = import.meta.env.REACT_APP_PUBLIC_URL ?? 'http://localhost:3000';
export const apiUrl     = import.meta.env.REACT_APP_API_URL ?? 'http://localhost:1337/api'

export const nodeEnv    = import.meta.env.REACT_APP_NODE_ENV ?? 'development'

export const defaultLanguage = import.meta.env.REACT_APP_DEFAULT_LANG ?? 'en';

export const supportedLanguages = import.meta.env.REACT_APP_SUPPORTED_LANGS 
  ? import.meta.env.REACT_APP_SUPPORTED_LANGS?.split('|')
  : ['en', 'es'];

// This is the list of available langs, also the prior order along app.
export const langsPriority = import.meta.env.REACT_APP_LANGS_PRIORITY 
  ? import.meta.env.REACT_APP_LANGS_PRIORITY?.split('|')
  : ['en', 'es'];

export const allowedDomains = import.meta.env.REACT_APP_ALLOWED_DOMAINS 
  ? import.meta.env.REACT_APP_ALLOWED_DOMAINS?.split('|')
  : ['localhost:8100', 'localhost:3000', 'localhost:5173'];

export const asciiArt   = import.meta.env.REACT_APP_PROJECT_ASCIIART 
  ?? "  ██░ ██ ▒█████  ▄▄▄▄      \n ▓██░ ██▒██▒  ██▓█████▄    \n ▒██▀▀██▒██░  ██▒██▒ ▄██   \n ░▓█ ░██▒██   ██▒██░█▀     \n ░▓█▒░██░ ████▓▒░▓█  ▀█▓   \n  ▒ ░░▒░░ ▒░▒░▒░░▒▓███▀▒   \n  ▒ ░▒░ ░ ░ ▒ ▒░▒░▒   ░    \n  ░  ░░ ░ ░ ░ ▒  ░    ░    \n  ░  ░  ░   ░ ░  ░         \n  ▄▄▄      ██▓███  ██▓███  \n ▒████▄   ▓██░  ██▓██░  ██▒\n ▒██  ▀█▄ ▓██░ ██▓▓██░ ██▓▒\n ░██▄▄▄▄██▒██▄█▓▒ ▒██▄█▓▒ ▒\n  ▓█   ▓██▒██▒ ░  ▒██▒ ░  ░\n  ▒▒   ▓▒█▒▓▒░ ░  ▒▓▒░ ░  ░\n   ▒   ▒▒ ░▒ ░    ░▒ ░     \n   ░   ▒  ░░      ░░       \n       ░  ░                      \n ᵦᵧ ᴅₐᵥᵢ𝓭 ᵣᵤₗₗáₙ ᴅíₐ𝆎 𝔀ᵢₜₕ ₗₒᵥₑ ;₎\n 𝖧ɑρρɣ ɕ𝗈ᑯ౿"

export const mapboxKey = import.meta.env.REACT_APP_MAPBOX_KEY
  ?? "pk.eyJ1IjoiZHJ1bGxhbiIsImEiOiJja2l4eDBpNWUxOTJtMnRuejE1YWYyYThzIn0.y7nuRLnfl72qFp2Rq06Wlg"

  

// FOR STRAPI INTEGRERATION

// Strapi image sizes names
export const imgSizes = ['thumbnail', 'small', 'medium', 'large'];// TODO: Move to a interface or model related with this images kind!!

// Strapi images location
export const apiUploads = apiUrl + '/uploads/'

// Local assets o.o!
export const appAssets = publicUrl + '/assets/'

// PROVISIONAL:: //TODO: Improve somhow!!
export const translations = keyTrans


// TODO: try to verfy why it gets throw, from where and why!!!
export const appIconSplash = appAssets + ''
const shareIcon = apiUploads + ''
const addToHomeScreenIcon = apiUploads + ''
const selectAddToHomeScreenIcon = apiUploads + ''

export const addToHomeScreenImages = [
  {
    src: shareIcon,
    alt: i18n.t('Tap the Share Icon'),
  },
  {
    src: addToHomeScreenIcon,
    alt: i18n.t('We are adding to homescreen...'),
  },
  {
    src: selectAddToHomeScreenIcon,
    alt: i18n.t("Select 'Add to home screen' entry!"),
  },
]

// TESTING PURPOSES!!!
export const loadingTime = 400

export const splashScreen = {
  showDuration: 4000,
  autoHide: true
}

export const fadeVelocity = 300

// Map style and basics
// export const style = {
//   'map' : {
//     'height': '95vh' ,
//     'width': '100wh',
//   },
//   'routes' : {
//     'height': '105vw',
//     'width': '100vh',
//     'scrollWheelZoom' :false,
//     'zoomControl' : false,
//   },
//   'polyLine' : { fillColor: '#a2a2a2' },
//   'polygon' : { fillColor: 'red' },
// }

// // TODO: verify best origin
// export const placeMarkerDefault = apiUploads + 'PICTURESQUE_ICON_3_352a635ea5.svg'

// export const mapStyle = 'mapbox://styles/mapbox/streets-v11?optimize=true'

// export const mapAttribution="Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>"

// export const mapTiles = {
//   'basic': 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
//   'customized': 'https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=3Vi6kgEIpBCTF4mZBN8z',
//   'mapbox': 'https://api.mapbox.com/styles/v1/drullan/ckqbpu0ia03ve17o4278zpw3f/tiles/256/{z}/{x}/{y}@2x?access_token='+mapboxKey
// }

// The origin of backoffice stuff for the app
export const MyIP = 'localhost'

// MAIN DEFAULTS !!

export const RestStorage = apiUrl
export const PHOTO_STORAGE = apiUrl + '/uploads'

export const pagesOrigin = apiUrl + '/forms?slug='
export const formsOrigin = apiUrl + '/forms?slug='
export const fieldsOrigin = apiUrl + '/fields?slug='
export const menusOrigin = apiUrl + '/menus?slug='

// OVERRIDE FROM THE CMS!!!! TODO TODO TODO TODO

export const HOME_PATH = '/tabs/schedule'
export const ADD_DATA = '/add-user-data'
export const APP_ICON = '/add-user-data'

export const TUTORIAL = '/tutorial'
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

export const dataUrl           = '/assets/data/data.json'
export const locationsUrl      = '/assets/data/locations.json'

export const messages = {//TODO: ADD!!
  'Auth.form.error.invalid'           : { message: 'Identifier or password invalid.' },
  'Auth.form.error.email.provide'     : { message: 'Please provide your username or your e-mail.' },
  'Auth.form.error.password.provide'  : { message: 'Please provide your password.' },
  'Auth.form.error.username.taken'    : { message: 'Username already taken' }
}
