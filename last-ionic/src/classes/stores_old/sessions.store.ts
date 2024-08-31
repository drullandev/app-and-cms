import create from 'zustand';

import Logger, { initializeLogger } from '../utils/LoggerUtils';
import useUserStore from './user.store';
import AppState from './sessions.store';
import { Schedule, Session } from '../../interfaces/models/Schedule';
import { Speaker } from '../../interfaces/models/Speaker';
import { Location } from '../../interfaces/models/Location';

// Definición del tipo para las sesiones de los oradores
interface SpeakerSessions {
  [key: string]: Session[]
}

export interface AppState {
  schedule: Schedule;
  sessions: Session[];
  speakers: Speaker[];
  favorites: number[];
  locations: Location[];
  filteredTracks: string[];
  searchText?: string;
  mapCenterId?: number;
  loading?: boolean;
  allTracks: string[];
  menuEnabled: boolean;
}

// Extensión de AppState para incluir el estado de la conferencia
interface AppStore extends AppState {
  [x: string]: any;
  loading: boolean;
  favorites: number[];
  filteredTracks: string[];
  searchText?: string;
  searchString?: string;
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
  setData: (data: Partial<AppState>) => void;
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
  loadAppData: () => Promise<void>;
}

// Initialize Logger
const logger = initializeLogger('SessionStore');

// Crear el store usando Zustand
const useAppStore = create<AppStore>((set) => ({
  loading: false,
  favorites: [],
  filteredTracks: [],
  searchText: undefined,
  menuEnabled: false,
  filter: '',
  filterDate: undefined,
  orderField: '',
  searchOrder: 'asc',
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
  loadAppData: async () => {
    const { getConfData } = useAppStore();
    Logger.log(' • loadAppData');
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

export default useAppStore;
