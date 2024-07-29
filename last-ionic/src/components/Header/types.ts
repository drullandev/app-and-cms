import { AppState } from "../../reducer/state";

export interface OwnProps {
  title: string,
  showMenuButton?: boolean;
  showSearchBar?: boolean;
  showFilterButton?: boolean;
  showShareButton?: boolean;
  filters?: string[];
  onFilterChange?: (filter: string) => void;
  onShare?: () => void;
  onSearch?: (query: string) => void;
}

export interface StateProps {
  loading?: boolean
}

export interface DispatchProps {}

export interface ComponentProps extends OwnProps, StateProps, DispatchProps {}

export const mapStateToProps = (state: AppState): StateProps => ({
  loading: state.user.loading,
});
  
export const mapDispatchToProps: DispatchProps = {};
  