import { IonItem, IonLabel, IonList, IonThumbnail, useIonModal } from '@ionic/react'
import { useState } from 'react'
import  QRCodeModal from './QRCodeModal'

//import openSound from 'assets/sound/open.wav'
import { QRCodeListProps } from './types'
import React from 'react'

const QRCodeList: React.FC<QRCodeListProps> = ({ codes, pageRef }) => {

  const [ selectedCode, setSelectedCode ] = useState(false)
  //const [ play ] = useSound(openSound)

  const [ present, dismiss ] = useIonModal(QRCodeModal, {
    dismiss: () => dismiss(),
    code: selectedCode
  })

  const handleSelect = (code:any) => {

    setSelectedCode(code)
    //play()

    present({
      presentingElement: pageRef.current,
      swipeToClose: true
    })

  }

  return (

    <IonList>
      { codes && codes.map((code: any, index: number) => {

        return (

          <IonItem key={ index } detail={ true } onClick={ () => handleSelect(code) } button>
            <IonThumbnail>
              <img src='/assets/thumbnail.png' alt='thumbnail' />
            </IonThumbnail>
            <IonLabel className='ion-padding-start'>
              <h1>{ code.data }</h1>
              <p>This was a { code.scanned ? 'scanned' : 'generated' } QR code</p>
            </IonLabel>
          </IonItem>
        )
      })}
    </IonList>
  )
}

export default React.memo(QRCodeList)