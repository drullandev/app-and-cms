import React from 'react'
import { moonOutline } from 'ionicons/icons'
import { IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle } from '@ionic/react'

import { Page } from '../../interfaces/models/Page'
import { routes } from '../../config/routes'

import './style.css'

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

          <IonListHeader>Account</IonListHeader>

          {true
            ? renderMenuItems(routes.loggedOutPages)
            : renderMenuItems(routes.loggedInPages)}

          <IonItem>

            <IonIcon
              slot="start"
              icon={moonOutline}
            ></IonIcon>

          </IonItem>

        </IonList>

      </IonContent>

    </IonMenu>
  );
  
};

export default Menu;
