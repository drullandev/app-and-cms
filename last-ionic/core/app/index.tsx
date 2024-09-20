import React, { useEffect, useState } from 'react';
import { IonApp } from '@ionic/react';

import RandomUtils from '../classes/utils/RandomUtils';
import DebugUtils from '../classes/utils/DebugUtils';

import useUserStore from '../classes/stores/user.store';
import useAppStore from '../classes/stores/app.store';

import AppRouter from '../components/main/AppRouter';
import MainListItem from '../components/main/Menu/SidenavItem';
import TabItem from '../components/main/Menu/TabItem';

import CookieConsent from '../pages/main/CookieConsent';
import PWA from '../components/main/PWA';

import { AppRoutes } from './config/routes';

import './config';
import './styles';
import './types';

const AppComponent: React.FC = () => {
  const debug = DebugUtils.setDebug(false);
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
      {process.env.REACT_APP_SHOW_COOKIES_CONSENT && <CookieConsent />}
      {process.env.REACT_APP_SHOW_PWA_INSTALLER && <PWA/>}
    </IonApp>
  );
};

export default AppComponent;
