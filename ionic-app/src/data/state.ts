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
  caret: {
    "id": 3,
    "name": "20994063_10212694604776796_9209620538560239229_n.jpeg",
    "alternativeText": "20994063_10212694604776796_9209620538560239229_n.jpeg",
    "caption": "20994063_10212694604776796_9209620538560239229_n.jpeg",
    "width": 816,
    "height": 816,
    "formats": {
      "thumbnail": {
        "name": "thumbnail_20994063_10212694604776796_9209620538560239229_n.jpeg",
        "hash": "thumbnail_20994063_10212694604776796_9209620538560239229_n_070aab4e6d",
        "ext": ".jpeg",
        "mime": "image/jpeg",
        "path": null,
        "width": 156,
        "height": 156,
        "size": 7.95,
        "url": "/uploads/thumbnail_20994063_10212694604776796_9209620538560239229_n_070aab4e6d.jpeg"
      },
      "small": {
        "name": "small_20994063_10212694604776796_9209620538560239229_n.jpeg",
        "hash": "small_20994063_10212694604776796_9209620538560239229_n_070aab4e6d",
        "ext": ".jpeg",
        "mime": "image/jpeg",
        "path": null,
        "width": 500,
        "height": 500,
        "size": 65.81,
        "url": "/uploads/small_20994063_10212694604776796_9209620538560239229_n_070aab4e6d.jpeg"
      },
      "medium": {
        "name": "medium_20994063_10212694604776796_9209620538560239229_n.jpeg",
        "hash": "medium_20994063_10212694604776796_9209620538560239229_n_070aab4e6d",
        "ext": ".jpeg",
        "mime": "image/jpeg",
        "path": null,
        "width": 750,
        "height": 750,
        "size": 138.88,
        "url": "/uploads/medium_20994063_10212694604776796_9209620538560239229_n_070aab4e6d.jpeg"
      }
    },
    "hash": "20994063_10212694604776796_9209620538560239229_n_070aab4e6d",
    "ext": ".jpeg",
    "mime": "image/jpeg",
    "size": 128,
    "url": "/uploads/20994063_10212694604776796_9209620538560239229_n_070aab4e6d.jpeg",
    "previewUrl": null,
    "provider": "local",
    "provider_metadata": null,
    "createdAt": "2022-11-23T23:15:18.530Z",
    "updatedAt": "2022-11-23T23:15:18.530Z"
  }
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