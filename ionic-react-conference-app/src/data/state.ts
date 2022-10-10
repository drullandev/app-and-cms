import { combineReducers } from './combineReducers'
import { sessionsReducer } from './sessions/sessions.reducer'
import { userReducer } from './user/user.reducer'

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
    loading: false,
    menuEnabled: true
  },
  user: {
    id: 0,
    jwt: '',
    username: '',
    email: '',
    createdAt: '',
    updatedAt: '',
    blocked: true,
    confirmed: false,
    provider: '',
    darkMode: true,
    hasSeenTutorial: false,
    //
    loading: false,
    isLoggedin: false,
  }
}

export const reducers = combineReducers({
  data: sessionsReducer,
  user: userReducer
})

export type AppState = ReturnType<typeof reducers>