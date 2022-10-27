import React from 'react'
import { IonToolbar, IonButtons, IonMenuButton, IonTitle, IonProgressBar } from '@ionic/react'
import { setLoading } from '../../../data/sessions/sessions.actions'
import { connect } from '../../../data/connect'

import { HeaderProps } from './interfaces/HeaderProps'

interface StateProps {
  loading: boolean
}

interface DispatchProps {
  setLoading: typeof setLoading
}

interface Header extends HeaderProps, StateProps, DispatchProps { }

const Header: React.FC<Header> = ({ label, slot, loading }) => (
  <IonToolbar>
    <IonButtons slot={slot ? slot : 'start'}>
      <IonMenuButton></IonMenuButton>
    </IonButtons>
    <IonTitle>{label}</IonTitle>
    <IonProgressBar style={{opacity: ! loading ? '0' : '100'}} type='indeterminate' reversed={true}></IonProgressBar>
  </IonToolbar>  
)

export default connect<Header>({

  mapStateToProps: (state) => ({
    loading: state.user.loading,
  }),

  mapDispatchToProps: {
    setLoading,
  },

  component: Header

})