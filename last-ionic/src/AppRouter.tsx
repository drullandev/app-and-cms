// AppRouter.tsx
import React from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Menu from './components/core/main/Menu';

interface AppRouterProps {
  routes: RouteProps[];
  darkMode: boolean;
}

const AppRouter: React.FC<AppRouterProps> = ({ routes, darkMode }) => {
  return (
    <IonApp className={`${darkMode ? 'dark-theme' : ''}`}>
      <IonReactRouter>
        <IonSplitPane contentId='main'>
          <Menu />
          <IonRouterOutlet id='main'>
            {routes.map((route, index) => (
              <Route key={index} {...route} />
            ))}
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default AppRouter;
