import { Plugins } from '@capacitor/core';
import { Schedule, Session } from '../models/Schedule';
import { Speaker } from '../models/Speaker';
import { Location } from '../models/Location';

const { Storage } = Plugins;

const dataUrl = '/assets/data/data.json';
const locationsUrl = '/assets/data/locations.json';

const HAS_LOGGED_IN = 'hasLoggedIn';
const HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
const USERNAME = 'username';
const JWT = 'jwt'
const BLOCKED = 'blocked'

export const getConfData = async () => {

  const response = await Promise.all([
    fetch(dataUrl),
    fetch(locationsUrl)]);

  const responseData = await response[0].json();
  const schedule = responseData.schedule[0] as Schedule;
  const sessions = parseSessions(schedule);
  const speakers = responseData.speakers as Speaker[];
  const locations = await response[1].json() as Location[];

  const allTracks = sessions
    .reduce((all, session) => all.concat(session.tracks), [] as string[])
    .filter((trackName, index, array) => array.indexOf(trackName) === index)
    .sort();

  const data = {
    schedule,
    sessions,
    locations,
    speakers,
    allTracks,
    filteredTracks: [...allTracks]
  }

  return data;

}

export const getUserData = async () => {

  const response = await Promise.all([
    Storage.get({ key: HAS_LOGGED_IN }),
    Storage.get({ key: HAS_SEEN_TUTORIAL }),
    Storage.get({ key: USERNAME }),
    Storage.get({ key: JWT }),
    Storage.get({ key: BLOCKED }),
  ]);

  const isLoggedin = await response[0].value === 'true';
  const hasSeenTutorial = await response[1].value === 'true';
  const username = await response[2].value || undefined;
  const jwt = await response[3].value || undefined;
  const blocked = await response[4].value === 'true';

  const data = {
    isLoggedin,
    hasSeenTutorial,
    username,
    jwt,
    blocked
  }

  return data;

}

export const setIsLoggedInData = async (isLoggedIn: boolean) => {
  await Storage.set({ key: HAS_LOGGED_IN, value: JSON.stringify(isLoggedIn) });
}

export const setHasSeenTutorialData = async (hasSeenTutorial: boolean) => {
  await Storage.set({ key: HAS_SEEN_TUTORIAL, value: JSON.stringify(hasSeenTutorial) });
}

export const setUsernameData = async (username?: string) => {
  if (!username) {
    await Storage.remove({ key: USERNAME });
  } else {
    await Storage.set({ key: USERNAME, value: username });
  }
}

export const setJwtData = async (jwt?: string) => {
  if (!jwt) {
    await Storage.remove({ key: JWT });
  } else {
    await Storage.set({ key: JWT, value: jwt });
  }
}

export const setBlockedData = async (blocked?: boolean) => {
  if (!blocked) {
    await Storage.remove({ key: BLOCKED });
  } else {
    await Storage.set({ key: BLOCKED, value: JSON.stringify(blocked) });
  }
}

function parseSessions(schedule: Schedule) {
  const sessions: Session[] = [];
  schedule.groups.forEach(g => {
    g.sessions.forEach(s => sessions.push(s))
  });
  return sessions;
}
