import React from 'react'
import { IonToast } from '@ionic/react'
import { useTranslation } from 'react-i18next'
import { ToastProps } from './types'

const Toast: React.FC<ToastProps> = ({ show, message, color, duration, timestamp }) => {
  const { t } = useTranslation();
  return <IonToast
    id='accessErrorToast'
    key={'toast-'+timestamp}
    isOpen={show}
    message={t(message ?? ''   ) ?? 'Sorry'}
    duration={duration}
    color={color}
  />
}

export default React.memo(Toast)