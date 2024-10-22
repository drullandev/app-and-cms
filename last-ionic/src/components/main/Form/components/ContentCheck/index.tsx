import React, { FC, useState } from 'react'
import { IonLabel, IonButton, IonModal } from '../../../../../app/components/Ionic/basic';
import { ContentCheckProps} from '../../types'

const ContentCheck: FC<ContentCheckProps> = ({ label, slug }) => {
  const [showModal, setShowModal] = useState(false)
  return <>
    <IonModal className='content-modal' animated={true} key={slug + '-modal'} isOpen={showModal}>
      HERES IS YOR MODAL; AND NOW H¿WHAT? TODO!!
      <IonButton ariaLabel={slug+'-modal-button'} slot='start' onClick={() => setShowModal(false)}>X</IonButton>
    </IonModal>
    <IonButton ariaLabel={slug+'-button'} key={slug} color='light' onClick={(e: any) => { setShowModal(true) }}>
      <IonLabel ariaLabel={slug+'-label'} color='primary'>{label}</IonLabel>
    </IonButton>
  </>
}

export default React.memo(ContentCheck);