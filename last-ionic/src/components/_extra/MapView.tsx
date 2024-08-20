import React from 'react';
import { IonContent } from '@ionic/react';

import Map from '../Map';
import { Location } from '../../stores/models/Location';
import useUserStore from '../../stores/user.store';

const MapView: React.FC = () => {
  const { locations, mapCenter } = useUserStore();
  
  // Llamar a la función mapCenter para obtener el valor
  const currentMapCenter = mapCenter();

  return (
    <IonContent class='map-page'>
      <Map locations={locations} mapCenter={currentMapCenter} />
    </IonContent>
  );
}

export default MapView;
