// state.ts (session)
import { Schedule, Session } from '../../models/Schedule';
import { Speaker } from '../../models/Speaker';
import { Location } from '../../models/Location';

export interface ConfState {
  schedule: Schedule;
  sessions: Session[];
  speakers: Speaker[];
  favorites: number[];
  locations: Location[];
  filterDate?: string;
  filteredTracks: string[];
  searchString?: string;
  searchText?: string;
  mapCenterId?: number;
  orderField: string;
  filter: string;
  searchOrder?: string;
  loading?: boolean;
  allTracks: string[];
  menuEnabled: boolean;
}

export const initialConfState: ConfState = {
  schedule: {} as Schedule,
  sessions: [],
  speakers: [],
  favorites: [],
  locations: [],
  filterDate: undefined,
  filteredTracks: [],
  searchString: undefined,
  searchText: undefined,
  mapCenterId: undefined,
  orderField: '',
  filter: '',
  searchOrder: undefined,
  loading: false,
  allTracks: [],
  menuEnabled: true,
};
