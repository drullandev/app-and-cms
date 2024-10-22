import { IonApp } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router'; // Importar IonReactRouter
import React, { useEffect, useState } from 'react';

import useUserStore from '../integrations/stores/user.store';
import AppRouter, { IAppRoute } from '../components/main/AppRouter';
import MainListItem from '../components/main/Menu/SidenavItem';
import CookieConsent from '../pages/main/CookieConsent';
import PWA from '../components/main/PWA';
import { appRoutes, getMenuRoutes, getTabRoutes } from './config/routes';
import './config/config';
import './styles';
import './types';
import { showCookiesConsent, showPwaInstaller } from './config/env';
import Overlay from '../components/main/Overlay';
import { TabItem } from './components';

const AppComponent: React.FC = () => {
  const { darkMode } = useUserStore();
  const [theme, setTheme] = useState<string>('dark-mode');
  const [tabRoutes, setTabRoutes] = useState<IAppRoute[]>([]);

  // Setting the initial theme
  useEffect(() => {
    setTheme(darkMode ? 'dark-theme' : '');
  }, [darkMode]);



  // Rendering the app main routes
  return (
    <IonApp className={theme}>
      <IonReactRouter>  {/* Asegúrate de envolver el contenido en IonReactRouter */}
        <AppRouter
          id={'main'}
          appRoutes={getMenuRoutes()}
          component={MainListItem}
        />
        {showCookiesConsent && <CookieConsent />}
        {showPwaInstaller && <PWA />}

      </IonReactRouter>
    </IonApp>
  );
};

export default AppComponent;
