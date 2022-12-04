import { combineReducers } from './combineReducers'
import { sessionsReducer } from './sessions/sessions.reducer'
import { setUserReducer } from './user/user.reducer'

export const initialState: AppState = {
  data: {
    schedule: { groups: [] } as any,
    sessions: [],
    speakers: [],
    favorites: [],
    locations: [],
    allTracks: [],
    filteredTracks: [],
    mapCenterId: 0,
    menuEnabled: true,
    loading: false,
    filter: []
  },
  user: {
    id: 0,
    useremail: '',
    userDarkMode: false,
    isLoggedIn: false,
    hasSeenTutorial: false,
    loading: false,    
    userJwt: '',
    caret: undefined,
    role: undefined
  }
}

export const reducers = combineReducers({
  data: sessionsReducer,
  user: setUserReducer
})

export type AppState = ReturnType<typeof reducers>