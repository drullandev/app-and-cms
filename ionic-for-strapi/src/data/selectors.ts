import { createSelector } from 'reselect'
import { Home, Session, HomeGroup } from '../models/Schedule'
import { AppState } from './state'

const getHome = (state: AppState) => {
  return state.data.schedule
}

export const getSpeakers = (state: AppState) => state.data.speakers

const getSessions = (state: AppState) => state.data.sessions

const getFilteredTracks = (state: AppState) => state.data.filteredTracks

const getFavoriteIds = (state: AppState) => state.data.favorites

const getSearchText = (state: AppState) => state.data.searchString

const getSearchOrder = (state: AppState) => state.data.searchOrder

const getOrderField = (state: AppState) => state.data.orderField

export const getFilteredHome = createSelector(

  getHome, getFilteredTracks,

  (schedule, filteredTracks) => {
    const groups: HomeGroup[] = []
    schedule.groups.forEach((group:any) => {
      const sessions: Session[] = []
      group.sessions.forEach((session:any) => {
        session.tracks.forEach((track:any) => {
          if (filteredTracks.indexOf(track) > -1) {
            sessions.push(session)
          }
        })
      })
      if (sessions.length) {
        const groupToAdd: HomeGroup = {
          time: group.time,
          sessions
        }
        groups.push(groupToAdd)
      }
    })

    return {
      date: schedule.date,
      groups
    } as Home
  }
  
)

export const getSearchedHome = createSelector(
  getFilteredHome, getSearchText,
  (schedule, searchString) => {
    if (!searchString) {
      return schedule
    }
    const groups: HomeGroup[] = []
    schedule.groups.forEach((group:any) => {

      const sessions = group.sessions.filter((s:any) => s.name.toLowerCase().indexOf(searchString.toLowerCase()) > -1)
      if (sessions.length) {
        const groupToAdd: HomeGroup = {
          time: group.time,
          sessions
        }
        groups.push(groupToAdd)
      }
    })
    return {
      date: schedule.date,
      groups
    } as Home
  }
)

export const getHomeList = createSelector(
  getSearchedHome,
  (schedule) => schedule
)

export const getGroupedFavorites = createSelector(
  getHomeList, getFavoriteIds,
  (schedule, favoriteIds) => {
    const groups: HomeGroup[] = []
    schedule.groups.forEach((group:any) => {
      const sessions = group.sessions.filter((s:any) => favoriteIds.indexOf(s.id) > -1)
      if (sessions.length) {
        const groupToAdd: HomeGroup = {
          time: group.time,
          sessions
        }
        groups.push(groupToAdd)
      }
    })
    return {
      date: schedule.date,
      groups
    } as Home
  }
)

const getIdParam = (_state: AppState, props: any) => {
  return props.match.params['id']
}

export const getSession = createSelector(
  getSessions, getIdParam,
  (sessions, id) => {
    return sessions.find(s => s.id === id)
  }
)

export const getSpeaker = createSelector(
  getSpeakers, getIdParam,
  (speakers, id) => speakers.find(x => x.id === id)
)

export const getSpeakerSessions = createSelector(
  getSessions,
  (sessions) => {
    const speakerSessions: { [key: string]: Session[] } = {}

    sessions.forEach(session => {
      session.speakerNames && session.speakerNames.forEach(name => {
        if (speakerSessions[name]) {
          speakerSessions[name].push(session)
        } else {
          speakerSessions[name] = [session]
        }
      })
    })
    return speakerSessions
  }
)

export const mapCenter = (state: AppState) => {
  const item = state.data.locations.find(l => l.id === state.data.mapCenterId)
  if (item == null) {
    return {
      id: 1,
      name: 'Map Center',
      lat: 43.071584,
      lng: -89.380120
    }
  }
  return item
}
