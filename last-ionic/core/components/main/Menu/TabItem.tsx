import React from 'react';
import { Route } from 'react-router';
import { 
  IonTabs, 
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonRouterOutlet
} from '@ionic/react';

import Icon from '../../extra/Icon';
import { IAppRoute } from '../AppRouter';
import Looper from '../Looper';

interface ITabItem {
  id: string;
  slot?: 'top' | 'bottom'; // Define the slot position as top or bottom, with bottom as default
  routes: IAppRoute[];
}

export interface ITabButton {
  name: string;
  href: string;
  icon: string;
  label: string;
}

/**
 * TabItem component to render tabs and manage the routes within IonTabs.
 */
const TabItem: React.FC<ITabItem> = ({ id, slot = 'bottom', routes }) => {

  // Render a single tab button
  const renderTabButton = (route: IAppRoute, index: number) => (
    <IonTabButton
      key={index}
      tab={route.path} // `tab` should be a unique identifier for each tab
      href={route.path} // Navigation link to the tab's route
    >
      <Icon name={route.icon ?? ''} /> {/* Optional icon for the tab */}
      <IonLabel>{route.title}</IonLabel>
    </IonTabButton>
  );

  // Render the routes in IonRouterOutlet for each tab
  const renderRoute = (route: IAppRoute, index: number) => (
    <Route
      key={index}
      path={route.path}
      component={route.component}
      exact={route.exact ?? true}
    />
  );

  return (
    <IonTabs>
      <IonRouterOutlet id={id}>
        <Looper items={routes} renderItem={renderRoute} />
      </IonRouterOutlet>
      <IonTabBar slot={slot}>
        <Looper items={routes} renderItem={renderTabButton} />
      </IonTabBar>
    </IonTabs>
  );
};

export default TabItem;
