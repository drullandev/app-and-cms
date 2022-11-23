import { combineReducers } from './combineReducers'
import { sessionsReducer } from './sessions/sessions.reducer'
import { userReducer } from './user/user.reducer'

export const initialData = {
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
}

export const initialUser = {
  id: '',
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
  loading: false,
  isLoggedIn: false,
  caret: undefined
}

export const initialState: AppState = {
  data: initialData,
  user: initialUser
}

export const reducers = combineReducers({
  data: sessionsReducer,
  user: userReducer
})

export type AppState = ReturnType<typeof reducers>