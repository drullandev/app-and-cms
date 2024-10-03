import { create } from 'zustand';
import { Preferences } from '@capacitor/preferences';
import Logger from '../utils/LoggerUtils';
import DebugUtils from '../utils/DebugUtils';
import { AppState } from './app.store';
import { AuthResponse } from '../models/strapi/AuthResponse';
import { User } from '../models/strapi/User';

// Propiedades del usuario
export const ID = 'id';
export const JWT = 'jwt';
export const USERNAME = 'username';
export const EMAIL = 'email';
export const PROVIDER = 'provider';
export const CONFIRMED = 'confirmed';
export const BLOCKED = 'blocked';
export const DARK_MODE = 'darkMode';
export const HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
export const CREATED_AT = 'createdAt';
export const UPDATED_AT = 'updatedAt';

const debug = DebugUtils.setDebug(false);

// Define la interfaz del estado del usuario
export interface IUserState {
  id: number;
  jwt: string;
  username?: string;
  email?: string;
  provider?: string;
  blocked: boolean;
  confirmed: boolean;
  darkMode: boolean;
  hasSeenTutorial: string;
  logged: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Define la interfaz del store con Zustand
export interface IUserStore extends IUserState, AppState {
  setUserState: (user: Partial<IUserState>) => void;
  setAppState: (conf: Partial<AppState>) => void;
  loadAppData: () => Promise<void>;
  loadUserData: () => Promise<void>;

  // Setters
  setUserStore: (data: Partial<IUserState>) => void;
  setId: (id: number) => void;
  setJwt: (jwt?: string) => void;
  setUsername: (username?: string) => void;
  setEmail: (email?: string) => void;
  setProvider: (provider?: string) => void;
  setBlocked: (blocked?: boolean) => void;
  setConfirmed: (confirmed?: boolean) => void;
  setDarkMode: (darkMode: boolean) => void;
  setHasSeenTutorial: (hasSeenTutorial: string) => void;
  setLogged: (logged: boolean) => void;
}

const useUserStore = create<IUserStore>((set, get) => ({
  id: 0,
  jwt: '',
  username: undefined,
  email: undefined,
  provider: undefined,
  blocked: false,
  confirmed: false,
  darkMode: true,
  hasSeenTutorial: 'false',
  logged: false,
  createdAt: undefined,
  updatedAt: undefined,
  menuEnabled: true,

  // Métodos para actualizar el estado
  setUserState: (user: Partial<IUserState>) => {
    const currentState = get();
    const updatedState = { ...currentState, ...user };
    if (JSON.stringify(currentState) !== JSON.stringify(updatedState)) {
      set(updatedState);
    }
  },

  setAppState: (conf) => set((state) => ({ ...state, ...conf })),

  loadAppData: async () => {
    // Implementar la lógica de carga de datos si es necesario
    try {
      // Simulación de la carga de datos
    } catch (error) {
      console.error('Error loading app data:', error);
    }
  },

  loadUserData: async () => {
    try {
      const keys = [
        ID,
        JWT,
        USERNAME,
        EMAIL,
        PROVIDER,
        BLOCKED,
        CONFIRMED,
        DARK_MODE,
        HAS_SEEN_TUTORIAL,
        CREATED_AT,
        UPDATED_AT,
      ];
      const userData = await Promise.all(keys.map(key => Preferences.get({ key })));

      const [
        id,
        jwt,
        username,
        email,
        provider,
        blocked,
        confirmed,
        darkMode,
        hasSeenTutorial,
        createdAt,
        updatedAt,
      ] = userData.map(item => item.value);

      set({
        id: id ? parseInt(id, 10) : 0,
        jwt: jwt || '',
        username: username || undefined,
        email: email || undefined,
        provider: provider || undefined,
        blocked: blocked === 'true',
        confirmed: confirmed === 'true',
        darkMode: darkMode === 'true',
        hasSeenTutorial: hasSeenTutorial || 'false',
        createdAt: createdAt || undefined,
        updatedAt: updatedAt || undefined,
      });
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  },

  // Setters
  setUserStore: (data: Partial<IUserState>) => {
    const currentState = get();
    if (JSON.stringify(currentState) !== JSON.stringify({ ...currentState, ...data })) {
      set({ ...currentState, ...data });
    }
  },

  setId: (id: number) => {
    if (get().id !== id) {
      set({ id });
    }
  },

  setJwt: (jwt?: string) => {
    if (get().jwt !== jwt) {
      set({ jwt: jwt || '' });
    }
  },

  setUsername: (username?: string) => {
    if (get().username !== username) {
      set({ username });
    }
  },

  setEmail: (email?: string) => {
    if (get().email !== email) {
      set({ email });
    }
  },

  setProvider: (provider?: string) => {
    if (get().provider !== provider) {
      set({ provider });
    }
  },

  setBlocked: (blocked?: boolean) => {
    if (get().blocked !== blocked) {
      set({ blocked: blocked || false });
    }
  },

  setConfirmed: (confirmed?: boolean) => {
    if (get().confirmed !== confirmed) {
      set({ confirmed: confirmed || false });
    }
  },

  setDarkMode: async (darkMode: boolean) => {
    await Preferences.set({ key: DARK_MODE, value: darkMode.toString() });
    if (get().darkMode !== darkMode) {
      set({ darkMode });
    }
  },

  setHasSeenTutorial: (hasSeenTutorial: string) => {
    if (get().hasSeenTutorial !== hasSeenTutorial) {
      set({ hasSeenTutorial });
    }
  },

  setLogged: (logged: boolean) => {
    if (get().logged !== logged) {
      set({ logged });
    }
  },
}));

export default useUserStore;

export const setIUserState = (resAxios: AuthResponse, resUser: User, logged: boolean): Partial<IUserState> => {
  return {
    id: resUser.id,
    username: resUser.username,
    email: resUser.email,
    provider: resUser.provider,
    confirmed: resUser.confirmed,
    blocked: resUser.blocked,
    createdAt: resUser.createdAt,
    updatedAt: resUser.updatedAt,
    darkMode: resUser.darkMode,
    hasSeenTutorial: resUser.hasSeenTutorial.toString(),
    jwt: resAxios.jwt,
    logged: logged,
  };
};
