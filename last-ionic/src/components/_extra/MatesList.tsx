import React from 'react';
import { IonContent, IonGrid, IonRow, IonCol } from '@ionic/react';

import MatesItem from './MatesItem';

import { Speaker } from '../../interfaces/models/Speaker';
import { Session } from '../../interfaces/models/Schedule';

import useStore from '../../stores/sessions.store';

interface OwnProps {}

const SpeakerList: React.FC<OwnProps> = () => {
  // Usamos Zustand para acceder al estado
  const speakers = useStore((state) => state.speakers);
  const speakerSessions = useStore((state) => state.speakerSessions);

  return (
    <IonContent>
      <IonGrid fixed>
        <IonRow>
          {speakers.map((speaker) => (
            <IonCol size="12" size-md="6" key={speaker.id}>
              <MatesItem
                key={speaker.id}
                speaker={speaker}
                sessions={speakerSessions[speaker.name]}
              />
            </IonCol>
          ))}
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

export default React.memo(SpeakerList);
