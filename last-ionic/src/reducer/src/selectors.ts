import { createSelector } from 'reselect';
import { Schedule, Session, ScheduleGroup } from '../models/Schedule';
import { Speaker } from '../models/Speaker';
import { Location } from '../models/Location';
import { AppState } from '../state';

// Selector functions to retrieve specific parts of the state
const getSchedule = (state: AppState) => state.data.schedule;
export const getSpeakers = (state: AppState) => state.data.speakers;
const getSessions = (state: AppState) => state.data.sessions;
const getFilteredTracks = (state: AppState) => state.data.filteredTracks;
const getFavoriteIds = (state: AppState) => state.data.favorites;
const getSearchText = (state: AppState) => state.data.searchText;

// Selector to filter the schedule based on selected tracks
export const getFilteredSchedule = createSelector(
  getSchedule,
  getFilteredTracks,
  (schedule, filteredTracks) => {
    const groups: ScheduleGroup[] = [];

    schedule.groups.forEach((group: ScheduleGroup) => {
      const sessions: Session[] = [];

      group.sessions.forEach(session => {
        session.tracks.forEach(track => {
          if (filteredTracks.includes(track)) {
            sessions.push(session);
          }
        });
      });

      if (sessions.length > 0) {
        const groupToAdd: ScheduleGroup = {
          time: group.time,
          sessions
        };
        groups.push(groupToAdd);
      }
    });

    return {
      date: schedule.date,
      groups
    } as Schedule;
  }
);

// Selector to search sessions within the filtered schedule
export const getSearchedSchedule = createSelector(
  getFilteredSchedule,
  getSearchText,
  (schedule, searchText) => {
    if (!searchText) {
      return schedule;
    }

    const groups: ScheduleGroup[] = [];

    schedule.groups.forEach(group => {
      const sessions = group.sessions.filter(s => s.name.toLowerCase().includes(searchText.toLowerCase()));
      if (sessions.length > 0) {
        const groupToAdd: ScheduleGroup = {
          time: group.time,
          sessions
        };
        groups.push(groupToAdd);
      }
    });

    return {
      date: schedule.date,
      groups
    } as Schedule;
  }
);

// Selector to get the final schedule list
export const getScheduleList = createSelector(
  getSearchedSchedule,
  (schedule) => schedule
);

// Selector to group favorite sessions
export const getGroupedFavorites = createSelector(
  getScheduleList,
  getFavoriteIds,
  (schedule, favoriteIds) => {
    const groups: ScheduleGroup[] = [];

    schedule.groups.forEach(group => {
      const sessions = group.sessions.filter(s => favoriteIds.includes(s.id));
      if (sessions.length > 0) {
        const groupToAdd: ScheduleGroup = {
          time: group.time,
          sessions
        };
        groups.push(groupToAdd);
      }
    });

    return {
      date: schedule.date,
      groups
    } as Schedule;
  }
);

// Selector to retrieve the ID parameter from props
const getIdParam = (_state: AppState, props: any) => props.match.params['id'];

// Selector to retrieve a session by ID
export const getSession = createSelector(
  getSessions,
  getIdParam,
  (sessions, id) => sessions.find((s: Session) => s.id === id)
);

// Selector to retrieve a speaker by ID
export const getSpeaker = createSelector(
  getSpeakers,
  getIdParam,
  (speakers, id) => speakers.find((x: Speaker) => x.id === id)
);

// Selector to group sessions by speaker name
export const getSpeakerSessions = createSelector(
  getSessions,
  (sessions) => {
    const speakerSessions: { [key: string]: Session[] } = {};

    sessions.forEach((session: Session) => {
      session.speakerNames && session.speakerNames.forEach(name => {
        if (speakerSessions[name]) {
          speakerSessions[name].push(session);
        } else {
          speakerSessions[name] = [session];
        }
      });
    });

    return speakerSessions;
  }
);

// Selector to retrieve the map center location
export const mapCenter = (state: AppState) => {
  const item = state.data.locations.find((l: Location) => l.id === state.data.mapCenterId);
  if (!item) {
    // Default location if map center ID does not match any location
    return {
      id: 1,
      name: 'Map Center',
      lat: 43.071584,
      lng: -89.380120
    } as Location;
  }
  return item;
};
