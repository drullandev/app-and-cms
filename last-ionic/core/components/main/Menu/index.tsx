import React from 'react';
import { IonContent, IonList, IonMenu } from '@ionic/react';

import { IAppRoute } from '../AppRouter';

import useUserStore from '../../../classes/stores/user.store'; // Assuming there is a store for managing user state

import './style.css';

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
  const renderSidenavItems = (list: IAppRoute[]) => {
    return list
      .filter((route) => route.menu) // Only display routes that are marked to be shown in the menu
      .filter((route) => route.logged === logged || !route.logged) // Display routes based on the user's logged-in status
      .map((route) => <Component key={route.title} route={route} />); // Render each route as a menu item using the provided component
  };

  return (
    <IonMenu type="overlay" disabled={false} menuId={id} contentId={id}>
      <IonContent forceOverscroll={false}>
        <IonList role="list" lines="none">
          {renderSidenavItems(routes)} {/* Render the list of menu items */}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
