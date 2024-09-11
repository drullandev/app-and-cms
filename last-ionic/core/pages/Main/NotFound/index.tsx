import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { IonHeader, IonToolbar, IonContent, IonButtons, IonMenuButton, IonButton, IonIcon } from '@ionic/react';
import { ellipsisHorizontal, ellipsisVertical } from 'ionicons/icons';

const NotFound: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    const timer = setTimeout(() => {
      history.push('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [history]);

  return (
    <>
      <IonHeader className='ion-no-border'>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonButtons slot='end'>
            <IonButton>
              <IonIcon slot='icon-only' ios={ellipsisHorizontal} md={ellipsisVertical}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className='ion-padding'>
        <div className='notfound-header'>
          <h1>404 - Page Not Found</h1>
          <p>You will be redirected to the home page in 5 seconds.</p>
        </div>
      </IonContent>
    </>
  );
};

export default NotFound;
