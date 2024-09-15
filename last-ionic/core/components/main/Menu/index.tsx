import React from 'react'
import { moonOutline } from 'ionicons/icons'
import { IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle } from '@ionic/react'

import { routes } from '../../../app/config/routes'

import './style.css'

export interface Page {
  title: string;
  path: string;
  icon: string;
  routerDirection?: string;
}

const Menu: React.FC<any> = () => {

  const renderMenuItems = (list: Page[])=>{

    return list
      .filter((route) => !!route.path)
      .map((p: Page) => (

        <IonMenuToggle key={p.title} auto-hide="false">
          <IonItem
            detail={false}
            routerLink={p.path}
            routerDirection="none"
          >
            <IonIcon slot="start" icon={p.icon} />
            <IonLabel>{p.title}</IonLabel>
          </IonItem>
        </IonMenuToggle>
        
      ));
  }

  return (
    <IonMenu type="overlay" disabled={false} menuId="main" contentId="main">

      <IonContent forceOverscroll={false}>

        <IonList role="list" lines="none">
          {renderMenuItems(routes.appPages)}
        </IonList>

        <IonList role="list" lines="none">
          
          {true
            ? renderMenuItems(routes.loggedOutPages)
            : renderMenuItems(routes.loggedInPages)}



        </IonList>

      </IonContent>

    </IonMenu>
  );
  
};

export default Menu;
