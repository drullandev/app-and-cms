import React from 'react'
import { IonToolbar, IonButtons, IonMenuButton, IonTitle, IonProgressBar, IonHeader } from '@ionic/react'
import { connect } from '../../../reducer/src/connect'
import { ComponentProps, mapStateToProps, mapDispatchToProps } from './types'

const Header: React.FC<ComponentProps> = ({
  label,
  slot,
  loading
}) => (
  <IonHeader>
    <IonToolbar>
      <IonButtons slot={slot ? slot : 'start'}>
        <IonMenuButton></IonMenuButton>
      </IonButtons>
      <IonTitle>{label}</IonTitle>
      <IonProgressBar style={{opacity: ! loading ? '0' : '100'}} type='indeterminate' reversed={true}></IonProgressBar>
    </IonToolbar>  
  </IonHeader>
);

export default connect<ComponentProps>({
  mapStateToProps,
  mapDispatchToProps,
  component: Header
});