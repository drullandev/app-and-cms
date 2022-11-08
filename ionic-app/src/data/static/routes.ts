import {
  //informationCircleOutline,
  logIn,
  logOut,
  person,
  personAdd
} from 'ionicons/icons'

export const routes = {    
    appPages: [
      //{ title: 'Schedule', path: '/tabs/schedule', icon: calendarOutline },
      //{ title: 'Speakers', path: '/tabs/speakers', icon: peopleOutline },
      //{ title: 'Map', path: '/tabs/map', icon: mapOutline }, // Not for now...
      //{ title: 'About', path: '/tabs/about', icon: informationCircleOutline }
    ],
    loggedInPages: [
      { title: 'Account', path: '/account', icon: person },
      { title: 'Reset Pass', path: '/reset', icon: person },
      //{ title: 'Support', path: '/support', icon: help },
      { title: 'Logout', path: '/logout', icon: logOut }
    ],
    loggedOutPages: [
      { title: 'Login', path: '/login', icon: logIn },
      { title: 'Recover', path: '/recover', icon: person },
      //{ title: 'Support', path: '/support', icon: help }, // I will move to account
      { title: 'Signup', path: '/signup', icon: personAdd }
    ]
  }