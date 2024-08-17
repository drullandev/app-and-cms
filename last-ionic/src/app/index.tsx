import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

// Importar configuraciones centralizadas
import './config';  // Configuraciones centralizadas de la aplicación
import './styles'; // Estilos centralizados
import './types';  // Tipos centralizados

// Páginas
import { NotFound, Account, ChangePassword, Home, Login, Logout, MainTabs, Menu, Page, Recover, ResetPassword, Signup, Support, TestForm, Tutorial } from './components';

// Clases
import DebugUtil from './../classes/DebugUtil';
import Logger from '../classes/LoggerClass';

// Zustand Store
import useStore from '../store/useStore';

const AppComponent: React.FC = () => {
  
  // Configura el modo de depuración
  let debug = DebugUtil.setDebug(false);
  
  const { darkMode } = useStore();

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
    <IonApp className={darkMode ? '' : ''}>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/tabs" render={() => <MainTabs />} />
            <Route path="/:slug" component={Page} />
            <Route path="/tabs/home/:id" render={() => <MainTabs />} />
            <Route path="/tabs/:slug" render={() => <MainTabs />} />
            <Route path="/tutorial" component={Tutorial} />
            <Route path="/login" component={Login} />
            <Route path="/test" component={TestForm} />
            <Route path="/sign-up" component={Signup} />
            <Route path="/reset" component={ResetPassword} />
            <Route path="/recover" component={Recover} />
            <Route path="/support" component={Support} />
            <Route path="/account" component={Account} />
            <Route path="/change-password" component={ChangePassword} />
            <Route path="/logout" render={() => <Logout />} />
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
