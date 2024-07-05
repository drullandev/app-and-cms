import React, { useState } from 'react';
import { IonLabel, IonButton, IonSpinner, IonItem, IonSkeletonText, IonIcon } from '@ionic/react';
import { FieldProps } from './types';
import * as icon from 'ionicons/icons';
import { timeout } from '../../../env'; // Importamos solo 'timeout' de AppConst
import Skeleton from './Skeleton';

const Button: React.FC<FieldProps> = (field) => {
  
  const [display, setDisplay] = useState<boolean>(false);

  const setActive = (timeOut: number = timeout.doneMargin, func?: Function) => {
    if (func) func();
    setDisplay(true);
    setTimeout(() => {
      setDisplay(false);
    }, timeOut);
  };

  const buttonContent = (field: FieldProps) => (
    <>
      {display 
        ? <IonSpinner name="lines-small"/>
        : ( field.icon ? <IonIcon slot="start" icon={field.icon || icon.star} /> : null )
      }
      <IonLabel>{field.label}</IonLabel>
    </>
  );

  if (!field) {
    return <Skeleton style={field.style || { width: '100%' }} />;
  }

  return (
    <IonButton
      style={field.style || { width: '100%' }}
      expand="block"
      color={field.color || 'primary'}
      fill={field.fill ?? 'solid'}
      size={field.size ?? 'default'}
      type={field.fieldType}
      routerDirection={field.onClick ? undefined : "root"}
      onClick={(e: any) => setActive(1000, field.onClick)}
      disabled={display}
    >
      {buttonContent(field)}
    </IonButton>
  );
};

export default Button;
