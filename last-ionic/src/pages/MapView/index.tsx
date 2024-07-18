import React from 'react'
import Map from '../../components/Map'
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonPage } from '@ionic/react'
import { Location } from '../../reducer/models/Location'
import { connect } from '../../reducer/src/connect'
import * as selectors from '../../reducer/src/selectors'
import '../../styles/index.scss'

// Component Reducer
import { OwnProps, ComponentProps, StateProps, DispatchProps, mapStateToProps, mapDispatchToProps } from './reducer'

const MapView: React.FC<ComponentProps> = ({
  locations,
  mapCenter   
}) => {
  return (
  <IonPage id="map-view">
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton></IonMenuButton>
        </IonButtons>
        <IonTitle>Map</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent class="map-page">
      <Map locations={locations} mapCenter={mapCenter} />
    </IonContent>
  </IonPage>
)}

export default connect<OwnProps, StateProps, DispatchProps>({ mapStateToProps, mapDispatchToProps, component: MapView });
