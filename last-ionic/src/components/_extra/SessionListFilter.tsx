import * as AppConst from '../../config/env';
import React from 'react';
import { getMode } from '@ionic/core';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonContent,
  IonList,
  IonListHeader,
  IonItem,
  IonLabel,
  IonCheckbox,
  IonFooter,
  IonIcon,
} from '@ionic/react';
import {
  logoAngular,
  call,
  document,
  logoIonic,
  hammer,
  restaurant,
  cog,
  colorPalette,
  construct,
  compass,
} from 'ionicons/icons';

import useStore from '../../stores/sessions.store';

interface OwnProps {
  onDismissModal: () => void;
}

const SessionListFilter: React.FC<OwnProps> = ({ onDismissModal }) => {
  const ios = getMode() === 'ios';

  // Acceder al estado y acciones usando zustand
  const allTracks = useStore((state) => state.allTracks);
  const filteredTracks = useStore((state) => state.filteredTracks);
  const updateFilteredTracks = useStore((state) => state.updateFilteredTracks);

  const toggleTrackFilter = (track: string) => {
    if (filteredTracks.indexOf(track) > -1) {
      updateFilteredTracks(filteredTracks.filter((x) => x !== track));
    } else {
      updateFilteredTracks([...filteredTracks, track]);
    }
  };

  const handleDeselectAll = () => {
    updateFilteredTracks([]);
  };

  const handleSelectAll = () => {
    updateFilteredTracks([...allTracks]);
  };

  const iconMap: { [key: string]: any } = {
    Angular: logoAngular,
    Documentation: document,
    Food: restaurant,
    Ionic: logoIonic,
    Tooling: hammer,
    Design: colorPalette,
    Services: cog,
    Workshop: construct,
    Navigation: compass,
    Communication: call,
  };

  return (
    <>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            {ios ? (
              <IonButton onClick={onDismissModal}>Cancel</IonButton>
            ) : (
              <IonButton onClick={handleDeselectAll}>Reset</IonButton>
            )}
          </IonButtons>
          <IonTitle>Filter Sessions</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onDismissModal} strong>
              Done
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList lines={ios ? 'inset' : 'full'}>
          <IonListHeader>Tracks</IonListHeader>
          {allTracks.map((track) => (
            <IonItem key={track}>
              {ios && <IonIcon slot="start" icon={iconMap[track]} color="medium" />}
              <IonLabel>{track}</IonLabel>
              <IonCheckbox
                onClick={() => toggleTrackFilter(track)}
                checked={filteredTracks.indexOf(track) !== -1}
                color="primary"
                value={track}
              ></IonCheckbox>
            </IonItem>
          ))}
        </IonList>
      </IonContent>

      {ios && (
        <IonFooter>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={handleDeselectAll}>Deselect All</IonButton>
            </IonButtons>
            <IonButtons slot="end">
              <IonButton onClick={handleSelectAll}>Select All</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonFooter>
      )}
    </>
  );
};

export default SessionListFilter;
