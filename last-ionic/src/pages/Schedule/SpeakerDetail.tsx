import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'

import '../../styles/index.scss'

import { ActionSheetButton } from '@ionic/core'
import { IonActionSheet, IonChip, IonIcon, IonHeader, IonLabel, IonToolbar, IonButtons, IonContent, IonButton, IonBackButton, IonPage } from '@ionic/react'
import { callOutline, callSharp, logoTwitter, logoGithub, logoInstagram, shareOutline, shareSharp } from 'ionicons/icons'

import useSpeakerStore from '../../stores/sessions.store'
import { Speaker } from '../../models/Speaker'

interface OwnProps extends RouteComponentProps<{ id: string }> {}

const SpeakerDetail: React.FC<OwnProps> = ({ match }) => {
  const [showActionSheet, setShowActionSheet] = useState(false)
  const [actionSheetButtons, setActionSheetButtons] = useState<ActionSheetButton[]>([])
  const [actionSheetHeader, setActionSheetHeader] = useState('')

  // Obtener el speaker usando el ID de los parámetros de la ruta
  const speaker = useSpeakerStore(state => state.getSpeaker(match.params.id))

  function openSpeakerShare(speaker: Speaker) {
    setActionSheetButtons([
      {
        text: 'Copy Link',
        handler: () => {
          console.log('Copy Link clicked')
        }
      },
      {
        text: 'Share via ...',
        handler: () => {
          console.log('Share via clicked')
        }
      },
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked')
        }
      }
    ])
    setActionSheetHeader(`Share ${speaker.name}`)
    setShowActionSheet(true)
  }

  function openContact(speaker: Speaker) {
    setActionSheetButtons([
      {
        text: `Email ( ${speaker.email} )`,
        handler: () => {
          window.open('mailto:' + speaker.email)
        }
      },
      {
        text: `Call ( ${speaker.phone} )`,
        handler: () => {
          window.open('tel:' + speaker.phone)
        }
      }
    ])
    setActionSheetHeader(`Contact ${speaker.name}`)
    setShowActionSheet(true)
  }

  function openExternalUrl(url: string) {
    window.open(url, '_blank')
  }

  if (!speaker) {
    return <div>Speaker not found</div>
  }

  return (
    <IonPage id="speaker-detail">
      <IonContent>
        <IonHeader className="ion-no-border">
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/tabs/speakers" />
            </IonButtons>
            <IonButtons slot="end">
              <IonButton onClick={() => openContact(speaker)}>
                <IonIcon slot="icon-only" ios={callOutline} md={callSharp}></IonIcon>
              </IonButton>
              <IonButton onClick={() => openSpeakerShare(speaker)}>
                <IonIcon slot="icon-only" ios={shareOutline} md={shareSharp}></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <div className="speaker-background">
          <img src={speaker.profilePic} alt={speaker.name}/>
          <h2>{speaker.name}</h2>
        </div>

        <div className="ion-padding speaker-detail">
          <p>{speaker.about} Say hello on social media!</p>

          <hr/>

          <IonChip color="twitter" onClick={() => openExternalUrl(`https://twitter.com/${speaker.twitter}`)}>
            <IonIcon icon={logoTwitter}></IonIcon>
            <IonLabel>Twitter</IonLabel>
          </IonChip>

          <IonChip color="dark" onClick={() => openExternalUrl('https://github.com/ionic-team/ionic')}>
            <IonIcon icon={logoGithub}></IonIcon>
            <IonLabel>GitHub</IonLabel>
          </IonChip>

          <IonChip color="instagram" onClick={() => openExternalUrl('https://instagram.com/ionicframework')}>
            <IonIcon icon={logoInstagram}></IonIcon>
            <IonLabel>Instagram</IonLabel>
          </IonChip>
        </div>
      </IonContent>
      <IonActionSheet
        isOpen={showActionSheet}
        header={actionSheetHeader}
        onDidDismiss={() => setShowActionSheet(false)}
        buttons={actionSheetButtons}
      />
    </IonPage>
  )
}

export default SpeakerDetail
