import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getConfData } from '../../api/dataApi';
import { Schedule, Session } from '../../models/Schedule';
import { Speaker } from '../../models/Speaker';
import { Location } from '../../models/Location';

export interface ConfState {
  schedule: Schedule | null;
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

const initialState: ConfState = {
  schedule: null,
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
  menuEnabled: false,
};

export const loadConfData = createAsyncThunk('sessions/loadConfData', async () => {
  const data = await getConfData();
  return data;
});

const sessionsSlice = createSlice({
  name: 'sessions',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setData: (state, action: PayloadAction<Partial<ConfState>>) => {
      return { ...state, ...action.payload };
    },
    addFavorite: (state, action: PayloadAction<number>) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.favorites = state.favorites.filter(x => x !== action.payload);
    },
    updateFilteredTracks: (state, action: PayloadAction<string[]>) => {
      state.filteredTracks = action.payload;
    },
    setSearchText: (state, action: PayloadAction<string | undefined>) => {
      state.searchText = action.payload;
    },
    setSearchString: (state, action: PayloadAction<string>) => {
      state.searchString = action.payload;
    },
    setMenuEnabled: (state, action: PayloadAction<boolean>) => {
      state.menuEnabled = action.payload;
    },
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
    setFilterDate: (state, action: PayloadAction<string | undefined>) => {
      state.filterDate = action.payload;
    },
    setOrderField: (state, action: PayloadAction<any>) => {
      state.orderField = action.payload;
    },
    setSearchOrder: (state, action: PayloadAction<'asc' | 'desc' | string | undefined>) => {
      state.searchOrder = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadConfData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadConfData.fulfilled, (state, action) => {
      return { ...state, ...action.payload, loading: false };
    });
    builder.addCase(loadConfData.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const {
  setLoading,
  setData,
  addFavorite,
  removeFavorite,
  updateFilteredTracks,
  setSearchText,
  setSearchString,
  setMenuEnabled,
  setFilter,
  setFilterDate,
  setOrderField,
  setSearchOrder,
} = sessionsSlice.actions;

export default sessionsSlice.reducer;
