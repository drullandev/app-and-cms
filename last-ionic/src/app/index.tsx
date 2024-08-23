import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

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
  Support,
  Tutorial
} from './components';

// Store
import useUserStore from '../stores/user.store';

// Classes
import DebugUtil from '../classes/utils/DebugUtils';
import Logger from '../classes/utils/LoggerUtils';

const AppComponent: React.FC = () => {

  const debug = DebugUtil.setDebug(false);
  
  const { darkMode } = useUserStore();
  const [ theme, setTheme ] = useState<string>('dark-mode');

  useEffect(() => {
    if (debug) Logger.log(' • Loading App!');
    setTheme(darkMode ? 'dark-theme' : '')
  }, [darkMode]);

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
            <Route path="/tutorial" component={Tutorial} />
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
