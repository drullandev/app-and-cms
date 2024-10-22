import React, { useEffect } from 'react';

/**
 * A functional component that redirects to the home path.
 *
 * @return {JSX.Element} A Redirect component with the home path.
 */
const Home: React.FC = () => {
  useEffect(() => {
    console.log(import.meta.env);
  }, []);
  return <>Wellcome home</>
};

export default React.memo(Home);
