import React from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import { IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Menu from '../Menu';
import RouterOutlet from './components/RouterOutlet';
import TabItem from '../Menu/TabItem';
import Looper from '../../utils/Looper';
import { 
  IonTabs, 
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonRouterOutlet
} from '@ionic/react';
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
  isHome?: boolean;
}

export interface IAppRouter {
  id: string;
  appRoutes: IAppRoute[];
  component: React.ComponentType<{ route: IAppRoute }>; // Aseguramos que se espera un componente que reciba 'route' como prop
}

  // Render the routes in IonRouterOutlet for each tab
  const renderRoute = (route: IAppRoute, index: number) => (
    <Route
      key={index}
      path={route.path}
      component={route.component}
      exact={route.exact ?? true}
    />
  );

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
      <IonRouterOutlet id={'tab-'+id}>
        <Looper items={appRoutes} renderItem={renderRoute} />
      </IonRouterOutlet>
        <RouterOutlet
          id={id}
          routes={appRoutes}
        />
      </IonSplitPane>
    </IonReactRouter>
  );
};


export default React.memo(AppRouter);
