import { IonRouterOutlet } from "@ionic/react";
import { Redirect, Route, Switch } from "react-router";
import { IAppRoute } from "../..";
import Looper from "../../../../utils/Looper";

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
      {/*<Looper items={routes} renderItem={RouteRow} />*/}
      {routes.map(RouteRow)}
    </Switch>
  </IonRouterOutlet>
);

export default RouterOutlet;