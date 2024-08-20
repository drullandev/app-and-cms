export interface OwnProps {
  title?: string,
  showMenuButton?: boolean;
  showSearchBar?: boolean;
  showFilterButton?: boolean;
  showShareButton?: boolean;
  filters?: string[];
  onFilterChange?: (filter: string) => void;
  onShare?: () => void;
  onSearch?: (query: string) => void;
}