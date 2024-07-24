import DebugUtil from '../../../classes/DebugUtil'
import { UserActions } from './user.actions'
import { UserState } from './user.state'
import Logger from '../../../classes/LoggerClass';

const debug = DebugUtil.setDebug(true);

export function userReducer(state: UserState, action: UserActions): UserState {
  if (debug) Logger.log('userReducer', action.type, action)
  switch (action.type) {
    case 'set-id':                return { ...state, id:                action.id }
    case 'set-jwt':               return { ...state, jwt:               action.jwt }
    case 'set-session-id':        return { ...state, sessionId:         action.sessionId }
    case 'set-username':          return { ...state, username:          action.username }
    case 'set-email':             return { ...state, email:             action.email }
    case 'set-blocked':           return { ...state, blocked:           action.blocked }
    case 'set-confirmed':         return { ...state, confirmed:         action.confirmed }
    case 'set-created-at':        return { ...state, createdAt:         action.createdAt }
    case 'set-updated-at':        return { ...state, updatedAt:         action.updatedAt }
    case 'set-provider':          return { ...state, provider:          action.provider2 }
    case 'set-dark-mode':         return { ...state, darkMode:          action.darkMode }
    case 'set-has-seen-tutorial': return { ...state, hasSeenTutorial:   action.hasSeenTutorial }
    case 'set-is-loggedin':       return { ...state, isLoggedIn:        action.loggedIn }
    case 'set-user-loading':      return { ...state, loading:           action.isLoading }
    case 'set-caret':             return { ...state, caret:             action.caret }
    case 'set-role':              return { ...state, role:              action.role }
    case 'set-user-data':         return { ...state, ...action.data }
    default:                      return state
  }
}