import React from 'react'
import { IonToolbar, IonButtons, IonMenuButton, IonTitle, IonProgressBar, IonHeader } from '@ionic/react'
import { connect } from '../../../data/connect'

import { HeaderProps } from './interfaces/HeaderProps'

interface StateProps {}
interface DispatchProps {}
interface Header extends HeaderProps, StateProps, DispatchProps {}

const Header: React.FC<Header> = ({
  label,
  slot,
  loading
}) =>
  <IonHeader>
    <IonToolbar>
      <IonButtons slot={slot ? slot : 'start'}>
        <IonMenuButton></IonMenuButton>
      </IonButtons>
      <IonTitle>{label}</IonTitle>
      <IonProgressBar style={{opacity: ! loading ? '0' : '100'}} type='indeterminate' reversed={true}></IonProgressBar>
    </IonToolbar>  
  </IonHeader>

export default connect<Header>({

  mapStateToProps: (state) => ({
    loading: state.user.loading,
  }),

  mapDispatchToProps: {},

  component: Header

})