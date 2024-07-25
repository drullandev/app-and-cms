import { AppState } from "../../../reducer/state";

export interface OwnProps {
  label: string,
  slot: string
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
  