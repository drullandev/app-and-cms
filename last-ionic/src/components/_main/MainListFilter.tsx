import * as AppConst from '../../config/env'
import React from 'react'
import { getMode } from '@ionic/core'
import { IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonContent, IonList, IonListHeader, IonItem, IonLabel, IonCheckbox, IonFooter, IonIcon } from '@ionic/react'
import { logoAngular, call, document, logoIonic, hammer, restaurant, cog, colorPalette, construct, compass } from 'ionicons/icons'
import useSessionStore from '../../stores/sessions.store'

interface OwnProps {
  onDismissModal: () => void
}

const SessionListFilter: React.FC<OwnProps> = ({ onDismissModal }) => {
  const ios = getMode() === 'ios'
  
  // Obtener estado y funciones del store de Zustand
  const { allTracks, filteredTracks, updateFilteredTracks, setAllTracks } = useSessionStore()

  const toggleTrackFilter = (track: string) => {
    if (filteredTracks.includes(track)) {
      updateFilteredTracks(filteredTracks.filter(x => x !== track))
    } else {
      updateFilteredTracks([...filteredTracks, track])
    }
  }

  const handleDeselectAll = () => {
    updateFilteredTracks([])
  }

  const handleSelectAll = () => {
    updateFilteredTracks([...allTracks])
  }

  const iconMap: { [key: string]: any } = {
    'Angular': logoAngular,
    'Documentation': document,
    'Food': restaurant,
    'Ionic': logoIonic,
    'Tooling': hammer,
    'Design': colorPalette,
    'Services': cog,
    'Workshop': construct,
    'Navigation': compass,
    'Communication': call
  }

  return (
    <>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot='start'>
            {ios ? (
              <IonButton onClick={onDismissModal}>Cancel</IonButton>
            ) : (
              <IonButton onClick={handleDeselectAll}>Reset</IonButton>
            )}
          </IonButtons>
          <IonTitle>Filter</IonTitle>
          <IonButtons slot='end'>
            <IonButton onClick={onDismissModal} strong>Done</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList lines={ios ? 'inset' : 'full'}>
          <IonListHeader>Tracks</IonListHeader>
          {allTracks.map((track, index) => (
            <IonItem key={track}>
              {ios && <IonIcon slot='start' icon={iconMap[track]} color='medium' />}
              <IonLabel>{track}</IonLabel>
              <IonCheckbox
                onIonChange={() => toggleTrackFilter(track)}
                checked={filteredTracks.includes(track)}
                color='primary'
                value={track}
              />
            </IonItem>
          ))}
        </IonList>
      </IonContent>

      {ios && (
        <IonFooter>
          <IonToolbar>
            <IonButtons slot='start'>
              <IonButton onClick={handleDeselectAll}>Deselect All</IonButton>
            </IonButtons>
            <IonButtons slot='end'>
              <IonButton onClick={handleSelectAll}>Select All</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonFooter>
      )}
    </>
  )
}

export default SessionListFilter
