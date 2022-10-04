import { getUserExtra } from '../dataApi'
import { ActionType } from '../../util/types'
import { ConfState } from './conf.state'

import { Filter } from '../../components/core/main/interfaces/Filter'

const testing = false

export const loadConfData = () => async (dispatch: React.Dispatch<any>) => {
  if(testing) console.log('session.actions.loadConfData')
  dispatch(setLoading(true))
  const data = await getUserExtra()
  dispatch(setData(data))
  dispatch(setLoading(false))
}

/*export const setSessAction = (type: string, value: any) => {
  if(testing) console.log('setSessAction::', type, value)
  return ({ type: type, value } as const)
}*/

export const setLoading = (isLoading: boolean) => {
  return ({ type: 'set-conf-loading', isLoading } as const)
}

export const setData = (data: Partial<ConfState>) => {
  return ({ type: 'set-conf-data', data } as const)
}

export const setMenuEnabled = (menuEnabled: boolean) => {
  return ({ type: 'set-menu-enabled', menuEnabled } as const)
}

export const updateFilteredTracks = (filteredTracks: string[]) => {
  return ({ type: 'update-filtered-tracks', filteredTracks } as const)
}

export const setSearchString = (searchString?: string) => {
  return ({ type: 'set-search-string', searchString } as const)
}

export const setSearchOrder = (searchOrder?: 'asc' | 'desc' | string) => {
  return ({ type: 'set-search-order', searchOrder } as const)
}

export const setOrderField = (orderField?: string) => {
  return ({ type: 'set-order-field', orderField } as const)
}

export const setFilter = (filter: Filter[]) => {
  return ({ type: 'set-filter', filter } as const)
}

export const setFilterDate = (filterDate?: string) => {
  return ({ type: 'set-filter-date', filterDate } as const)
}

// EXTRA FEATURES... (OBSOLETE)

export const addFavorite = (sessionId: number) => {
  return ({ type: 'add-favorite', sessionId } as const)
}

export const removeFavorite = (sessionId: number) => {
  return ({ type: 'remove-favorite', sessionId } as const)
}

export type SessionsActions =
  | ActionType<typeof setLoading>
  | ActionType<typeof setData>
  | ActionType<typeof setMenuEnabled>  
  | ActionType<typeof updateFilteredTracks>
  | ActionType<typeof setSearchString>
  | ActionType<typeof setSearchOrder>
  | ActionType<typeof setOrderField>
  | ActionType<typeof setFilter>
  | ActionType<typeof setFilterDate>  
  | ActionType<typeof addFavorite>
  | ActionType<typeof removeFavorite>