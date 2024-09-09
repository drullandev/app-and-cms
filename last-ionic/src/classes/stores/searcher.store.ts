import create from 'zustand';

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

const useSearchStore = create<SearchState>((set) => ({
  searchString: '',
  searchOrder: 'asc',
  orderField: 'id',
  filter: [],
  
  setSearchString: (searchString) => set({ searchString }),
  setSearchOrder: (searchOrder) => set({ searchOrder }),
  setOrderField: (orderField) => set({ orderField }),
  setFilter: (filter) => set({ filter }),
}));

export default useSearchStore;