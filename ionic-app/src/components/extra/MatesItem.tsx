import React from 'react'
import { Session } from '../../models/Schedule'
import { Speaker } from '../../models/Speaker'
import { IonCard, IonCardHeader, IonItem, IonLabel, IonAvatar, IonCardContent, IonList } from '@ionic/react'

interface MatesItemProps {
  speaker: Speaker
  sessions: Session[]
}

const MatesItem: React.FC<MatesItemProps> = ({ speaker, sessions }) => {
  
  return (

    <>

      <IonCard className='mate-card'>

        <IonCardHeader>

          <IonItem button detail={false} lines='none' className='mate-item' routerLink={`/tabs/speakers/${speaker.id}`}>

            <IonAvatar slot='start'>
              <img src={process.env.PUBLIC_URL + speaker.profilePic} alt='Speaker profile pic' />
            </IonAvatar>

            <IonLabel>
              <h2>{speaker.name}</h2>
              <p>{speaker.title}</p>
            </IonLabel>

          </IonItem>

        </IonCardHeader>

        <IonCardContent>

          <IonList lines='none'>

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

  )

}

export default MatesItem