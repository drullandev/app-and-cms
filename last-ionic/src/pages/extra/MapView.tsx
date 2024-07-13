import React from 'react'
import Map from '../../components/Map'
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonPage } from '@ionic/react'
import { Location } from '../../redux/models/Location'
import { connect } from '../../redux/connect'
import * as selectors from '../../redux/selectors'
import '../../styles/index.scss'

interface OwnProps { }

interface StateProps {
  locations: Location[]
  mapCenter: Location
}

interface DispatchProps { }

interface MapViewProps extends OwnProps, StateProps, DispatchProps { }

const MapView: React.FC<MapViewProps> = ({ locations, mapCenter }) => {
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

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    locations: state.data.locations,
    mapCenter: selectors.mapCenter(state)
  }),
  component: MapView
})
