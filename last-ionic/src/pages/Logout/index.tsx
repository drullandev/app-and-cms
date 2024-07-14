import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

interface LogoutProps {
  setData: (data: any) => void;
}

const Logout: React.FC<LogoutProps> = ({ setData }) => {
  useEffect(() => {
    setData(null);
    // eslint-disable-next-line
  }, [setData]);

  return <Redirect to="/login" />;
}

export default Logout;
