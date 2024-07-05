import React from 'react'
import { IonContent } from '@ionic/react'

interface PlaceProps {
  id: string,
  close: Function
}

const FeedBack: React.FC<PlaceProps> = ({ id, close }) => {
  return <IonContent className='no-scroll' id='content'>
  </IonContent>
}

export default React.memo(FeedBack)
