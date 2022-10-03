import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';


import { login } from '../calls/login';

import Modal from '../components/Modal';
import { useEffect } from 'react';

export interface LoginProps {
  identifier: string
  password: string
}

const Tab1: React.FC = () => {

  let data = { identifier: 'bunny@gmail.com', password: 'Qwer1234' }

  useEffect(() =>{ 
    console.log(login(data))
  },[data])
  
  return (
    <IonPage>

      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Tab 1 page" />
      </IonContent>
      
      <Modal/>
    
    </IonPage>
  )

}

export default Tab1