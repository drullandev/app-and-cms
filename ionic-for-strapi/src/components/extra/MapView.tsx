import React from 'react'
import { IonContent } from '@ionic/react'

import Map from '../core/main/Map'

import { Location } from '../../models/Location'

import { connect } from '../../data/connect'
import * as selectors from '../../data/selectors'


interface OwnProps { }

interface StateProps {
  locations: Location[]
  mapCenter: Location
}

interface DispatchProps { }

interface MapViewProps extends OwnProps, StateProps, DispatchProps { }

const MapView: React.FC<MapViewProps> = ({ locations, mapCenter }) => (
  <IonContent class='map-page'>
    <Map locations={locations} mapCenter={mapCenter} />
  </IonContent>
)

export default connect<OwnProps, StateProps, DispatchProps>({

  mapStateToProps: (state) => ({
    locations: state.data.locations,
    mapCenter: selectors.mapCenter(state)
  }),

  component: MapView

})
