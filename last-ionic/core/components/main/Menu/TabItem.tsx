import React from 'react';
import { 
  IonTabs, 
  IonTabBar,
  IonTabButton,
  IonLabel
} from '@ionic/react';

import Icon from '../../extra/Icon';
import { IAppRoute } from '../AppRouter';
import Looper from '../../utils/Looper';

interface ITabItem {
  id: string;
  slot?: 'top' | 'bottom'; // Define the slot position as top or bottom, with bottom as default
  routes?: IAppRoute[]; // Opcional porque a veces puede que no lleguen aún las rutas
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
const TabItem: React.FC<ITabItem> = ({ id, slot = 'bottom', routes = [] }) => {

  // Asegurarse de que `routes` sea siempre un array, aunque no lleguen valores
  const tabRoutes = Array.isArray(routes) ? routes.filter(route => route.tab === true) : [];

  // Si no hay rutas con tab: true, no renderizamos nada o mostramos un mensaje
  if (tabRoutes.length === 0) {
    return null; // Alternativamente, puedes devolver un mensaje si lo prefieres
  }

  // Render a single tab button
  const renderTabButton = (route: IAppRoute, index: number) => (
    <IonTabButton
      key={index}
      tab={`tab-${index}`} // Identificador más simple
      href={route.path} // Mantiene el path correcto
    >
      <Icon name={route.icon ?? ''} />
      <IonLabel>{route.title}</IonLabel>
    </IonTabButton>
  );

  return (
    <IonTabs>
      <IonTabBar slot={slot}>
        <Looper items={tabRoutes} renderItem={renderTabButton} />
      </IonTabBar>
    </IonTabs>
  );
};

export default React.memo(TabItem);
