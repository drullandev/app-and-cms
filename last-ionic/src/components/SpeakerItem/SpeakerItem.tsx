import React from 'react';
import { Session } from '../../stores/models/Schedule';
import { Speaker } from '../../stores/models/Speaker';
import { IonCard, IonCardHeader, IonItem, IonLabel, IonAvatar, IonCardContent, IonList } from '@ionic/react';
import useUserStore from '../../stores/user.store';


interface SpeakerItemProps {
  speaker: Speaker;
  sessions: Session[];
}

const SpeakerItem: React.FC<any> = () => {
  const { speaker, sessions } = useUserStore();
  return (
    <>
      <IonCard className="speaker-card">
        <IonCardHeader>
          <IonItem button detail={false} lines="none" className="speaker-item" routerLink={`/tabs/speakers/${speaker.id}`}>
            <IonAvatar slot="start">
              <img src={import.meta.env.PUBLIC_URL + speaker.profilePic} alt="Speaker profile pic" />
            </IonAvatar>
            <IonLabel>
              <h2>{speaker.name}</h2>
              <p>{speaker.title}</p>
            </IonLabel>
          </IonItem>
        </IonCardHeader>

        <IonCardContent>
          <IonList lines="none">
            {sessions.map(session => (
              <IonItem detail={false} routerLink={`/tabs/speakers/sessions/${session.id}`} key={session.name}>
                <IonLabel>
                  <h3>{session.name}</h3>
                </IonLabel>
              </IonItem>
            ))}
            <IonItem detail={false} routerLink={`/tabs/speakers/${speaker.id}`}>
              <IonLabel>
                <h3>About {speaker.name}</h3>
              </IonLabel>
            </IonItem>
          </IonList>
        </IonCardContent>
      </IonCard>
    </>
  );
};

export default SpeakerItem;