import { combineReducers } from 'redux'
import { sessionsReducer } from './sessions/sessions.reducer'
import { setUserReducer } from './user/user.reducer'

export const initialState: AppState = {
  /*data: {
    schedule: { groups: [] } as any,
    sessions: [],
    speakers: [],
    favorites: [],
    locations: [],
    allTracks: [],
    filteredTracks: [],
    mapCenterId: 0,
    //menuEnabled: true,
    loading: false,
  },*/
  /**
     {
    'jwt': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEsImlhdCI6MTYzNTExMTM0MCwiZXhwIjoxNjM3NzAzMzQwfQ.Z9hoSs-EgQV4IXDn_KhppRaDIeKD4PFtAlX6TaUzP-M',
    'user': {
        'id': 21,
        'username': 'qy4tw098er',
        'email': '87079yui.0v@gmail.com',
        'provider': 'local',
        'confirmed': true,
        'blocked': null,
        'role': {
            'id': 1,
            'name': 'Subscribed',
            'description': 'Default role given to authenticated user.',
            'type': 'authenticated',
            'path': 16
        },
        'created_at': '2021-10-24T21:35:41.000Z',
        'updated_at': '2021-10-24T21:35:41.000Z',
        'hasSeenTutorial': null,
        'userDarkMode': null,
        'acceptedTerms': null,
        'acceptedPrivacyPolicy': null,
        'avatar': null
    }
   */
  user: {
    id: 0,
    email: '',
    : false,
    isLoggedIn: false,
    hasSeenTutorial: false,
    //loading: false,    
    userJwt: '',
  }
}


export const reducers = combineReducers({
  //data: sessionsReducer,
  user: setUserReducer
})

export type AppState = ReturnType<typeof reducers>