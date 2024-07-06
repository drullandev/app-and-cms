import React, {  } from 'react'; // Importa forwardRef
import { LabelProps } from './types';
import { IonText } from '@ionic/react';

const Label: React.FC<LabelProps> = ({ name, label, errors }) => {
  if (errors && errors[name ?? 'input']) {
    return (
      <IonText color="danger" className="ion-custom-label">
        <small role="alert" id={`error-${name}`}>
          {errors[name ?? 'input'].message.replace(name ?? 'input', label)}
        </small>
      </IonText>
    );
  }
  return <></>
}


export default Label;
