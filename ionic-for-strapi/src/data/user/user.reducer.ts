import * as AppConst from '../../static/constants'

import { UserActions } from './user.actions'
import { UserState } from './user.state'

const testing = false

export function setUserReducer(
  state: UserState,
  action: UserActions
) : UserState {

  if (testing) console.log('reducer.' + action.type)

  switch (action.type) {
    //
    case 'set-user-data':         return { ...state, ...action.data }    
    case 'set-user-loading':      return { ...state, loading:         action.isLoading }

    case 'set-user-id':           return { ...state, userId:          action.userId }
    case 'set-nickname':          return { ...state, nickname:        action.nickname }
    case 'set-user-email':        return { ...state, useremail:       action.email }
    case 'set-is-loggedin':       return { ...state, isLoggedIn:      action.loggedIn }
    case 'set-userJwt':           return { ...state, userJwt:         action.userJwt }
    case 'set-user-darkmode':     return { ...state, userDarkMode:    action.userDarkMode }
    //
    case 'set-has-seen-tutorial': return { ...state, hasSeenTutorial: action.hasSeenTutorial }
  }

}
