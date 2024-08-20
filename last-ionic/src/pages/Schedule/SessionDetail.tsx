import React from 'react'
import { IonHeader, IonToolbar, IonContent, IonPage, IonButtons, IonBackButton, IonButton, IonIcon, IonText, IonList, IonItem, IonLabel } from '@ionic/react'

import { withRouter, RouteComponentProps } from 'react-router'
import { starOutline, star, share, cloudDownload } from 'ionicons/icons'
import '../../styles/index.scss'
import useConfStore from '../../stores/sessions.store'
import useUserStore from '../../stores/user.store'

const SessionDetail: React.FC = () => {

  const { session, favoriteSessions } = useUserStore()
  const { addFavorite, removeFavorite } = useConfStore()
  if (!session) {
    return <div>Session not found</div>
  }

  const isFavorite = favoriteSessions.indexOf(session.id) > -1
  
  const toggleFavorite = () => { 
    isFavorite ? removeFavorite(session.id) : addFavorite(session.id)
  }
  const shareSession = () => { }
  const sessionClick = (text: string) => { 
    console.log(`Clicked ${text}`)
  }

  return (
    <IonPage id="session-detail-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/schedule"></IonBackButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton onClick={() => toggleFavorite()}>
              {isFavorite ?
                <IonIcon slot="icon-only" icon={star}></IonIcon> :
                <IonIcon slot="icon-only" icon={starOutline}></IonIcon>
              }
            </IonButton>
            <IonButton onClick={() => shareSession}>
              <IonIcon slot="icon-only" icon={share}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="ion-padding">
          <h1>{session.name}</h1>
          {session.tracks.map((track:any) => (
            <span key={track} className={`session-track-${track.toLowerCase()}`}>{track}</span>
          ))}
          <p>{session.description}</p>
          <IonText color="medium">
            {session.timeStart} &ndash {session.timeEnd}
            <br />
            {session.location}
          </IonText>
        </div>
        <IonList>
          <IonItem onClick={() => sessionClick('watch')} button>
            <IonLabel color="primary">Watch</IonLabel>
          </IonItem>
          <IonItem onClick={() => sessionClick('add to calendar')} button>
            <IonLabel color="primary">Add to Calendar</IonLabel>
          </IonItem>
          <IonItem onClick={() => sessionClick('mark as unwatched')} button>
            <IonLabel color="primary">Mark as Unwatched</IonLabel>
          </IonItem>
          <IonItem onClick={() => sessionClick('download video')} button>
            <IonLabel color="primary">Download Video</IonLabel>
            <IonIcon slot="end" color="primary" size="small" icon={cloudDownload}></IonIcon>
          </IonItem>
          <IonItem onClick={() => sessionClick('leave feedback')} button>
            <IonLabel color="primary">Leave Feedback</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  )
}

export default withRouter(SessionDetail);