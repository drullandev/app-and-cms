import React from 'react'
import { IonToolbar, IonButtons, IonMenuButton, IonTitle } from '@ionic/react'

export interface HeaderProps {
  label?: any
  slot?: string
  loading?:boolean
}

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