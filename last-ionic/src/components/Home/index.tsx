import React from 'react';
import { Redirect } from 'react-router';
import { HOME_PATH } from '../../app/config/env';

/**
 * A functional component that redirects to the home path.
 *
 * @return {JSX.Element} A Redirect component with the home path.
 */
const Home: React.FC = () => {
  return <Redirect to={HOME_PATH} />;
};

export default Home;
