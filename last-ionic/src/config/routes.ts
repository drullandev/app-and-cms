// This way was an awsome one!
import i18n from 'i18next'
import { keyTrans } from '../classes/i18nextClass'
import * as icon from 'ionicons/icons'

// TODO: MOVE TO A ENV FILE OR SOMETHING!!!

export const all = import.meta.env

export const routes = { //TODO: Unificar en archivo de configuración con todo esto,,,

  appPages: [
    { title: 'Schedule', path: '/tabs/schedule', icon: icon.calendarOutline },
    { title: 'Speakers', path: '/tabs/speakers', icon: icon.peopleOutline },
    { title: 'Map', path: '/tabs/map', icon: icon.mapOutline }, // Not for now...
    { title: 'About', path: '/tabs/about', icon: icon.informationCircleOutline }
  ],

  loggedInPages: [
    { title: 'Account', path: '/account', icon: icon.person },
    { title: 'Reset Pass', path: '/reset', icon: icon.person },
    { title: 'Support', path: '/support', icon: icon.help },
    { title: 'Logout', path: '/logout', icon: icon.logOut }
  ],

  loggedOutPages: [
    { title: 'Login', path: '/login', icon: icon.logIn },
    { title: 'Recover', path: '/recover', icon: icon.person },
    { title: 'Signup', path: '/sign-up', icon: icon.personAdd },
    { title: 'Support', path: '/support', icon: icon.help },
  ]
  
};