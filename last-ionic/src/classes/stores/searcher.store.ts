import { create } from 'zustand';

/**
 * Interface representing the state for search functionality.
 * 
 * @interface SearchState
 * @property {string} searchString - The current search string.
 * @property {string} searchOrder - The order in which to search results.
 * @property {string} orderField - The field by which to order search results.
 * @property {object[]} filter - Filters to apply to search results.
 * @property {(searchString: string) => void} setSearchString - Function to update the search string.
 * @property {(searchOrder: string) => void} setSearchOrder - Function to update the search order.
 * @property {(orderField: string) => void} setOrderField - Function to update the order field.
 * @property {(filter: object[]) => void} setFilter - Function to update the filters.
 */
interface SearchState {
  searchString: string;
  searchOrder: string;
  orderField: string;
  filter: object[];
  setSearchString: (searchString: string) => void;
  setSearchOrder: (searchOrder: string) => void;
  setOrderField: (orderField: string) => void;
  setFilter: (filter: object[]) => void;
}

const useSearchStore = create<SearchState>((set, get) => ({
  searchString: '',
  searchOrder: 'asc',
  orderField: 'id',
  filter: [],

  /**
   * Updates the search string only if it has changed.
   * 
   * @param {string} searchString - The new search string.
   */
  setSearchString: (searchString) => {
    if (get().searchString !== searchString) {
      set({ searchString });
    }
  },

  /**
   * Updates the search order only if it has changed.
   * 
   * @param {string} searchOrder - The new search order.
   */
  setSearchOrder: (searchOrder) => {
    if (get().searchOrder !== searchOrder) {
      set({ searchOrder });
    }
  },

  /**
   * Updates the order field only if it has changed.
   * 
   * @param {string} orderField - The new field to order by.
   */
  setOrderField: (orderField) => {
    if (get().orderField !== orderField) {
      set({ orderField });
    }
  },

  /**
   * Updates the filter array only if it has changed.
   * 
   * @param {object[]} filter - The new filter array.
   */
  setFilter: (filter) => {
    if (JSON.stringify(get().filter) !== JSON.stringify(filter)) {
      set({ filter });
    }
  },
}));

export default useSearchStore;
