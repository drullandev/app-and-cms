import React, { useState } from 'react';
import { IonHeader, IonToolbar, IonContent, IonButtons, IonMenuButton, IonButton, IonIcon, IonDatetime, IonSelectOption, IonList, IonItem, IonLabel, IonSelect, IonPopover } from '@ionic/react';
import { ellipsisHorizontal, ellipsisVertical } from 'ionicons/icons';
import Popover from '../../../components/extra/Popover';

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  
  const [showPopover, setShowPopover] = useState(false);
  const [popoverEvent, setPopoverEvent] = useState();
  const [location, setLocation] = useState<'download' | 'hellfest' | 'wacken' | 'graspop'>('download');
  const [festivalDate, setFestivalDate] = useState('2024-06-10T00:00:00-05:00');

  const selectOptions = {
    header: 'Select a Metal Festival'
  };

  const presentPopover = (e: React.MouseEvent) => {
    setShowPopover(true);
  };

  function displayDate(date: string, format: string) {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const d = new Date(date);
    const year = d.getFullYear();

    if (format === 'y') {
      return year;
    } else {
      const month = monthNames[d.getMonth()];
      const day = d.getDate();
      return `${month} ${day}, ${year}`;
    }
  }

  return (
    <>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>

          <IonButtons slot="end">
            <IonButton onClick={presentPopover}>
              <IonIcon slot="icon-only" ios={ellipsisHorizontal} md={ellipsisVertical} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="home-header">
          <div className="festival-image download" style={{ 'opacity': location === 'download' ? '1' : undefined }}></div>
          <div className="festival-image hellfest" style={{ 'opacity': location === 'hellfest' ? '1' : undefined }}></div>
          <div className="festival-image wacken" style={{ 'opacity': location === 'wacken' ? '1' : undefined }}></div>
          <div className="festival-image graspop" style={{ 'opacity': location === 'graspop' ? '1' : undefined }}></div>
        </div>

        <div className="home-info">
          <h3 className="ion-padding-top ion-padding-start">Metal Festival Info</h3>
          <p className="ion-padding-start ion-padding-end">
            Get ready to unleash the power of metal at {displayDate(festivalDate, 'mediumDate')}! Featuring the heaviest line-up from the most legendary bands in the world, this festival is the ultimate gathering of metalheads from across the globe. Raise your horns, bang your head, and immerse yourself in the brutal energy of {location.charAt(0).toUpperCase() + location.slice(1)} Festival!
          </p>

          <h3 className="ion-padding-top ion-padding-start">Festival Details</h3>
          <IonList lines="none">
            <IonItem>
              <IonLabel>Location</IonLabel>
              <IonSelect value={location} interfaceOptions={selectOptions} onIonChange={(e: any) => setLocation(e.detail.value)}>
                <IonSelectOption value="download">Download Festival</IonSelectOption>
                <IonSelectOption value="hellfest">Hellfest</IonSelectOption>
                <IonSelectOption value="wacken">Wacken Open Air</IonSelectOption>
                <IonSelectOption value="graspop">Graspop Metal Meeting</IonSelectOption>
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonLabel>Date</IonLabel>
              <IonDatetime max="2056" value={festivalDate} onIonChange={(e: any) => setFestivalDate(e.detail.value)} />
            </IonItem>
          </IonList>

          <h3 className="ion-padding-top ion-padding-start">Festival Wi-Fi</h3>
          <IonList lines="none">
            <IonItem>
              <IonLabel>Wi-Fi Network</IonLabel>
              <IonLabel className="ion-text-end">metal{displayDate(festivalDate, 'y')}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Password</IonLabel>
              <IonLabel className="ion-text-end">metalhead123</IonLabel>
            </IonItem>
          </IonList>
        </div>
      </IonContent>

      <IonPopover isOpen={showPopover} event={popoverEvent} onDidDismiss={() => setShowPopover(false)}>
        <Popover dismiss={() => setShowPopover(false)} />
      </IonPopover>
    </>
  );
};

export default Home;
