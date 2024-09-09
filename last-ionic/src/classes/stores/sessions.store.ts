import { create } from 'zustand';
import Logger, { initializeLogger } from '../utils/LoggerUtils';

/**
 * Interface representing the application state.
 * 
 * @interface AppState
 * @property {boolean} [loading] - Indicates whether the application is in a loading state.
 * @property {boolean} menuEnabled - Indicates whether the menu is enabled or not.
 */
export interface AppState {
  loading?: boolean;
  menuEnabled: boolean;
}

/**
 * Interface representing the Zustand store for application state management.
 * 
 * @interface AppStore
 * @extends {AppState}
 * @property {(data: Partial<AppState>) => void} setData - Function to update multiple properties of the state.
 * @property {(isLoading: boolean) => void} setLoading - Function to update the loading state.
 * @property {(menuEnabled: boolean) => void} setMenuEnabled - Function to update the menuEnabled state.
 * @property {() => AppState} getConfData - Function to retrieve the current application state.
 * @property {() => Promise<void>} loadAppData - Function to load application data asynchronously.
 */
interface AppStore extends AppState {
  setData: (data: Partial<AppState>) => void;
  setLoading: (isLoading: boolean) => void;
  setMenuEnabled: (menuEnabled: boolean) => void;
  getConfData: () => AppState;
  loadAppData: () => Promise<void>;
}

// Initialize Logger for the AppStore
const logger = initializeLogger('AppStoreLogger');

/**
 * Creates a Zustand store for managing the application state.
 * 
 * @function useAppStore
 * @returns {AppStore} - The Zustand store instance.
 */
const useAppStore = create<AppStore>((set, get) => ({
  loading: false,
  menuEnabled: false,

  /**
   * Updates multiple properties of the state.
   * 
   * @param {Partial<AppState>} data - The partial state to update.
   */
  setData: (data) => set((state) => ({
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
   * Retrieves the current application state.
   * 
   * @returns {AppState} - The current state.
   */
  getConfData: () => {
    const { loading, menuEnabled } = get();
    return { loading, menuEnabled };
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
      // Simulate data fetching
      const data = await fetchDataFromServer();
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
 * 
 * @async
 * @function fetchDataFromServer
 * @returns {Promise<Partial<AppState>>} - The simulated data.
 */
async function fetchDataFromServer(): Promise<Partial<AppState>> {
  // Replace with actual data fetching logic
  return {
    loading: false,
    menuEnabled: true,
  };
}

export default useAppStore;
