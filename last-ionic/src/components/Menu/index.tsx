import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import i18n from '../_extra/i18n'
import { IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonToggle } from '@ionic/react'

import { connect } from '../../reducer/src/connect'
import { setDarkMode } from '../../reducer/data/user/user.actions'

import '../../styles/Menu.css'
import { useTranslation } from 'react-i18next'

import { routes } from '../../config/routes'
import { hammer, moonOutline } from 'ionicons/icons'
import { OwnProps } from '../../app/reducer';

interface Pages {
  title: string;
  path: string;
  icon: string;
  routerDirection?: string;
}

const Menu: React.FC<any> = () => {

  function renderlistItems(list: Pages[]) {
    return list
      .filter((route) => !!route.path)
      .map((p) => (

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
    <IonMenu type="overlay" disabled={true} contentId="main">

      <IonContent forceOverscroll={false}>

        <IonList role="list" lines="none">
          {renderlistItems(routes.appPages)}
        </IonList>

        <IonList role="list" lines="none">

          <IonListHeader>Account</IonListHeader>

          {false
            ? renderlistItems(routes.loggedInPages)
            : renderlistItems(routes.loggedOutPages)}

          <IonItem>

            <IonIcon
              slot="start"
              icon={moonOutline}
            ></IonIcon>

            <IonToggle
              checked={true}
              onIonChange={() => setDarkMode(!true)}
            >
              Dark Mode
            </IonToggle>

          </IonItem>

        </IonList>

        <IonList lines="none">

          <IonListHeader>Tutorial</IonListHeader>

          <IonItem
            button
            onClick={() => {

            }}
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
