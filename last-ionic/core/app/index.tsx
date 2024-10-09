import React, { useEffect, useState } from 'react';
import { IonApp } from '@ionic/react';

import useUserStore from '../integrations/stores/user.store';

import AppRouter from '../components/main/AppRouter';
import MainListItem from '../components/main/Menu/SidenavItem';
import TabItem from '../components/main/Menu/TabItem';

import CookieConsent from '../pages/main/CookieConsent';
import PWA from '../components/main/PWA';

import { AppRoutes } from './config/routes';

import './config/config';
import './styles';
import './types';

const AppComponent: React.FC = () => {

  const { darkMode } = useUserStore();
  const [theme, setTheme] = useState<string>('dark-mode');

  // Setting the initial theme
  useEffect(() => {
    setTheme(darkMode ? 'dark-theme' : '');
  }, [darkMode]);

  // Rendering the app main routes
  return (
    <IonApp className={theme}>
      <AppRouter
        id={'main'}
        appRoutes={AppRoutes}
        component={MainListItem}
      />
      {/*<TabItem
        id={'main-tabs'}
        slot={'bottom'}
        routes={AppRoutes}
      ></TabItem>*/}
      {import.meta.env.VITE_SHOW_COOKIES_CONSENT && <CookieConsent />}
      {import.meta.env.VITE_SHOW_PWA_INSTALLER && <PWA/>}
    </IonApp>
  );
};

export default AppComponent;
