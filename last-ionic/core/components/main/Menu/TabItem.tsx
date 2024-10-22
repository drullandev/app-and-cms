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
import Looper from '../../utils/Looper';

interface ITabItem {
  id: string;
  slot?: 'top' | 'bottom'; // Define the slot position as top or bottom, with bottom as default
  routes: IAppRoute[]; // Asegura que siempre reciba un array de rutas
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

  // Filtrar rutas que tienen `tab: true`
  const tabRoutes = routes.filter(route => route.tab === true);

  // Si no hay rutas con tab: true, no renderizamos nada o mostramos un mensaje
  if (tabRoutes.length === 0) {
    return null; // Alternativamente, puedes devolver un mensaje si lo prefieres
  }

  // Render a single tab button
  const renderTabButton = (route: IAppRoute, index: number) => (
    <IonTabButton
      key={index}
      tab={route.path} // `tab` debe ser un identificador único para cada pestaña
      href={route.path} // Enlace de navegación a la ruta de la pestaña
    >
      <Icon name={route.icon ?? ''} /> {/* Icono opcional para la pestaña */}
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
        <Looper items={tabRoutes} renderItem={renderRoute} />
      </IonRouterOutlet>
      <IonTabBar slot={slot}>
        <Looper items={tabRoutes} renderItem={renderTabButton} />
      </IonTabBar>
    </IonTabs>
  );
};

export default React.memo(TabItem);
