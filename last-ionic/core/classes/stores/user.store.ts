import { create } from 'zustand';
import { Preferences } from '@capacitor/preferences';
import Logger from '../utils/LoggerUtils';
import DebugUtils from '../utils/DebugUtils';
import { AppState } from './app.store';

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
  logged: boolean;
}

// Define la interfaz del store con Zustand
interface IStoreState extends UserState, AppState {
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

const useUserStore = create<IStoreState>((set, get) => ({
  id: '0',
  jwt: '',
  blocked: false,
  confirmed: false,
  darkMode: false,
  menuEnabled: true,
  logged: false,

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
      const keys = [ID, JWT, USERNAME, EMAIL, BLOCKED, CONFIRMED, DARK_MODE];
      const userData = await Promise.all(
        keys.map(key => Preferences.get({ key }))
      );
  
      const [id, jwt, username, email, blocked, confirmed, darkMode] = userData.map(item => item.value);
  
      set({
        id: id || '0',
        jwt: jwt || undefined,
        username: username || undefined,
        email: email || undefined,
        blocked: blocked === 'true',
        confirmed: confirmed === 'true',
        darkMode: darkMode === 'true'
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
