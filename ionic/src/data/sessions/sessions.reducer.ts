import { SessionsActions } from './sessions.actions'
import { ConfState } from './conf.state'

export const sessionsReducer = (state: ConfState, action: SessionsActions): ConfState => {
  switch (action.type) {
    case 'set-conf-loading': {
      return { ...state, loading: action.isLoading }
    }
    case 'set-conf-data': {
      return { ...state, ...action.data }
    }
    case 'add-favorite': {
      return { ...state, favorites: [...(state.favorites), action.sessionId] }
    }
    case 'remove-favorite': {
      return { ...state, favorites: [...(state.favorites).filter(x => x !== action.sessionId)] }
    }
    case 'update-filtered-tracks': {
      return { ...state, filteredTracks: action.filteredTracks }
    }
    case 'set-search-string': {
      return { ...state, searchString: action.searchString }
    }
    case 'set-search-order': {
      return { ...state, searchOrder: action.searchOrder }
    }
    case 'set-order-field': {
      return { ...state, orderField: action.orderField }
    }
    case 'set-filter': {
      return { ...state, filter: action.filter }
    }
    case 'set-filter-date': {
      return { ...state, filterDate: action.filterDate }
    }
    case 'set-menu-enabled': {
      return { ...state, menuEnabled: action.menuEnabled }
    }
  }
}