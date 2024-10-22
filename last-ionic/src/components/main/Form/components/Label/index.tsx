import React, {  } from 'react'; // Importa forwardRef
import { LabelProps } from '../../types';
import { IonText } from '@ionic/react';

const Label: React.FC<LabelProps> = ({ name, label, errors }) => {
  if (errors && errors[name ?? 'input']) {
    return (<></>);
  }
  return <></>
}

export default React.memo(Label);
