import { useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import ExploreContainer from '../components/ExploreContainer';
import Modal from '../components/Modal';

import './Tab1.css';

import { restCall } from '../calls/axios';

export interface LoginProps {
  identifier: string
  password: string
}

const Tab1: React.FC = () => {

  console.log('test')

  useEffect(() =>{

    console.log(restCall({
      req: {
        url: 'auth/local',
        data: { 
          identifier: 'bunny@gmail.com',
          password: 'Qwer1234' 
        },
        method: 'post'
      },
      onSuccess: (ret: JSON)=>{
        console.log('Estoy aquí', ret)
      },
      onError: (err: Error)=> {
        console.log('estoy aquí', err)
      }
    
    }))
    
  },[])
  
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