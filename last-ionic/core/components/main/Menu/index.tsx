import React from 'react';
import { IonContent, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonMenuToggle } from '@ionic/react';
import { AppRoutes, IAppRoute } from '../../../app/config/routes'; // No necesitas `RenderRoutes` aquí

import useUserStore from '../../../classes/stores/user.store'; // Suponiendo que tienes un store para el estado del usuario

import './style.css';

/**
 * Menu Component to render navigation items based on the user's authentication status.
 */
const Menu: React.FC = () => {
  const { logged } = useUserStore();

  /**
   * Renders the menu items.
   * @param list - The list of pages to display.
   * @returns JSX elements for menu items.
   */
  const renderMenuItems = (list: IAppRoute[]) => {
    return list
      .filter((route) => route.menu) // Filtra los elementos que deben aparecer en el menú
      .filter((route) => route.logged === logged || !route.logged) // Filtra basado en si el usuario está logueado
      .map((p: IAppRoute) => (
        <IonMenuToggle key={p.title} auto-hide="false">
          <IonItem detail={false} routerLink={p.path} routerDirection="none">
            <IonIcon slot="start" icon={p.icon} />
            <IonLabel>{p.title}</IonLabel>
          </IonItem>
        </IonMenuToggle>
      ));
  };

  return (
    <IonMenu type="overlay" disabled={false} menuId="main" contentId="main">
      <IonContent forceOverscroll={false}>
        <IonList role="list" lines="none">
          {renderMenuItems(AppRoutes)} {/* Renderiza los ítems del menú */}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
