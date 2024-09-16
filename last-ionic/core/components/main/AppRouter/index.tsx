import React from 'react';
import { Route, Redirect, Switch, RouteComponentProps } from 'react-router-dom';
import { IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Looper from '../Looper';
import Menu from '../Menu';

export interface IAppRoute {
  title: string;
  path?: string;
  icon: string;
  component?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  logged: boolean;
  menu: boolean;
  exact?: boolean;
  redirect?: boolean;
  from?: string;
  to?: string;
}

export interface IAppRouter {
  id: string;
  appRoutes: IAppRoute[];
}

/** 
 * Componente de enrutado principal para la aplicación.
 */
const AppRouter: React.FC<IAppRouter> = ({ id, appRoutes }) => {

  // Función para renderizar cada ruta
  const MenuRouteRow = (route: IAppRoute, index: number) => {
    if (route.redirect && route.from && route.to) {
      return <Redirect key={index} from={route.from} to={route.to} />;
    }

    if (route.path && route.component) {
      return (
        <Route
          key={index}
          path={route.path}
          component={route.component}
          exact={route.exact ?? true} 
        />
      );
    }

    return null; 
  };

  return (
    <IonReactRouter>
      <IonSplitPane contentId={id}>
        <Menu appRoutes={appRoutes} />
        <IonRouterOutlet id={id}>
          <Switch>
            {appRoutes.map(MenuRouteRow)}
          </Switch>
        </IonRouterOutlet>
      </IonSplitPane>
    </IonReactRouter>
  );
};

export const RouteRows = (route: IAppRoute, index: number) => {

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
}


export default AppRouter;
