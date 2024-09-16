import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';

import DebugUtils from '../../../classes/utils/DebugUtils';
import Looper from '../../../components/main/Looper';

import { AppRoutes, IAppRoute } from '../../../app/config/routes'

/** 
 * Componente principal de la aplicación que carga rutas desde la configuración
 */
const Routing: React.FC = () => {

  const debug = DebugUtils.setDebug(false);

  const MenuRouteRow = (route: IAppRoute, index: number) => {

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

  return (
    <IonRouterOutlet id="main">
      <Switch>
        <Looper items={AppRoutes} renderItem={MenuRouteRow}/>
      </Switch>
    </IonRouterOutlet>
  );
};

export default Routing;
