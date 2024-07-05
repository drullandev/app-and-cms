import React from 'react'
import { IonItem, IonNote } from '@ionic/react'
import { ErrorProps } from './types';

/**
 * Universal error case for the
 * - We are using the label to override name, because react-forms-hook was running with name when render errors
 * @param ErrorProps  
 * @returns 
 */
 const Error: React.FC<ErrorProps> = ({ name, label, errors }) => {
  if (errors && errors[name ?? 'input']) {
    return (<IonItem>
      <IonNote color="danger">
        <small role="alert" id={`error-${name}`}>
          {errors[name ?? 'input'].message.replace(name ?? 'input', label)}
        </small>
      </IonNote>
    </IonItem>
    );
  }
  return <></>
}

export default Error