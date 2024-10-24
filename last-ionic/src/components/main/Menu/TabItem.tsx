import React from 'react';
import { Route } from 'react-router';
import { 
  IonTabs, 
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonRouterOutlet,
  IonIcon
} from '@ionic/react';

import { getTabRoutes, hiddenRoutes } from '../../../app/config/routes';
import { IAppRoute } from '../AppRouter/types';
import { IonReactRouter } from '@ionic/react-router';

interface ITabItem {
  id: string;
  slot?: 'top' | 'bottom';
  routes: IAppRoute[];
}

export interface ITabButton {
  name: string;
  href: string;
  icon: string;
  label: string;
}

const TabItem: React.FC<ITabItem> = ({ id, slot = 'bottom' }) => {
  const tabRoutes = getTabRoutes();

  if (tabRoutes.length === 0) {
    return <p>No tab routes available</p>;
  }

  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet id={id}>
          {hiddenRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              component={route.component}
              exact={route.exact ?? true}
            />
          ))}
          {tabRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              component={route.component}
              exact={route.exact ?? true}
            />
          ))}
        </IonRouterOutlet>
        <IonTabBar slot={slot}>
          {tabRoutes.map((route, index) => (
            <IonTabButton
              key={'tab-menu-'+index}
              tab={route.path}
              href={route.path}
            >
              <IonIcon icon={route.icon}/>
              <IonLabel>{route.title}</IonLabel>
            </IonTabButton>
          ))}
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
};

export default React.memo(TabItem);
