import { combineReducers } from './src/combineReducers';
import { sessionsReducer } from './data/sessions/sessions.reducer';
import { userReducer } from './data/user/user.reducer';

// Initial state for data related to schedule, sessions, speakers, etc.
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
};

// Initial state for user-related data
export const initialUser = {
  id: '0',
  jwt: '',
  sessionId: undefined,
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
  caret: undefined,
  role: undefined
};

// Combined initial state of the application
export const initialState: AppState = {
  data: initialData,
  user: initialUser
};

// Combine reducers for both data and user state
export const reducers = combineReducers({
  data: sessionsReducer, // Reducer for data related to sessions
  user: userReducer // Reducer for user-specific state
});

// Define the application state type based on reducers
export type AppState = ReturnType<typeof reducers>;
