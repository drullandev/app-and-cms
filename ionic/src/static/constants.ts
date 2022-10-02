// The default language for the app
export const DefaultLanguage = 'en'

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

export const HOME = '/tabs/main'
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
}

export const paginator = {
  'size' : 8
}

export const filter = {
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

export const messages = {
  'Auth.form.error.invalid'           : { message: 'Identifier or password invalid.' },
  'Auth.form.error.email.provide'     : { message: 'Please provide your username or your e-mail.' },
  'Auth.form.error.password.provide'  : { message: 'Please provide your password.' },
  'Auth.form.error.username.taken'    : { message: 'Username already taken' }
}
