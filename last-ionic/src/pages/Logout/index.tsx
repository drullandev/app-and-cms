import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { LogoutProps } from './types'

// Component Reducer
const LogoutPage: React.FC<LogoutProps> = ({ setData }) => {
  useEffect(() => {
    setData(null);
    // eslint-disable-next-line
  }, [setData]);

  return <Redirect to="/login" />;
}

export default LogoutPage;
