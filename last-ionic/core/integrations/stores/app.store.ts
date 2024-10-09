import { create } from 'zustand';
import LoggerUtils from '../../classes/utils/LoggerUtils';
import { v4 as uuidv4 } from 'uuid'; // Importar una librería para generar un UUID

/**
 * Interface representing the application state.
 * 
 * @interface AppState
 * @property {boolean} [loading] - Indicates whether the application is in a loading state.
 * @property {boolean} menuEnabled - Indicates whether the menu is enabled or not.
 * @property {string} [sessionId] - Unique session ID for tracking the session.
 */
export interface AppState {
  loading?: boolean;
  menuEnabled: boolean;
  headerTitle?: string;
  sessionId?: string;
}

/**
 * Interface representing the Zustand store for application state management.
 * 
 * @interface AppStore
 * @extends {AppState}
 * @property {(data: Partial<AppState>) => void} setAppStore - Function to update multiple properties of the state.
 * @property {(isLoading: boolean) => void} setLoading - Function to update the loading state.
 * @property {(menuEnabled: boolean) => void} setMenuEnabled - Function to update the menuEnabled state.
 * @property {(sessionId: string) => void} setSessionId - Function to update the sessionId state.
 * @property {() => AppState} getConfData - Function to retrieve the current application state.
 * @property {() => Promise<void>} loadAppData - Function to load application data asynchronously.
 */
interface AppStore extends AppState {
  setAppStore: (data: Partial<AppState>) => void;
  setLoading: (isLoading: boolean) => void;
  setMenuEnabled: (menuEnabled: boolean) => void;
  setSessionId: (sessionId: string) => void;
  getConfData: () => AppState;
  loadAppData: () => Promise<void>;
}

// Initialize Logger for the AppStore
const logger = LoggerUtils.getInstance('AppStoreLogger', false);

/**
 * Creates a Zustand store for managing the application state.
 * 
 * @function useAppStore
 * @returns {AppStore} - The Zustand store instance.
 */
const useAppStore = create<AppStore>((set, get) => ({
  loading: false,
  menuEnabled: false,
  sessionId: uuidv4(), // Generar un sessionId único al inicializar el estado

  /**
   * Updates multiple properties of the state.
   * 
   * @param {Partial<AppState>} data - The partial state to update.
   */
  setAppStore: (data) => set((state) => ({
    ...state,
    ...data,
  })),

  /**
   * Updates the loading state.
   * 
   * @param {boolean} isLoading - The new loading state.
   */
  setLoading: (isLoading) => set(() => ({
    loading: isLoading,
  })),

  /**
   * Updates the menuEnabled state.
   * 
   * @param {boolean} menuEnabled - The new menuEnabled state.
   */
  setMenuEnabled: (menuEnabled) => set(() => ({
    menuEnabled,
  })),

  /**
   * Updates the sessionId.
   * 
   * @param {string} sessionId - The new sessionId state.
   */
  setSessionId: (sessionId: string) => set(() => ({
    sessionId,
  })),

  /**
   * Updates the headerTitle.
   * 
   * @param {string} headerTitle - The new header title.
   */
  setHeaderTitle: (headerTitle: any) => set(() => ({
    headerTitle,
  })),

  /**
   * Retrieves the current application state.
   * 
   * @returns {AppState} - The current state.
   */
  getConfData: () => {
    const { loading, menuEnabled, headerTitle, sessionId } = get();
    return { loading, menuEnabled, headerTitle, sessionId };
  },

  /**
   * Asynchronously loads application data and updates the state.
   * 
   * @async
   * @returns {Promise<void>}
   */
  loadAppData: async () => {
    logger.log(' • loadAppData');
    set(() => ({
      loading: true,
    }));

    try {
      const data = await fetchDataFromServer();//TODO: get elementary app data :) if you have :P
      set(() => ({
        ...data,
      }));
    } catch (error) {
      logger.error('Error loading application data:', error);
    } finally {
      set(() => ({
        loading: false,
      }));
    }
  },
}));

/**
 * Simulates fetching data from a server.
 * TODO: Fetch the server config!!
 * @async
 * @function fetchDataFromServer
 * @returns {Promise<Partial<AppState>>} - The simulated data.
 */
async function fetchDataFromServer(): Promise<Partial<AppState>> {
  return {
    loading: false,
    menuEnabled: true,
  };
}

export default useAppStore;
