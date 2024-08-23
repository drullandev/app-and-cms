import create from 'zustand';
import { Preferences } from '@capacitor/preferences';
import { Schedule, Session, ScheduleGroup } from '../models/Schedule';
import { Speaker } from '../models/Speaker';
import { Location } from '../models/Location';
import { parseSessions } from '../classes/utils/DataUtils';
import {
  BLOCKED,
  CARET,
  CONFIRMED,
  CREATED_AT,
  DARK_MODE,
  dataUrl,
  EMAIL,
  HAS_LOGGED_IN,
  HAS_SEEN_TUTORIAL,
  ID,
  JWT,
  locationsUrl,
  PROVIDER,
  ROLE,
  SESSION_ID,
  UPDATED_AT,
  USERNAME
} from './constants';
import Logger from '../classes/LoggerClass';
import DebugUtil from '../classes/utils/DebugUtil';

const debug = DebugUtil.setDebug(false);

// Define la interfaz del estado del usuario
interface UserState {
  id: string;
  jwt?: string;
  sessionId?: string;
  username?: string;
  email?: string;
  blocked: boolean;
  confirmed: boolean;
  created_at?: string;
  updated_at?: string;
  provider?: string;
  darkMode: boolean;
  hasSeenTutorial: boolean;
  isLoggedIn: boolean;
  caret?: string;
  role?: string;
}

// Define la interfaz del estado de la conferencia
export interface ConfState {
  schedule: Schedule;
  sessions: Session[];
  session: Session;
  speaker: Speaker;
  speakers: Speaker[];
  favorites: number[];
  locations: Location[];
  filterDate?: string;
  filteredTracks: string[];
  searchText?: string;
  searchString?: string;
  mapCenterId?: number;
  orderField: string;
  filter: string;
  searchOrder?: string;
  loading: boolean;
  allTracks: string[];
  menuEnabled: boolean;
  favoriteSessions: number[];
  favoritesSchedule?: Schedule;
  speakerSessions: Session[];
}

// Define la interfaz del store con Zustand
interface StoreState extends UserState, ConfState {
  setUserState: (user: Partial<UserState>) => void;
  setConfState: (conf: Partial<ConfState>) => void;
  loadConfData: () => Promise<void>;
  loadUserData: () => Promise<void>;

  // Setters
  setData: (data: Partial<UserState>) => void;
  setIsLogged: (loggedIn: boolean) => void;
  setId: (id?: string) => void;
  setJwt: (jwt?: string) => void;
  setSessionId: (sessionId?: string) => void;
  setUsername: (username?: string) => void;
  setEmail: (email?: string) => void;
  setBlocked: (blocked?: boolean) => void;
  setConfirmed: (confirmed?: boolean) => void;
  setCreatedAt: (createdAt?: string) => void;
  setUpdatedAt: (updatedAt?: string) => void;
  setProvider: (provider2?: string) => void;
  toogleDarkMode: () => void;
  setHasSeenTutorial: (hasSeenTutorial: boolean) => void;
  setCaret: (caret: string) => void;
  setRole: (role: string) => void;
  setLoading: (loading: boolean) => void;
  getConfData: () => object;
  // Selectors as functions
  getFilteredSchedule: () => Schedule;
  getSearchedSchedule: () => Schedule;
  getScheduleList: () => Schedule;
  getScheduleItem: (id: number) => Session | undefined;
  getSpeaker: (id: number) => Speaker | undefined;
  getSpeakerSessions: () => { [key: string]: Session[] };
  mapCenter: () => Location;
  getGroupedFavorites: () => Schedule;
  getFavorites: () => number[];
  isFavorite: (sessionId: number) => boolean;
  addFavorite: (sessionId: number) => void;
  removeFavorite: (sessionId: number) => void;
}

const useUserStore = create<StoreState>((set, get) => ({
  id: '0',
  blocked: false,
  confirmed: false,
  darkMode: false,
  hasSeenTutorial: false,
  isLoggedIn: false,

  schedule: {} as Schedule,
  session: {} as Session,
  sessions: [],
  speaker: {} as Speaker,
  speakers: [],
  favorites: [],
  locations: [],
  filterDate: undefined,
  filteredTracks: [],
  searchString: undefined,
  searchText: undefined,
  mapCenterId: undefined,
  orderField: '',
  filter: '',
  searchOrder: undefined,
  loading: false,
  allTracks: [],
  menuEnabled: true,
  favoriteSessions: [],
  speakerSessions: [],

  // Métodos para actualizar el estado
  setUserState: (user) => set((state) => ({ ...state, ...user })),
  setConfState: (conf) => set((state) => ({ ...state, ...conf })),
  
  getConfData: async () => {
    const response = await Promise.all([fetch(dataUrl), fetch(locationsUrl)]);
    const responseData = await response[0].json();
    const schedule = responseData.schedule[0] as Schedule;
    const sessions = parseSessions(schedule);
    const speakers = responseData.speakers as Speaker[];
    const locations = (await response[1].json()) as Location[];
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
      filteredTracks: [...allTracks],
    };
    return data;
  },

  loadConfData: async () => {
    set({ loading: true });
    try {
      const response = await Promise.all([
        fetch(dataUrl),
        fetch(locationsUrl)
      ]);

      const responseData = await response[0].json();
      const schedule = responseData.schedule[0] as Schedule;
      const sessions = parseSessions(schedule);
      const speakers = responseData.speakers as Speaker[];
      const locations = await response[1].json() as Location[];

      const allTracks = sessions
        .reduce((all, session) => all.concat(session.tracks), [] as string[])
        .filter((trackName, index, array) => array.indexOf(trackName) === index)
        .sort();

      set({
        schedule,
        sessions: parseSessions(schedule),
        locations,
        speakers,
        allTracks,
        filteredTracks: [...allTracks],
        loading: false
      });
      
    } catch (error) {
      console.error('Error loading conference data:', error);
      set({ loading: false });
    }
  },

  loadUserData: async () => {
    try {
      const response = await Promise.all([
        Preferences.get({ key: ID }),
        Preferences.get({ key: JWT }),
        Preferences.get({ key: SESSION_ID }),
        Preferences.get({ key: USERNAME }),
        Preferences.get({ key: EMAIL }),
        Preferences.get({ key: BLOCKED }),
        Preferences.get({ key: CONFIRMED }),
        Preferences.get({ key: CREATED_AT }),
        Preferences.get({ key: UPDATED_AT }),
        Preferences.get({ key: PROVIDER }),
        Preferences.get({ key: DARK_MODE }),
        Preferences.get({ key: HAS_SEEN_TUTORIAL }),
        Preferences.get({ key: HAS_LOGGED_IN }),
        Preferences.get({ key: CARET }),
        Preferences.get({ key: ROLE }),
      ]);

      set({
        id: response[0].value || '0',
        jwt: response[1].value || undefined,
        sessionId: response[2].value || undefined,
        username: response[3].value || undefined,
        email: response[4].value || undefined,
        blocked: response[5].value === 'true',
        confirmed: response[6].value === 'true',
        created_at: response[7].value || undefined,
        updated_at: response[8].value || undefined,
        provider: response[9].value || undefined,
        darkMode: response[10].value === 'true',
        hasSeenTutorial: response[11].value === 'true',
        isLoggedIn: response[12].value === 'true',
        caret: response[13].value || undefined,
        role: response[14].value || undefined
      });
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  },

  // Setters
  setData: async (data: Partial<UserState>) => {
    const { setUserState } = useUserStore.getState();
    setUserState(data);
  },
  
  setIsLogged: async (loggedIn: boolean) => {
    const { setUserState } = useUserStore.getState();
    setUserState({ isLoggedIn: loggedIn });
  },
  
  setId: async (id?: string) => {
    const { setUserState } = useUserStore.getState();
    setUserState({ id });
  },
  
  setJwt: async (jwt?: string) => {
    const { setUserState } = useUserStore.getState();
    setUserState({ jwt });
  },
  
  setSessionId: async (sessionId?: string) => {
    const { setUserState } = useUserStore.getState();
    setUserState({ sessionId });
  },
  
  setUsername: async (username?: string) => {
    const { setUserState } = useUserStore.getState();
    setUserState({ username });
  },
  
  setEmail: async (email?: string) => {
    const { setUserState } = useUserStore.getState();
    setUserState({ email });
  },
  
  setBlocked: async (blocked?: boolean) => {
    const { setUserState } = useUserStore.getState();
    setUserState({ blocked });
  },
  
  setConfirmed: async (confirmed?: boolean) => {
    const { setUserState } = useUserStore.getState();
    setUserState({ confirmed });
  },
  
  setCreatedAt: async (createdAt?: string) => {
    const { setUserState } = useUserStore.getState();
    setUserState({ created_at: createdAt });
  },
  
  setUpdatedAt: async (updatedAt?: string) => {
    const { setUserState } = useUserStore.getState();
    setUserState({ updated_at: updatedAt });
  },
  
  setProvider: async (provider2?: string) => {
    const { setUserState } = useUserStore.getState();
    setUserState({ provider: provider2 });
  },
  
  toogleDarkMode: async () => {
    const { darkMode } = useUserStore.getState(); // Obtén el valor actual de darkMode
    const { setUserState } = useUserStore.getState();
    setUserState({ darkMode: ! darkMode }); // Cambia el valor de darkMode
  },
  
  setHasSeenTutorial: async (hasSeenTutorial: boolean) => {
    const { setUserState } = useUserStore.getState();
    setUserState({ hasSeenTutorial });
  },
  
  setCaret: async (caret: string) => {
    const { setUserState } = useUserStore.getState();
    setUserState({ caret });
  },
  
  setRole: async (role: string) => {
    const { setUserState } = useUserStore.getState();
    setUserState({ role });
  },

  setLoading: (loading: boolean) => {
    set({ loading });
  },

  // Getters
  getFilteredSchedule: () => {
    const state = get();
    const { schedule, filteredTracks } = state;
    const groups: ScheduleGroup[] = [];

    schedule.groups.forEach((group: ScheduleGroup) => {
      const sessions: Session[] = [];

      group.sessions.forEach((session: Session) => {
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
  },

  getSearchedSchedule: () => {
    const state = get();
    const filteredSchedule = state.getFilteredSchedule();
    
    if (!state.searchText) {
      return filteredSchedule;
    }
  
    const groups: ScheduleGroup[] = filteredSchedule.groups.map(group => {
      const filteredSessions = group.sessions.filter(session =>
        session.name.toLowerCase().includes(state.searchText!.toLowerCase())
      );
  
      return {
        ...group,
        sessions: filteredSessions
      };
    });
  
    return {
      date: filteredSchedule.date,
      groups: groups.filter(group => group.sessions.length > 0)
    } as Schedule;
  },
  
  getScheduleList: () => {
    return get().getSearchedSchedule();
  },

  getScheduleItem: (id: number) => {
    const state = get();
    const { sessions } = state;
    return sessions.find(session => session.id === id);
  },

  getSpeaker: (id: number) => {
    const state = get();
    const { speakers } = state;
    return speakers.find(speaker => speaker.id === id);
  },

  getSpeakerSessions: () => {
    const state = get();
    const { sessions } = state;
    return sessions.reduce((acc, session) => {
      session.speakerNames.forEach(speaker => {
        if (!acc[speaker]) {
          acc[speaker] = [];
        }
        acc[speaker].push(session);
      });
      return acc;
    }, {} as { [key: string]: Session[] });
  },

  mapCenter: () => {
    const state = get();
    const { mapCenterId, locations } = state;
    return locations.find(location => location.id === mapCenterId) || ({} as Location);
  },

  getGroupedFavorites: () => {
    const state = get();
    const { favorites, sessions, schedule } = state;

    const favoriteSessions = sessions.filter(session => favorites.includes(session.id));
    const groups: ScheduleGroup[] = [];

    schedule.groups.forEach(group => {
      const sessionsInGroup = group.sessions.filter(session => favoriteSessions.includes(session));

      if (sessionsInGroup.length > 0) {
        groups.push({
          time: group.time,
          sessions: sessionsInGroup
        });
      }
    });

    return {
      date: schedule.date,
      groups
    } as Schedule;
  },

  getFavorites: () => {
    const state = get();
    const { favorites } = state;
    return favorites;
  },

  isFavorite: (sessionId: number) => {
    const state = get();
    const { favorites } = state;
    return favorites.includes(sessionId);
  },

  addFavorite: (sessionId: number) => {
    const state = get();
    if (!state.isFavorite(sessionId)) {
      set({ favorites: [...state.favorites, sessionId] });
    }
  },

  removeFavorite: (sessionId: number) => {
    const state = get();
    if (state.isFavorite(sessionId)) {
      set({ favorites: state.favorites.filter(id => id !== sessionId) });
    }
  }
}));

export default useUserStore;
