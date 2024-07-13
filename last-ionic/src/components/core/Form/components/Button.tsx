import React, { useState, useEffect } from 'react';
import { IonLabel, IonButton, IonSpinner, IonIcon } from '@ionic/react';
import { FieldProps } from '../types';
import * as icon from 'ionicons/icons';
import Logger from '../../../../classes/Logger';

/**
 * Button component that handles loadinging a label, an optional icon, and a spinner during loading state.
 * @param {FieldProps} field - The properties for the button.
 * @returns {JSX.Element} The rendered button component.
 */
const Button: React.FC<FieldProps> = (field) => {
  
  // State to manage the loading/loading status
  const [loading, setloading] = useState<boolean>(false);

  /**
   * Generates the content to be loadinged inside the button.
   * @param {FieldProps} field - The properties for the button.
   * @returns {JSX.Element} The content for the button, including the spinner or icon and label.
   */
  const buttonContent = (field: FieldProps) => (
    <>
      {loading 
        ? <IonSpinner name="lines-small" />
        : (field.icon ? <IonIcon slot="start" icon={field.icon || icon.star} /> : null)
      }
      <IonLabel>{field.label}</IonLabel>
    </>
  );

  useEffect(()=>{
    setTimeout(()=>{
      setloading(false)
    },500)
  },[loading])

  useEffect(()=>{
    setloading(!field.loading)
  },[field.loading])

  // Render the IonButton with the provided properties and handle the onClick event
  return (
    <IonButton
      style={field.style || { width: '100%', borderRadius: '20px' }}
      expand="block"
      color={field.color || 'primary'}
      fill={field.fill ?? 'solid'}
      size={field.size ?? 'default'}
      type={field.fieldType}
      routerDirection={field.onClick ? undefined : "root"}
      onClick={(e: any) => { setloading(true); field.onClick }}
      disabled={loading}
    >
      {buttonContent(field)}
    </IonButton>
  );
};

export default Button;
