import React, { useEffect, useContext } from 'react'
import { IonRouterContext } from '@ionic/react'
import { initialUser } from '../../reducer/state'
import { connect } from '../../reducer/src/connect';
import { RouteComponentProps, withRouter } from 'react-router';
import { setData } from '../../reducer/data/user/user.actions';

interface StateProps {
}

interface DispatchProps {
  setData: typeof setData;
}

interface LogoutProps extends RouteComponentProps, StateProps, DispatchProps {}

const Logout: React.FC<LogoutProps> = ({
  setData
}) => {
  const ionRouterContext = useContext(IonRouterContext)
  useEffect(() => {
    setData(initialUser)
    ionRouterContext.push('/tabs/schedule')
  }, [setData, ionRouterContext])
  return null
}

export default connect<{}, StateProps, {}>({
  mapStateToProps: (state) => ({
    setData: state.user,
  }),
  mapDispatchToProps: {
    setData,
  },
  component: withRouter(Logout),
});