export interface HeaderProps {
  header: {
    show_header: false | boolean
    show_back: false | boolean
    name: string
    label: string
    loading: false | boolean
    slug: string
    language: string
    lang: string
    icon: {
      url: string
    },
    show_search?: false | boolean
  }
}

export interface CustomHeaderProps {
  title: string;
  showMenuButton?: boolean;
  showSearchBar?: boolean;
  showFilterButton?: boolean;
  showShareButton?: boolean;
  filters?: string[];
  onFilterChange?: (filter: string) => void;
  onShare?: () => void;
  onSearch?: (query: string) => void;
}
