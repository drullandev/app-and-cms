import React, { useEffect, useState } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import BrowserUtils from '../classes/utils/BrowserUtils';
import RandomUtils from '../classes/utils/RandomUtils';
import DebugUtils from '../classes/utils/DebugUtils';

import useUserStore from '../classes/stores/user.store';
import useAppStore from '../classes/stores/app.store';

import Menu from '../components/main/Menu';
import { AppRoutes } from './config/routes';

import './config';
import './styles';
import './types';

/** 
 * Componente principal de la aplicación que carga rutas desde la configuración
 */
const AppComponent: React.FC = () => {
  const debug = DebugUtils.setDebug(false);
  const { setSessionId } = useAppStore();
  const { darkMode } = useUserStore();
  const [theme, setTheme] = useState<string>('dark-mode');

  useEffect(() => {
    setTheme(darkMode ? 'dark-theme' : '');
    BrowserUtils.updatePageTitle('New Page Title');
    setSessionId(RandomUtils.getRandomUUID());
  }, [darkMode, setSessionId]);

  return (
    <IonApp className={theme}>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu /> {/* Menú lateral */}
          <IonRouterOutlet id="main">
            <Switch>
              {/* Mapeo dinámico de las rutas desde la configuración */}
              {AppRoutes.map((route, index) => {

                if (route.redirect && route.to) {
                  return <Redirect key={index} from={route.from} to={route.to} />;
                }

                if (route.path && route.component) {
                  return (
                    <Route
                      key={index}
                      path={route.path}
                      component={route.component}
                      exact={route.exact}
                    />
                  );
                }

                return null;
              })}
            </Switch>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default AppComponent;
