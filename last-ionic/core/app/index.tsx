import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import BrowserUtils from '../classes/utils/BrowserUtils';
import RandomUtils from '../classes/utils/RandomUtils';

// Importar configuraciones centralizadas
import './config';  // Configuraciones centralizadas de la aplicación
import './styles'; // Estilos centralizados
import './types';  // Tipos centralizados

// Páginas
import {
  NotFound,
  ChangePassword,
  Login,
  Menu,
  Recover,
  ResetPassword,
  Signup,
  MainTabs,
  Page,
  Account,
  Home,
  Logout,
  Support  
} from './components';

// Store
import useUserStore from '../classes/stores/user.store';
import useAppStore from '../classes/stores/app.store'

// Classes
import DebugUtils from '../classes/utils/DebugUtils';

const trackingId = process.env.REACT_APP_GA4_TRACKING_ID;

const AppComponent: React.FC = () => {

  const debug = DebugUtils.setDebug(false);
  const { setSessionId } = useAppStore();
  const { darkMode } = useUserStore();
  const [ theme, setTheme ] = useState<string>('dark-mode');

  useEffect(() => {
    setTheme(darkMode ? 'dark-theme' : '');
  }, [darkMode]);

  useEffect(() => {
    if (trackingId) {
      // Inyectar el script de Google Analytics dinámicamente
      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
      script.async = true;
      document.head.appendChild(script);

      // Configuración de Google Analytics
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push(args);
      }
      gtag('js', new Date());
      gtag('config', trackingId);
    }
  }, [trackingId]);

  useEffect(()=>{
    BrowserUtils.updatePageTitle('New Page Title');
    setSessionId(RandomUtils.getRandomUUID());
  },[])



  return (
    <IonApp className={theme}>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/tabs" render={() => <MainTabs />} />
            <Route path="/:slug" component={Page} />
            <Route path="/tabs/home/:id" render={() => <MainTabs />} />
            <Route path="/tabs/:slug" render={() => <MainTabs />} />
            <Route path="/account" component={Account} />
            <Route path="/support" component={Support} />
            <Route path="/logout" render={() => <Logout />} />
            <Route path="/login" component={Login} />
            <Route path="/sign-up" component={Signup} />
            <Route path="/reset" component={ResetPassword} />
            <Route path="/recover" component={Recover} />
            <Route path="/change-password" component={ChangePassword} />
            <Route path="/" component={Home} exact />
            <Route path="/not-found" component={NotFound} />
            <Route component={NotFound} />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default AppComponent;
