import { IonApp } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import React, { useEffect, useState } from 'react';

import PWA from '../components/main/PWA';
import AppRouter from '../components/main/AppRouter';
import { getMenuRoutes } from './config/routers';
import CookieConsent from '../pages/main/CookieConsent';
import useUserStore from '../integrations/stores/user.store';
import MainListItem from '../components/main/Menu/SidenavItem';
import { showCookiesConsent, showPwaInstaller } from './config/env';
import './config/config';
import './styles';
import './types';

const AppComponent: React.FC = () => {

  const { darkMode } = useUserStore();
  const [theme, setTheme] = useState<string>('dark-mode');

  useEffect(() => {
    setTheme(darkMode ? 'dark-theme' : '');
  }, [darkMode]);

  return (
    <IonApp className={theme}>
      <IonReactRouter>
        <AppRouter id={'main'} appRoutes={getMenuRoutes()} component={MainListItem}/>
        {showCookiesConsent && <CookieConsent />}
        {showPwaInstaller && <PWA />}
      </IonReactRouter>
    </IonApp>
  );
};

export default AppComponent;
