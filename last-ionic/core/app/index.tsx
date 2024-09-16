import React, { useEffect, useState } from 'react';
import { IonApp } from '@ionic/react';

import RandomUtils from '../classes/utils/RandomUtils';
import DebugUtils from '../classes/utils/DebugUtils';

import useUserStore from '../classes/stores/user.store';
import useAppStore from '../classes/stores/app.store';

import AppRouter from '../components/main/AppRouter';

import { AppRoutes } from './config/routes';

import './config';
import './styles';
import './types';

const AppComponent: React.FC = () => {
  const debug = DebugUtils.setDebug(false);
  const { setSessionId } = useAppStore();
  const { darkMode } = useUserStore();
  const [theme, setTheme] = useState<string>('dark-mode');

  useEffect(() => {
    setTheme(darkMode ? 'dark-theme' : '');
  }, [darkMode, setSessionId]);

  useEffect(() => {
    setSessionId(RandomUtils.getRandomUUID());
  }, [darkMode, setSessionId]);

  return (
    <IonApp className={theme}>
      <AppRouter id="main" appRoutes={AppRoutes}/>
    </IonApp>
  );
};

export default AppComponent;
