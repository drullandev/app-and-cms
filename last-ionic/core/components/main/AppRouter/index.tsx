import React, { Component } from 'react';
import { Route, Redirect, Switch, RouteComponentProps } from 'react-router-dom';
import { IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Menu from '../Menu';
import SidenavItem, { SidenavItemComponent } from '../Menu/SidenavItem';
import RouterOutlet from './components/RouterOutlet';

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
  tab?: boolean;
}

export interface IAppRouter {
  id: string;
  appRoutes: IAppRoute[];
  component: React.ComponentType<{ route: IAppRoute }>; // Aseguramos que se espera un componente que reciba 'route' como prop
}

/** 
 * Componente de enrutado principal para la aplicación.
 */
const AppRouter: React.FC<IAppRouter> = ({ id, appRoutes, component }) => {
  return (
    <IonReactRouter>
      <IonSplitPane contentId={id}>
        <Menu
          id={id}
          routes={appRoutes}
          component={component}
        />
        <RouterOutlet
          id={id}
          routes={appRoutes}
        />
      </IonSplitPane>
    </IonReactRouter>
  );
};


export default React.memo(AppRouter);
