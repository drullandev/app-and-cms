import React from 'react';
import { Redirect } from 'react-router';
import useUserStore from '../../stores/user.store'; // Ajusta la ruta según la ubicación de tu store

const Home: React.FC = () => {
  // Usa Zustand para acceder al estado
  const hasSeenTutorial = useUserStore((state) => state.hasSeenTutorial);

  // Lee las rutas desde las variables de entorno
  const homePath = import.meta.env.REACT_APP_HOME_PATH || '/home';
  const tutorialPath = import.meta.env.REACT_APP_TUTORIAL_PATH || '/tutorial';

  return <Redirect to={hasSeenTutorial ? homePath : tutorialPath} />;
};

export default Home;
