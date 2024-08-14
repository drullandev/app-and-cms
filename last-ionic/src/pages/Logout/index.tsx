import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { LogoutProps } from './types'

// Component Reducer
import { connect } from '../../reducer/src/connect';
import { OwnProps, ComponentProps, StateProps, DispatchProps, mapStateToProps, mapDispatchToProps } from './reducer'

const LogoutPage: React.FC<LogoutProps> = ({ setData }) => {
  useEffect(() => {
    setData(null);
    // eslint-disable-next-line
  }, [setData]);

  return <Redirect to="/login" />;
}

export default connect<OwnProps, StateProps, DispatchProps>({ mapStateToProps, mapDispatchToProps, component: LogoutPage });
