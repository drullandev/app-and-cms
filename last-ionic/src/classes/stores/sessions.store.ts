import { create } from 'zustand';
import Logger, { initializeLogger } from '../utils/LoggerUtils';

export interface AppState {
  loading?: boolean;
  menuEnabled: boolean;
}

/**
 * APP STATES
 * - Use to come from the users, but also the schedule or feed
 */
interface AppStore extends AppState {
  setData: (data: Partial<AppState>) => void;
  setLoading: (isLoading: boolean) => void;
  setMenuEnabled: (menuEnabled: boolean) => void;
  getConfData: () => AppState;
  loadAppData: () => Promise<void>;
}

// Initialize Logger
const logger = initializeLogger('AppStoreLogger');

const useAppStore = create<AppStore>((set, get) => ({

    // Loading level standar, not level SplashScreen jejeje...
  loading: false,

  menuEnabled: false,

  // Setter for updating multiple properties in the state
  setData: (data) => set((state) => ({ ...state, ...data })),
  
  // Setter for loading state
  setLoading: (isLoading) => set({ loading: isLoading }),

  // Setter for menuEnabled state
  setMenuEnabled: (menuEnabled) => set({ menuEnabled }),

  // Function to retrieve the current conference data from the state
  getConfData: () => {
    const { loading, menuEnabled } = get();
    return { loading, menuEnabled };
  },

  // Function to load application data and update the state accordingly
  loadAppData: async () => {
    logger.log(' • loadAppData');
    set({ loading: true });
    try {
      const data = get().getConfData();
      set({ ...data });
    } catch (error) {
      console.error('Error loading conference data:', error);
    } finally {
      set({ loading: false });
    }
  },

}));

export default useAppStore;
