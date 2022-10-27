import React from 'react'
import { IonToolbar, IonButtons, IonMenuButton, IonTitle } from '@ionic/react'
import { HeaderProps } from './interfaces/HeaderProps'

/**
 * 
 * @param param0 
 * @returns 
 */
const ToolBar: React.FC<HeaderProps> = ({ label, slot }) => (
  <IonToolbar>
    <IonButtons slot={slot ? slot : 'start'}>
      <IonMenuButton></IonMenuButton>
    </IonButtons>
    <IonTitle>{label}</IonTitle>
  </IonToolbar>
)

export default ToolBar