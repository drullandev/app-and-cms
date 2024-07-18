import React, { FC } from 'react'
import { IonIcon, IonText } from '@ionic/react'
import { ErrorProps } from './types'
import { warning } from 'ionicons/icons'

/**
 * Universal error element for the errors in the fields
 * - We are using the label to override name, because react-forms-hook was running with name when render errors
 * @param ErrorProps  
 * @returns 
 */
const Error: FC<ErrorProps> = ({ name, label, errors }) => {
  return <IonText color='danger' className='ion-padding-start' style={{ marginLeft: '5px', fontSize: '1rem' }}>
    {errors && errors[name] && (
      <small>
        <span role='alert' className='bold fade-in-5' style={{ height: '18px' }}>
          <IonIcon style={{height: '14px', margin: '-0.7% 1% -0.7% 0'}} icon={warning}/>
          <IonText>{errors[name].message.replace(name, label)}</IonText>
        </span>
      </small>
    )}
  </IonText>
}


export default React.memo(Error)