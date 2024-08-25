import React from 'react'
import { hammer, moonOutline } from 'ionicons/icons'
import { IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle } from '@ionic/react'

import { routes } from '../../config/routes'
import useUserStore from '../../stores/user.store'
import '../../styles/Menu.css'
import './style.css'
import { Page } from '../../interfaces/models/Page'

const Menu: React.FC<any> = () => {

  const { isLoggedIn } = useUserStore();

  const renderlistItems = (list: Page[])=>{

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
    <IonMenu type="overlay" disabled={true} menuId="main" contentId="main">

      <IonContent forceOverscroll={false}>

        <IonList role="list" lines="none">
          {renderlistItems(routes.appPages)}
        </IonList>

        <IonList role="list" lines="none">

          <IonListHeader>Account</IonListHeader>

          {isLoggedIn
            ? renderlistItems(routes.loggedInPages)
            : renderlistItems(routes.loggedOutPages)}

          <IonItem>

            <IonIcon
              slot="start"
              icon={moonOutline}
            ></IonIcon>

          </IonItem>

        </IonList>

        <IonList lines="none">

          <IonListHeader>Tutorial</IonListHeader>

          <IonItem
            button
            onClick={() => {}}
          >
            <IonIcon slot="start" icon={hammer} />
            <IonLabel>Show Tutorial</IonLabel>
          </IonItem>

        </IonList>

      </IonContent>

    </IonMenu>
  );
  
};

export default Menu;
