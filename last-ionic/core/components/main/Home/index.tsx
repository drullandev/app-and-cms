import React from 'react';
import { Redirect } from 'react-router';

/**
 * A functional component that redirects to the home path.
 *
 * @return {JSX.Element} A Redirect component with the home path.
 */
const Home: React.FC = () => {
  return <Redirect to={process.env.REACT_APP_HOME_PATH ?? '/home'} />;
};

export default React.memo(Home);
