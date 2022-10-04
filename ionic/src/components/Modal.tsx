import React, { useState, useRef } from 'react';
import {  IonButtons,  IonButton,  IonModal,  IonHeader,  IonContent,  IonToolbar,  IonTitle,  IonPage,  IonItem,  IonLabel,  IonInput } from '@ionic/react';
import { OverlayEventDetail } from '@ionic/core/components';

const Modal: React.FC = () => {

  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);

  const [message, setMessage] = useState(
    'This modal example uses triggers to automatically open a modal when the button is clicked.'
  );

  let confirm = ()=>{
    modal.current?.dismiss(input.current?.value, 'confirm');
  }

  let onWillDismiss = (ev: CustomEvent<OverlayEventDetail>)=>{
    if (ev.detail.role === 'confirm') {
      setMessage(`Hello, ${ev.detail.data}!`);
    }
  }

  return <IonModal ref={modal} trigger="open-modal" onWillDismiss={(ev: any) => onWillDismiss(ev)}>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonButton onClick={() => modal.current?.dismiss()}>Cancel</IonButton>
        </IonButtons>
        <IonTitle>Welcome</IonTitle>
        <IonButtons slot="end">
          <IonButton strong={true} onClick={() => confirm()}>
            Confirm
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">
      <IonItem>
        <IonLabel position="stacked">Enter your name</IonLabel>
        <IonInput ref={input} type="text" placeholder="Your name" />
      </IonItem>
    </IonContent>
  </IonModal> 

}

export default Modal;