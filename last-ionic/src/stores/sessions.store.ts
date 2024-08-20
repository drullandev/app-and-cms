import create from 'zustand';

import Logger from '../classes/LoggerClass';
import { ConfState, initialConfState } from '../reducer/data/sessions/sessions.state';
import { Schedule, Session } from './models/Schedule';
import { getConfData } from '../reducer/data/global/data.getters';
import { Speaker } from './models/Speaker copy';
import { Location } from './models/Location';

// Define la interfaz del store con Zustand
interface ConfStore extends ConfState {
  setLoading: (isLoading: boolean) => void;
  setData: (data: Partial<ConfState>) => void;
  addFavorite: (sessionId: number) => void;
  removeFavorite: (sessionId: number) => void;
  updateFilteredTracks: (filteredTracks: string[]) => void;
  setSearchText: (searchText?: string) => void;
  setSearchString: (searchString?: string) => void;
  setMenuEnabled: (menuEnabled: boolean) => void;
  setFilter: (filter: string) => void;
  setFilterDate: (filterDate?: string) => void;
  setOrderField: (orderField: string) => void;
  setSearchOrder: (searchOrder?: 'asc' | 'desc' | string) => void;
  setAllTracks: (allTracks: string[]) => void;
  setSchedule: (schedule: Schedule) => void;
  setSessions: (sessions: Session[]) => void;
  setSpeakers: (speakers: Speaker[]) => void;
  setLocations: (locations: Location[]) => void;
  setMapCenterId: (mapCenterId?: number) => void;
  loadConfData: () => Promise<void>;
}

const useConfStore = create<ConfStore>((set) => ({
  ...initialConfState,

  // Métodos para actualizar el estado
  setLoading: (isLoading) => set({ loading: isLoading }),
  setData: (data) => set((state) => ({ ...state, ...data })),
  addFavorite: (sessionId) => set((state) => ({ favorites: [...state.favorites, sessionId] })),
  removeFavorite: (sessionId) => set((state) => ({ favorites: state.favorites.filter(id => id !== sessionId) })),
  updateFilteredTracks: (filteredTracks) => set({ filteredTracks }),
  setSearchText: (searchText) => set({ searchText }),
  setSearchString: (searchString) => set({ searchString }),
  setMenuEnabled: (menuEnabled) => set({ menuEnabled }),
  setFilter: (filter) => set({ filter }),
  setFilterDate: (filterDate) => set({ filterDate }),
  setOrderField: (orderField) => set({ orderField }),
  setSearchOrder: (searchOrder) => set({ searchOrder }),
  setAllTracks: (allTracks) => set({ allTracks }),
  setSchedule: (schedule) => set({ schedule }),
  setSessions: (sessions) => set({ sessions }),
  setSpeakers: (speakers) => set({ speakers }),
  setLocations: (locations) => set({ locations }),
  setMapCenterId: (mapCenterId) => set({ mapCenterId }),

  // Función para cargar datos
  loadConfData: async () => {
    Logger.log(' • loadConfData');
    set({ loading: true });
    try {
      const data = await getConfData();
      set({ ...data });
    } catch (error) {
      console.error('Error loading conference data:', error);
    } finally {
      set({ loading: false });
    }
  },
}));

export default useConfStore;
