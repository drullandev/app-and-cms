import React, { useEffect } from 'react';
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
/*   Account,
  Home,
  Logout,
  Support,
  Tutorial */
} from './components';

// Clases
import DebugUtil from './../classes/DebugUtil';
import Logger from '../classes/LoggerClass';

// Zustand Store
import useUserStore from '../stores/user.store';

const AppComponent: React.FC = () => {
  
  // Configura el modo de depuración
  let debug = DebugUtil.setDebug(false);
  
  const { darkMode } = useUserStore();

  useEffect(() => {
    Logger.log(' • DarkMode was toggled!', darkMode);
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  // Inicializa configuraciones y datos
  useEffect(() => {
    Logger.log(' • Loading App!');
  }, []);

  return (
    <IonApp className={darkMode ? 'dark-theme' : ''}>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            {/*
            <Route path="/tabs" render={() => <MainTabs />} />
            <Route path="/:slug" component={Page} />
            <Route path="/tabs/home/:id" render={() => <MainTabs />} />
            <Route path="/tabs/:slug" render={() => <MainTabs />} />
            <Route path="/tutorial" component={Tutorial} />
            <Route path="/account" component={Account} />
            <Route path="/support" component={Support} />
            <Route path="/logout" render={() => <Logout />} />
            <Route path="/" component={Home} exact />
            */}
            <Route path="/login" component={Login} />
            <Route path="/sign-up" component={Signup} />
            <Route path="/reset" component={ResetPassword} />
            <Route path="/recover" component={Recover} />
            <Route path="/change-password" component={ChangePassword} />
            <Route path="/not-found" component={NotFound} />
            <Route component={NotFound} />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default AppComponent;
