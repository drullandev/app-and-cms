import React from 'react';
import { IonContent, IonList, IonMenu } from '@ionic/react';

import useUserStore from '../../../integrations/stores/user.store'; // Assuming there is a store for managing user state

import './style.css';
import { IAppRoute } from '../AppRouter/types';

export interface IMenu {
  id: string;
  routes: IAppRoute[];
  component: React.ComponentType<{ route: IAppRoute }>; // Ensures the component receives a 'route' as a prop
}

/**
 * Menu component that dynamically renders navigation items 
 * based on user authentication status and passed routes.
 */
const Menu: React.FC<IMenu> = ({ id, routes, component: Component }) => {
  
  // Retrieve the logged status from the user store
  const { logged } = useUserStore();

  /**
   * Filters and renders the menu items based on user authentication status and route configuration.
   * @param list - Array of route objects that need to be displayed in the menu.
   * @returns JSX elements for each menu item.
   */
  const renderSidenavItems = (list: IAppRoute[] = []): JSX.Element[] => {
    return (
      list
        .filter((route) => route.menu !== undefined) // Verifica que `menu` esté definido
        .filter((route) => route.logged === logged || route.logged === undefined) // Verifica `logged`
        .map((route) => <Component key={route.title} route={route} />) ?? []
    );
  };

  return (
    <IonMenu type="overlay" disabled={false} menuId={id} contentId={id}>
      <IonContent forceOverscroll={false}>
        <IonList role="list" lines="none">
          {renderSidenavItems(routes)}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
