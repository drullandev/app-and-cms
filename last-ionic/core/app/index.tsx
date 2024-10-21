import React, { useEffect, useState } from 'react';
import { IonApp } from '@ionic/react';

import useUserStore from '../integrations/stores/user.store';

import AppRouter from '../components/main/AppRouter';
import MainListItem from '../components/main/Menu/SidenavItem';

import CookieConsent from '../pages/main/CookieConsent';
import PWA from '../components/main/PWA';

import { appRoutes } from './config/routes';

import './config/config';
import './styles';
import './types';

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
      {import.meta.env.VITE_SHOW_ENABLE_COOKIES_CONSENT && <CookieConsent />}
      {import.meta.env.VITE_ENABLE_SHOW_PWA_INSTALLER && <PWA/>}
    </IonApp>
  );
};

export default AppComponent;
