import React from 'react'
import { IonContent } from '@ionic/react'

import Map from '../Map'

import { Location } from '../../reducer/models/Location'

import { connect } from '../../reducer/src/connect'
import * as selectors from '../../reducer/src/selectors'


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
