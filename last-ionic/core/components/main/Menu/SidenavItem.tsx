import React from 'react';
import { IonIcon, IonItem, IonLabel, IonMenuToggle } from '@ionic/react';
import { IAppRoute } from '../AppRouter';

interface ISidenavItem {
  route: IAppRoute;
}

/**
 * SidenavItem component that renders a single item in the navigation menu.
 */
const SidenavItem: React.FC<ISidenavItem> = ({ route }) => {
  return (
    <IonMenuToggle key={route.title} auto-hide="false">
      <IonItem detail={false} routerLink={route.path} routerDirection="none">
        <IonIcon slot="start" icon={route.icon} />
        <IonLabel>{route.title}</IonLabel>
      </IonItem>
    </IonMenuToggle>
  );
};

export default React.memo(SidenavItem);

/**
 * Componente que renderiza un `SidenavItem`.
 */
export const SidenavItemComponent: React.FC<{ route: IAppRoute }> = ({ route }) => {
  return <SidenavItem key={route.path} route={route} />;
};
