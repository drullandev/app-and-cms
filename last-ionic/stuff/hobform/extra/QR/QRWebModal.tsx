import { IonCol, IonContent, IonGrid, IonProgressBar, IonHeader, IonPage, IonIcon, IonRow, IonSpinner, IonImg, IonLabel } from '@ionic/react';
import { QrReader } from 'react-qr-reader'
import { closeOutline, qrCodeOutline } from 'ionicons/icons'
import { QRWebModalProps } from './types'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

const QRWebModal: React.FC<QRWebModalProps> = ({ dismiss, set, scan, error, close }) => {

  const { t } = useTranslation()
  const [data, setData] = useState(null)

  return <IonPage>

    <IonHeader>
      <IonGrid id='place-grid'>
        <IonRow style={{height: '80px'}}>
          <IonCol size='2' className='ion-text-center ion-justify-content-center'>
            <IonIcon style={{ width: '100%', height: '100%' }} color='blandy-blue' size='medium' icon={qrCodeOutline} />
          </IonCol>
          <IonCol size='8' className='ion-text-center ion-justify-content-center' style={{  height: '100%', display: 'block', verticalAlign: 'middle', padding: '8% 0 8% 0'}}>
            <IonLabel style={{ fontWeight: 'bold', fontSize: '1.4rem' }}>{t('Scan the QR Code')}</IonLabel>
          </IonCol>
          {dismiss && <IonCol size='2' onClick={dismiss} className='cursor-pointer'>
              <IonIcon style={{ width: '100%', height: '100%' }} size='medium' icon={closeOutline} />
            </IonCol>
          }
        </IonRow>
      </IonGrid>
      <IonProgressBar type='indeterminate' color='blandy-blue' reversed={true}></IonProgressBar>
    </IonHeader>

    <IonContent className='no-scroll'>
      <IonGrid className='ion-padding-top ion-margin-top'>
        <IonRow className='ion-justify-content-center ion-text-center animate__animated animate__lightSpeedInLeft animate__faster'>
          <IonCol size='9' className='videoWrapper'>
            <QrReader
              scanDelay={ 5001 }
              onResult={(result: any, error: any,) => {
                if (result !== undefined) {
                  set(result?.text)
                  setData(result?.text)
                }else{
                  set(null)
                  setData(null)
                }
                if (!!error) console.info(error);
              }}
              constraints={{ facingMode: 'environment' }}
            />
            {!data 
              ? <>
                  <h5>{t('Please point to the code')}</h5>
                  <IonImg className='blink-fast' style={{margin: '0 28% 0 28%'}}  src='/assets/images/get-qr.png' alt='icon' />
                </>
              : <IonSpinner color='success' name='dots' />
            }
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>

  </IonPage>

}

export default React.memo(QRWebModal)