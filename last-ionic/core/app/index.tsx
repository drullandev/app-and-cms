import { IonApp } from '@ionic/react';
import React, { useEffect, useState } from 'react';

import useUserStore from '../integrations/stores/user.store';

import AppRouter from '../components/main/AppRouter';
import MainListItem from '../components/main/Menu/SidenavItem';

import CookieConsent from '../pages/main/CookieConsent';
import PWA from '../components/main/PWA';

import { appRoutes } from './config/routes';

import './config/config';
import './styles';
import './types';
import { showCookiesConsent, showPwaInstaller } from './config/env';
import Overlay from '../components/main/Overlay';

const AppComponent: React.FC = () => {

  const { darkMode } = useUserStore();
  const [ theme, setTheme ] = useState<string>('dark-mode');

  // Setting the initial theme
  useEffect(() => {
    setTheme(darkMode ? 'dark-theme' : '');
  }, [darkMode]);

  // Rendering the app main routes
  return (
    <IonApp className={theme}>
      <AppRouter
        id={'main'}
        appRoutes={appRoutes}
        component={MainListItem}
      />
      {showCookiesConsent && <CookieConsent />}
      {showPwaInstaller && <PWA/>}
                                </IonApp>
  );
};

export default AppComponent;
