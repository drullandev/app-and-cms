import React from 'react'
import { AlertOptions, IonAlert } from '@ionic/react'
import { AlertProps } from './types'
import { useTranslation } from 'react-i18next'
import { ReactControllerProps } from '@ionic/react/dist/types/components/createControllerComponent'

/**
 *  Only an static Alert container. To simulate state change with the 'same error' than prev, I use the timestamp value * 
 * @params
 * @returns 
 */
const Alert: React.FC<ReactControllerProps> = (settingAlert) => {
  const {t} = useTranslation()
  return <IonAlert {...settingAlert}/>
}

export default React.memo(Alert)