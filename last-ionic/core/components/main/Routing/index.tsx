import React, { useEffect } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';

import DebugUtils from '../../../classes/utils/DebugUtils';
import Looper from '../../../components/main/Looper';

import { AppRoutes } from '../../../app/config/routes'
import { IAppRoute } from '../../../components/main/AppRouter';
/** 
 * Componente principal de la aplicación que carga rutas desde la configuración
 */
const Routing: React.FC = () => {

  const MenuRouteRow = (route: IAppRoute, index: number) => {
    return route.redirect && route.to 
    ? <Redirect key={index} from={route.from} to={route.to} />
    : route.path && route.component 
      ? <Route
          key={index}
          path={route.path}
          component={route.component}
          exact={route.exact}
        />
      : null;
  }

  return (
    <IonRouterOutlet id="main">
      <Switch>
        <Looper items={AppRoutes} renderItem={MenuRouteRow}/>
      </Switch>
    </IonRouterOutlet>
  );
};

export default Routing;
