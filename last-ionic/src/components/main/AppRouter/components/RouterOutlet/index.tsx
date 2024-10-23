import { IonRouterOutlet } from "@ionic/react";
import { Redirect, Route, Switch } from "react-router-dom";
import Looper from "../../../../utils/Looper";
import React from "react";
import { IAppRoute } from "../../types";

export interface IRouterOutlet {
  id: string;
  routes: IAppRoute[];
}

const RouteRow = (route: IAppRoute, index: number) => {
  if (route.redirect && route.to) {
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
}

const RouterOutlet: React.FC<IRouterOutlet> = ({ id, routes }) => (
  <IonRouterOutlet id={id}>
    <Switch>
      <Looper items={routes} renderItem={RouteRow} />
    </Switch>
  </IonRouterOutlet>
);

export default React.memo(RouterOutlet);