import create from 'zustand';
import { Preferences } from '@capacitor/preferences';
import Logger from '../utils/LoggerUtils';
import DebugUtils from '../utils/DebugUtils';
import { AppState } from './sessions.store';

export const dataUrl = '/assets/data/data.json'; // TODO: REMOVE THIS
export const locationsUrl = '/assets/data/locations.json'; // TODO: REMOVE THIS

// Propio del usuario
export const ID = 'id';
export const JWT = 'jwt';
export const USERNAME = 'username';
export const EMAIL = 'email';
export const CONFIRMED = 'confirmed';
export const BLOCKED = 'blocked';
export const DARK_MODE = 'darkMode';

const debug = DebugUtils.setDebug(false);

// Define la interfaz del estado del usuario
interface UserState {
  id: string;
  jwt?: string;
  username?: string;
  email?: string;
  blocked: boolean;
  confirmed: boolean;
  darkMode: boolean;
}

// Define la interfaz del store con Zustand
interface StoreState extends UserState, AppState {
  setUserState: (user: Partial<UserState>) => void;
  setAppState: (conf: Partial<AppState>) => void;
  loadAppData: () => Promise<void>;
  loadUserData: () => Promise<void>;

  // Setters
  setData: (data: Partial<UserState>) => void;
  setId: (id?: string) => void;
  setDarkMode: (darkMode: boolean) => void;
  setJwt: (jwt?: string) => void;
  setUsername: (username?: string) => void;
  setEmail: (email?: string) => void;
  setBlocked: (blocked?: boolean) => void;
  setConfirmed: (confirmed?: boolean) => void;
}

const useUserStore = create<StoreState>((set, get) => ({
  id: '0',
  jwt: '',
  blocked: false,
  confirmed: false,
  darkMode: false,
  menuEnabled: true,
  
  // Métodos para actualizar el estado
  setUserState: (user) => set((state) => ({ ...state, ...user })),
  setAppState: (conf) => set((state) => ({ ...state, ...conf })),

  loadAppData: async () => {
    // Implementar la lógica de carga de datos si es necesario
    try {
      /*
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
      });
      */
    } catch (error) {
      console.error('Error loading conference data:', error);
    }
  },

  loadUserData: async () => {
    try {
      const response = await Promise.all([
        Preferences.get({ key: ID }),
        Preferences.get({ key: JWT }),
        Preferences.get({ key: USERNAME }),
        Preferences.get({ key: EMAIL }),
        Preferences.get({ key: BLOCKED }),
        Preferences.get({ key: CONFIRMED }),
        Preferences.get({ key: DARK_MODE })
      ]);

      set({
        id: response[0].value || '0',
        jwt: response[1].value || undefined,
        username: response[2].value || undefined,
        email: response[3].value || undefined,
        blocked: response[4].value === 'true',
        confirmed: response[5].value === 'true',
        darkMode: response[6].value === 'true'
      });

    } catch (error) {
      console.error('Error loading user data:', error);
    }
  },

  // Setters
  setData: async (data: Partial<UserState>) => {
    set((state) => ({ ...state, ...data }));
  },

  setId: async (id?: string) => {
    set((state) => ({ ...state, id }));
  },

  setDarkMode: async (darkMode: boolean) => {
    await Preferences.set({ key: DARK_MODE, value: darkMode.toString() });
    set((state) => ({ ...state, darkMode }));
  },

  setJwt: async (jwt?: string) => {
    set((state) => ({ ...state, jwt }));
  },

  setUsername: async (username?: string) => {
    set((state) => ({ ...state, username }));
  },
  
  setEmail: async (email?: string) => {
    set((state) => ({ ...state, email }));
  },
  
  setBlocked: async (blocked?: boolean) => {
    set((state) => ({ ...state, blocked }));
  },
  
  setConfirmed: async (confirmed?: boolean) => {
    set((state) => ({ ...state, confirmed }));
  },
}));

export default useUserStore;