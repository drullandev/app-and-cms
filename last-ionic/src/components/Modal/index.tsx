import React from 'react'
import { IonModal } from '@ionic/react'
import { ModalProps } from './types'

const Modal: React.FC<ModalProps> = ({ show, component, presenting }) =>
  <IonModal isOpen={show} presentingElement={ presenting || undefined}>{component && component()}</IonModal>

export default React.memo(Modal)