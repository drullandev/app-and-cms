import React, { FC, useState } from 'react'
import { IonLabel, IonButton, IonModal } from '@ionic/react'
import { ContentCheckProps} from '../types'

const ContentCheck: FC<ContentCheckProps> = ({ label, slug }) => {
  const [showModal, setShowModal] = useState(false)
  return <>
    <IonModal className='content-modal' animated={true} key={slug + '-modal'} isOpen={showModal}>
      HERES IS YOR MODAL; AND NOW H¿WHAT? TODO!!
      <IonButton slot='start' onClick={() => setShowModal(false)}>X</IonButton>
    </IonModal>
    <IonButton key={slug} color='light' onClick={(e) => { setShowModal(true) }}>
      <IonLabel color='primary'>{label}</IonLabel>
    </IonButton>
  </>
}

export default ContentCheck