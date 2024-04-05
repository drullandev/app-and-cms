import React from 'react'
import { IonToolbar, IonButtons, IonMenuButton, IonTitle, IonProgressBar, IonHeader } from '@ionic/react'
import { connect } from '../../../data/connect'


import { RouteComponentProps } from 'react-router'

// Component Dependencies
interface OwnProps {
  label: string,
  slot: string
}

interface StateProps {
  loading?: boolean
}

interface DispatchProps {}

interface HeaderProps extends OwnProps, StateProps, DispatchProps {}

const Header: React.FC<HeaderProps> = ({
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

export default connect<HeaderProps>({
  mapStateToProps: (state) => ({
    loading: state.user.loading,
  }),
  mapDispatchToProps: {},
  component: Header
})