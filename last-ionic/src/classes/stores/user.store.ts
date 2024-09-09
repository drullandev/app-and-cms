import { create } from 'zustand';
import { Preferences } from '@capacitor/preferences';
import Logger from '../utils/LoggerUtils';
import DebugUtils from '../utils/DebugUtils';
import { AppState } from './sessions.store';

export const dataUrl = '/assets/data/data.json'; // TODO: REMOVE THIS
export const locationsUrl = '/assets/data/locations.json'; // TODO: REMOVE THIS

// Propiedades del usuario
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

  // Métodos para actualizar el estado, optimizados con comparaciones
  setUserState: (user) => {
    const currentState = get();
    const updatedState = { ...currentState, ...user };
    if (JSON.stringify(currentState) !== JSON.stringify(updatedState)) {
      set({ ...updatedState });
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

  // Setters optimizados para comparaciones antes de actualizar el estado
  setData: (data: Partial<UserState>) => {
    const currentState = get();
    if (JSON.stringify(currentState) !== JSON.stringify({ ...currentState, ...data })) {
      set({ ...currentState, ...data });
    }
  },

  setId: (id?: string) => {
    if (get().id !== id) {
      set({ id });
    }
  },

  setDarkMode: async (darkMode: boolean) => {
    await Preferences.set({ key: DARK_MODE, value: darkMode.toString() });
    if (get().darkMode !== darkMode) {
      set({ darkMode });
    }
  },

  setJwt: (jwt?: string) => {
    if (get().jwt !== jwt) {
      set({ jwt });
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

  setBlocked: (blocked?: boolean) => {
    if (get().blocked !== blocked) {
      set({ blocked });
    }
  },

  setConfirmed: (confirmed?: boolean) => {
    if (get().confirmed !== confirmed) {
      set({ confirmed });
    }
  },
}));

export default useUserStore;
