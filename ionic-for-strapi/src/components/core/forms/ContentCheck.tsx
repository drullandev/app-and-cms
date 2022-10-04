import React, { FC, useState } from 'react'
import { IonLabel, IonButton, IonModal } from '@ionic/react'
import FormPage from './FormPage'

export interface ContentCheckProps {
  label: string
  slug: string
}

const ContentCheck: FC<ContentCheckProps> = ({ label, slug }) => {
  const [showModal, setShowModal] = useState(false)
  return <>
    <IonModal cssClass='content-modal' key={slug + '-modal'} isOpen={showModal}>
      <FormPage slug={slug} />
      <IonButton slot='start' onClick={() => setShowModal(false)}>X</IonButton>
    </IonModal>
    <IonButton key={slug} color='light' onClick={(e) => { setShowModal(true) }}>
      <IonLabel color='primary'>{label}</IonLabel>
    </IonButton>
  </>
}

export default ContentCheck