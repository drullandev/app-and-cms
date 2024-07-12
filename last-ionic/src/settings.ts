// This way was an awsome one!
import i18n from 'i18next'
import { keyTrans } from './classes/i18nextClass'
import * as icon from 'ionicons/icons'

export const all = import.meta.env

export const debug = import.meta.env.REACT_APP_TESTING ?? true

// The default PWA values...
export const appName = 'AppTestForm'
export const appIcon = 'assets/icon/transp-icon-512.png'

// The default language for the app
export const DefaultLanguage = 'en'

// MAIN DATA

// The expected local url off the app
const publicUrlDefault = 'http://localhost:5173'

// The main cms url for the app
const apiUrlDefault = 'https://cms.hoponboard.eu'

// The node encvironment: development | production
const nodeEnvDefault = 'development'

// If u use maobox, this is a key!...
//const mapboxKeyDefault = "pk.eyJ1IjoiZHJ1bGxhbiIsImEiOiJja2l4eDBpNWUxOTJtMnRuejE1YWYyYThzIn0.y7nuRLnfl72qFp2Rq06Wlg"
const allowedDomainsDefault = ['localhost:8100', 'localhost:3000', 'localhost:5173']

const asciiArtDefault = "  ██░ ██ ▒█████  ▄▄▄▄      \n ▓██░ ██▒██▒  ██▓█████▄    \n ▒██▀▀██▒██░  ██▒██▒ ▄██   \n ░▓█ ░██▒██   ██▒██░█▀     \n ░▓█▒░██░ ████▓▒░▓█  ▀█▓   \n  ▒ ░░▒░░ ▒░▒░▒░░▒▓███▀▒   \n  ▒ ░▒░ ░ ░ ▒ ▒░▒░▒   ░    \n  ░  ░░ ░ ░ ░ ▒  ░    ░    \n  ░  ░  ░   ░ ░  ░         \n  ▄▄▄      ██▓███  ██▓███  \n ▒████▄   ▓██░  ██▓██░  ██▒\n ▒██  ▀█▄ ▓██░ ██▓▓██░ ██▓▒\n ░██▄▄▄▄██▒██▄█▓▒ ▒██▄█▓▒ ▒\n  ▓█   ▓██▒██▒ ░  ▒██▒ ░  ░\n  ▒▒   ▓▒█▒▓▒░ ░  ▒▓▒░ ░  ░\n   ▒   ▒▒ ░▒ ░    ░▒ ░     \n   ░   ▒  ░░      ░░       \n       ░  ░                      \n ᵦᵧ ᴅₐᵥᵢ𝓭 ᵣᵤₗₗáₙ ᴅíₐ𝆎 𝔀ᵢₜₕ ₗₒᵥₑ ;₎\n 𝖧ɑρρɣ ɕ𝗈ᑯ౿"

// The exported constants...
export const publicUrl  = import.meta.env.REACT_APP_PUBLIC_URL ?? publicUrlDefault
export const apiUrl     = import.meta.env.REACT_APP_API_URL ?? apiUrlDefault
export const nodeEnv    = import.meta.env.REACT_APP_NODE_ENV ?? nodeEnvDefault
export const allowedDomains = import.meta.env.REACT_APP_ALLOWED_DOMAINS ? import.meta.env.REACT_APP_ALLOWED_DOMAINS?.split('|') : allowedDomainsDefault
export const asciiArt   = import.meta.env.REACT_APP_PROJECT_ASCIIART ?? asciiArtDefault
//export const mapboxKey  = import.meta.env.REACT_APP_MAPBOX_KEY ?? mapboxKeyDefault


// Strapi: Images sizes
export const imgSizes = ['thumbnail', 'small', 'medium', 'large']






















// Strapi images location
export const apiUploads = apiUrlDefault + '/uploads/'

// Local assets o.o!
export const appAssets = publicUrl + '/assets/'

// This is the list of available langs, also the prior order along app.
export const langsPriority = ['en', 'es', 'de', 'fr']


// PROVISIONAL:: //TODO
export const translations = keyTrans

// Must come from assets, 'im pretty sure mmmm 

// TODO: try to verfy why it gets throw, from where and why!!!
export const appIconSplash = appAssets + 'icon_hob_f8df2ad0d3.png'
const shareIcon = apiUploads + 'IMG_BC_665869_B3_D7_1_94e9c07314.jpeg'
const addToHomeScreenIcon = apiUploads + 'Imagen_PNG_31ebb6323a.png'
const selectAddToHomeScreenIcon = apiUploads + 'instructt3_9278a46ae6.png'

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

export const homeHref = '/menu/home'
export const homeMenu = '/menu/'
export const accessHref = '/access'
export const trainYourself = 'train-yourself' // Main after home!!

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







// Cors seted: none!!
export const corsSetted = false

// App main user data!!
export const appSuperUser = 'system-app-user@maindomain.xyz'
export const appSuperPass = 'Qwer1234'

// The origin of backoffice stuff for the app
export const MyIP = 'localhost'

// MAIN DEFAULTS !!

export const RestAPI = 'http://' + MyIP + ':1337'
export const RestStorage = RestAPI
export const PHOTO_STORAGE = RestAPI + '/uploads'

export const pagesOrigin = RestAPI + '/forms?slug='
export const formsOrigin = RestAPI + '/forms?slug='
export const fieldsOrigin = RestAPI + '/fields?slug='
export const menusOrigin = RestAPI + '/menus?slug='

// OVERRIDE FROM THE CMS!!!! TODO TODO TODO TODO

export const HOME = '/tabs/schedule'
export const ADD_DATA = '/add-user-data'
export const APP_ICON = '/add-user-data'
export const TUTORIAL = '/tutorial'
export const LOGIN = '/login'

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

export const commonFilter = { // Todo: MOVER A LO DE GRAPHQL
  order : {
    default: 'desc',
    options: [ 
      {
        label: 'Descendant',
        value: 'desc'
      },{
        label: 'Ascendant',
        value: 'asc',
      }
    ]
  },
  fields: {
    default: 'published_at',
    options: [
      {
        label: 'Published at',
        value: 'published_at',
        type: 'date'
      },{
        label: 'Created at',
        value: 'created_at',
        type: 'date'
      },{
        label: 'Updated at',
        value: 'updated_at',
        type: 'date'
      },{
        label: 'Content',
        value: 'content',
        type: 'string'
      }
    ]    
  },
  conditions: {
    default: 'contains',
    options: [
      {
        label: 'Distinct',
        value: 'ne',
        families: ['all']
      },
      {
        label: 'Lower than',
        value: 'lt',
        families: ['all']
      },
      {
        label: 'Lower or equal',
        value: 'lte',
        families: ['all']
      },
      {
        label: 'Greater than',
        value: 'gt',
        families: ['all']
      },
      {
        label: 'Greater or equal',
        value: 'gte',
        families: ['all']
      },
      {
        label: 'Contains',
        value: 'contains',
        families: ['all']
      },
      {
        label: 'Contains sensitive',
        value: 'containss',
        families: ['all']
      },
      {
        label: 'No Contains',
        value: 'ncontains',
        families: ['all']
      },
      {
        label: 'No Contains sensitive',
        value: 'ncontainss',
        families: ['all']
      },
      {
        label: 'In',
        value: 'in',
        families: ['array']
      },
      {
        label: 'Not in',
        value: 'nin',
        families: ['array'] 
      },
      {
        label: 'Equals null',
        value: 'null',
        families: []
      },
      {
        label: 'Not equals null',
        value: 'nnull',
        families: []
      }
    ]
  }
}

export const dataUrl           = '/assets/data/data.json'
export const locationsUrl      = '/assets/data/locations.json'

export const messages = {//TODO: ADD!!
  'Auth.form.error.invalid'           : { message: 'Identifier or password invalid.' },
  'Auth.form.error.email.provide'     : { message: 'Please provide your username or your e-mail.' },
  'Auth.form.error.password.provide'  : { message: 'Please provide your password.' },
  'Auth.form.error.username.taken'    : { message: 'Username already taken' }
}
