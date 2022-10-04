import React, { FC } from 'react'
import { IonText } from '@ionic/react'
import { ErrorProps } from './interfaces/ErrorProps'

/**
 * Universal error case for the
 * - We are using the label to override name, because react-forms-hook was running with name when render errors
 * @param ErrorProps  
 * @returns 
 */
const Error: FC<ErrorProps> = ({ name, label, errors }) => (
  <>
    {errors && errors[name] && (
      <IonText color='danger' className='ion-padding-start'>
        <small>
          <span role='alert' id={`error-${name}`}>
            {errors[name].message.replace(name, label)}
          </span>
        </small>
      </IonText>
    )}
  </>
)

export default Error