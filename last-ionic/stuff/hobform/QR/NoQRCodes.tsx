import { IonCol, IonRow, IonIcon } from '@ionic/react';
import { qrCodeOutline } from 'ionicons/icons'
import { t } from 'i18next'
import React from 'react'
import {} from './types'

const NoQRCodes: React.FC = () => {
	return <IonRow style={{color: 'grey'}} className='ion-text-center ion-justify-content-center'>
    <IonCol size='12'>
      <h5><b>{t('Do you have a QR code?')}</b></h5>
      <h6>{t('Click on')} <IonIcon icon={ qrCodeOutline } /> {t('and scan!')}</h6>
    </IonCol>
  </IonRow>
  }

export default React.memo(NoQRCodes)