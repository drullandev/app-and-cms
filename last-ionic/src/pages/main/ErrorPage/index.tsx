import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonAlert, IonCard, IonCardContent } from '@ionic/react';
import { refreshOutline, alertCircleOutline } from 'ionicons/icons';
import React, { useState } from 'react';

const ErrorPage: React.FC = () => {
  const [showAlert, setShowAlert] = useState(false);

  const handleRetry = () => {
    // Implementa la lógica de reintento
    console.log('Retry logic triggered');
    setShowAlert(true); // Mostrar la alerta en caso de reintento
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="danger">
          <IonTitle>Error</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonCard color="light" className="ion-text-center">
          <IonCardContent>
            <IonIcon icon={alertCircleOutline} size="large" color="danger" />
            <h2>An error occurred while loading the page</h2>
            <p>There was a problem loading the requested content. Please try again.</p>
            <IonButton color="danger" onClick={handleRetry} expand="block" fill="solid">
              <IonIcon icon={refreshOutline} slot="start" />
              Retry
            </IonButton>
          </IonCardContent>
        </IonCard>

        {/* Alerta cuando se haga click en retry */}
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Retrying"
          message="Attempting to reload the page."
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default ErrorPage;
