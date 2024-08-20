import create from 'zustand';

import Logger from '../classes/LoggerClass';
import useStore from '../stores/user.store';
import ConfState from '../stores/user.store';
import { Schedule, Session } from './models/Schedule';
import { Speaker } from './models/Speaker';
import { Location } from './models/Location';

// Definición del tipo para las sesiones de los oradores
interface SpeakerSessions {
  [speakerName: string]: Session[];
}

// Extensión de ConfState para incluir el estado de la conferencia
interface ConfStore extends ConfState {
  loading: boolean;
  favorites: number[];
  filteredTracks: string[];
  searchText?: string;
  menuEnabled: boolean;
  filter: string;
  filterDate?: string;
  orderField: string;
  searchOrder?: 'asc' | 'desc';
  allTracks: string[];
  schedule: Schedule;
  sessions: Session[];
  speakers: Speaker[];
  locations: Location[];
  mapCenterId?: number;
  speakerSessions: SpeakerSessions;
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
  setSearchOrder: (searchOrder?: 'asc' | 'desc') => void;
  setAllTracks: (allTracks: string[]) => void;
  setSchedule: (schedule: Schedule) => void;
  setSessions: (sessions: Session[]) => void;
  setSpeakers: (speakers: Speaker[]) => void;
  setLocations: (locations: Location[]) => void;
  setMapCenterId: (mapCenterId?: number) => void;
  setSpeakerSessions: (speakerSessions: SpeakerSessions) => void;
  loadConfData: () => Promise<void>;
}

// Crear el store usando Zustand
const useConfStore = create<ConfStore>((set) => ({
  loading: false,
  favorites: [],
  filteredTracks: [],
  searchText: undefined,
  menuEnabled: false,
  filter: '',
  filterDate: undefined,
  orderField: '',
  searchOrder: undefined,
  allTracks: [],
  schedule: {} as Schedule,
  sessions: [],
  speakers: [],
  locations: [],
  mapCenterId: undefined,
  speakerSessions: {}, // Inicializa speakerSessions aquí
  setLoading: (isLoading) => set({ loading: isLoading }),
  setData: (data) => set((state) => ({ ...state, ...data })),
  addFavorite: (sessionId) => set((state) => ({ favorites: [...state.favorites, sessionId] })),
  removeFavorite: (sessionId) => set((state) => ({ favorites: state.favorites.filter(id => id !== sessionId) })),
  updateFilteredTracks: (filteredTracks) => set({ filteredTracks }),
  setSearchText: (searchText?) => set({ searchText }),
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
  setSpeakerSessions: (speakerSessions) => set({ speakerSessions }),
  // Función para cargar datos
  loadConfData: async () => {
    const { getConfData } = useStore();
    Logger.log(' • loadConfData');
    set({ loading: true });
    try {
      const data = getConfData();
      set({ ...data });
    } catch (error) {
      console.error('Error loading conference data:', error);
    } finally {
      set({ loading: false });
    }
  },
}));

export default useConfStore;
