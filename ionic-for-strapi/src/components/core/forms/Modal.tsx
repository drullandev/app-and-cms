
import React, { useEffect, useState } from 'react'
import { restGet } from '../../../data/utils/rest/rest.utils' 
import { IonModal, IonButton, } from '@ionic/react'

export interface ModalProps {
  open: boolean
  showButton?:boolean
  model: string
  slug: string
}

export const Modal: React.FC<ModalProps> = ({open, showButton, model, slug}) => {

  const [showModal, setShowModal] = useState(open)
  /*useEffect(()=>{
    restGet(model, {slug: slug})
    .then(res=>{
      console.log(res)
    })
  },[])*/

  return <>
    <IonModal key={slug+'-modal'}  isOpen={open} cssClass='my-custom-class'>
      <p>This is modal content</p>
      <IonButton onClick={() => setShowModal(false)}>Close Modal</IonButton>
    </IonModal>
  </>  

}

export default Modal