import React from 'react'
import { IonToolbar, IonButtons, IonMenuButton, IonTitle, IonProgressBar, IonHeader } from '@ionic/react'
import { connect } from '../../../reducer/src/connect'
import { ComponentProps, mapStateToProps, mapDispatchToProps } from './types'

const Header: React.FC<ComponentProps> = ({
  label,
  slot,
  loading
}) => {

  return <IonHeader>
    <IonProgressBar style={{opacity: ! loading ? '0' : '100'}} type='indeterminate' reversed={true}></IonProgressBar>
    <IonToolbar>
      <IonButtons slot={slot ? slot : 'start'}>
        <IonMenuButton></IonMenuButton>
      </IonButtons>
      <IonTitle>{label}</IonTitle>
    </IonToolbar>  
  </IonHeader>

}


export default connect<ComponentProps>({
  mapStateToProps,
  mapDispatchToProps,
  component: Header
});