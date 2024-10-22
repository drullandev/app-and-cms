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

import { getTabRoutes } from '../../../app/config/routes';
import { IAppRoute } from '../AppRouter/types';

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

const TabItem: React.FC<ITabItem> = ({ id, slot = 'bottom' }) => {
  const tabRoutes = getTabRoutes();  // Filtrar rutas que tienen `tab: true`

  // Si no hay rutas con tab: true, no renderizamos nada o mostramos un mensaje
  if (tabRoutes.length === 0) {
    return <p>No tab routes available</p>;  // Mensaje alternativo para comprobar si llegan las rutas
  }

  // Renderizamos los botones de pestañas con .map()
  return (
    <IonTabs>
      <IonRouterOutlet id={id}>
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
            <IonLabel>{route.title}</IonLabel>  {/* Mostrar el título de la pestaña */}
          </IonTabButton>
        ))}
      </IonTabBar>
    </IonTabs>
  );
};

export default React.memo(TabItem);
