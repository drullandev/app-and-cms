import React from 'react'
import { IonNote } from '@ionic/react'
import { ErrorProps } from './types';

/**
 * Universal error case for the
 * - We are using the label to override name, because react-forms-hook was running with name when render errors
 * @param ErrorProps  
 * @returns 
 */
 const Error: React.FC<ErrorProps> = ({ name, label, errors }) => {
  if (errors && errors[name ?? 'input']) {
    return (
      <IonNote color="danger" className="ion-custom-error ion-padding-start">
        <small role="alert" id={`error-${name}`}>
          {errors[name ?? 'input'].message.replace(name ?? 'input', label)}
        </small>
      </IonNote>
    );
  }
  return <></>
}

export default Error