import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

interface RedirectToLoginProps {
  setData: (data: any) => void;
}

const RedirectToLogin: React.FC<RedirectToLoginProps> = ({ setData }) => {
  useEffect(() => {
    setData(null);
    // eslint-disable-next-line
  }, [setData]);

  return <Redirect to="/login" />;
}

export default RedirectToLogin;
