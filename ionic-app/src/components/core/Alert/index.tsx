import React from 'react'
import { IonAlert } from '@ionic/react'
import { AlertProps } from './types'
import { useTranslation } from 'react-i18next'

/**
 *  Only an static Alert container. To simulate state change with the 'same error' than prev, I use the timestamp value * 
 * @params
 * @returns 
 */
const Alert: React.FC<AlertProps> = ({ show = false, style, header= '', subHeader = '', message = '', timestamp, buttons = ['OK'] }) => {
  const {t} = useTranslation()
  return <IonAlert
    isOpen={show}
    cssClass={style}
    key={timestamp}
    header={header}
    subHeader={subHeader}
    message={message}
    buttons={buttons}
  />
}

export default React.memo(Alert)