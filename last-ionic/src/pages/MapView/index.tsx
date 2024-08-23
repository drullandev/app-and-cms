import React from 'react'
import Map from '../../components/Map'
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonPage } from '@ionic/react'
import { Location } from '../../models/Location'

import '../../styles/index.scss'

// Component Reducer
const MapView: React.FC<any> = ({
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

export default MapView;
