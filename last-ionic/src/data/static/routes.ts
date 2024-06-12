import * as icon from 'ionicons/icons'

let testingFeature = true
let testing = testingFeature && import.meta.env.REACT_APP_TESTING

export const routes = {    
  appPages: [
    //{ title: 'Schedule', path: '/tabs/schedule', icon: calendarOutline },
    //{ title: 'Speakers', path: '/tabs/speakers', icon: peopleOutline },
    //{ title: 'Map', path: '/tabs/map', icon: mapOutline }, // Not for now...
    //{ title: 'About', path: '/tabs/about', icon: informationCircleOutline }
  ],
  loggedInPages: [
    //{ title: 'Account', path: '/account', icon: icon.person },
    //{ title: 'Reset Pass', path: '/reset', icon: icon.person },
    //{ title: 'Support', path: '/support', icon: help },
    //{ title: 'Logout', path: '/logout', icon: icon.logOut }
  ],
  loggedOutPages: [
    { title: 'Login', path: '/login', icon: icon.logIn },
    //{ title: 'Recover', path: '/recover', icon: icon.person },
    //{ title: 'Support', path: '/support', icon: icon.help },
    //{ title: 'Signup', path: '/sign-up', icon: icon.personAdd }
  ]
}