import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import useSpeakerStore from '../../stores/user.store';
import './styles/MateDetail.scss';
import { ActionSheetButton } from '@ionic/core';
import {
  IonActionSheet,
  IonChip,
  IonIcon,
  IonHeader,
  IonLabel,
  IonToolbar,
  IonButtons,
  IonContent,
  IonButton,
  IonBackButton,
  IonPage
} from '@ionic/react';
import {
  callOutline,
  callSharp,
  logoTwitter,
  logoGithub,
  logoInstagram,
  shareOutline,
  shareSharp
} from 'ionicons/icons';
import { Speaker } from '../../stores/models/Speaker';

// Define component props including route properties
interface MateDetailProps { }

const MateDetail: React.FC<MateDetailProps> = () => {
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [actionSheetButtons, setActionSheetButtons] = useState<ActionSheetButton[]>([]);
  const [actionSheetHeader, setActionSheetHeader] = useState('');
  const { speakers, getSpeaker } = useSpeakerStore(state => ({
    speakers: state.speakers,
    getSpeaker: state.getSpeaker
  }));

  const { id } = useParams<{ id: string }>();

  // Fetch speaker details based on ID (replace with actual data fetching logic)
  useEffect(() => {
    if (id) {
      // Replace with actual fetch or API call
      const fetchedSpeaker: Speaker = {
        id: parseInt(id), // Convert ID to number
        title: '',
        location: '',
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '123456789',
        profilePic: 'https://via.placeholder.com/150',
        about: 'Speaker about text',
        twitter: 'johndoe',
        github: 'johndoe',
        instagram: 'johndoe'
      };
      // Use the appropriate method to set the speaker
      // Example: you might need to update state with a setter method, if available
      // setSpeaker(fetchedSpeaker); // or other appropriate method if necessary
    }
  }, [id]);

  const speaker = getSpeaker(parseInt(id)); // Retrieve speaker by ID

  function openSpeakerShare(speaker: Speaker) {
    setActionSheetButtons([
      {
        text: 'Copy Link',
        handler: () => {
          console.log('Copy Link clicked');
        }
      },
      {
        text: 'Share via ...',
        handler: () => {
          console.log('Share via clicked');
        }
      },
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    ]);
    setActionSheetHeader(`Share ${speaker.name}`);
    setShowActionSheet(true);
  }

  function openContact(speaker: Speaker) {
    setActionSheetButtons([
      {
        text: `Email ( ${speaker.email} )`,
        handler: () => {
          window.open('mailto:' + speaker.email);
        }
      },
      {
        text: `Call ( ${speaker.phone} )`,
        handler: () => {
          window.open('tel:' + speaker.phone);
        }
      }
    ]);
    setActionSheetHeader(`Contact ${speaker.name}`);
    setShowActionSheet(true);
  }

  function openExternalUrl(url: string) {
    window.open(url, '_blank');
  }

  if (!speaker) {
    return <div>Speaker not found</div>;
  }

  return (
    <IonPage id='mate-detail'>
      <IonContent>
        <IonHeader className='ion-no-border'>
          <IonToolbar>
            <IonButtons slot='start'>
              <IonBackButton defaultHref='/tabs/speakers' />
            </IonButtons>
            <IonButtons slot='end'>
              <IonButton onClick={() => openContact(speaker)}>
                <IonIcon slot='icon-only' ios={callOutline} md={callSharp}></IonIcon>
              </IonButton>
              <IonButton onClick={() => openSpeakerShare(speaker)}>
                <IonIcon slot='icon-only' ios={shareOutline} md={shareSharp}></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <div className='mate-background'>
          <img src={speaker.profilePic} alt={speaker.name} />
          <h2>{speaker.name}</h2>
        </div>

        <div className='ion-padding mate-detail'>
          <p>{speaker.about} Say hello on social media!</p>
          <hr />
          <IonChip color='twitter' onClick={() => openExternalUrl(`https://twitter.com/${speaker.twitter}`)}>
            <IonIcon icon={logoTwitter}></IonIcon>
            <IonLabel>Twitter</IonLabel>
          </IonChip>
          <IonChip color='dark' onClick={() => openExternalUrl(`https://github.com/${speaker.github}`)}>
            <IonIcon icon={logoGithub}></IonIcon>
            <IonLabel>GitHub</IonLabel>
          </IonChip>
          <IonChip color='instagram' onClick={() => openExternalUrl(`https://instagram.com/${speaker.instagram}`)}>
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
  );
}

export default MateDetail;
