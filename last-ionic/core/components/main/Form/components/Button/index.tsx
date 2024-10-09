import { useState, useEffect, forwardRef } from 'react';
import { IonLabel, IonButton, IonSpinner } from '../../../../../app/components/Ionic/basic';
import { IField } from '../../types';
import * as icon from 'ionicons/icons';
import Icon from '../../../../../app/components/Ionic/v8/Icon';
import React from 'react';

/**
 * Button component that handles loadinging a label, an optional icon, and a spinner during loading state.
 * @param {IField} field - The properties for the button.
 * @returns {JSX.Element} The rendered button component.
 */
const Button = forwardRef<HTMLIonButtonElement, IField>((field, ref) => {

  // State to manage the loading/loading status
  const [loading, setloading] = useState<boolean>(false);

  /**
   * Generates the content to be loadinged inside the button.
   * @param {IField} field - The properties for the button.
   * @returns {JSX.Element} The content for the button, including the spinner or icon and label.
   */
  const buttonContent = (field: IField) => (
    <>
      {loading 
        ? <IonSpinner ariaHidden={true} name="lines-small" />
        : (field.icon ? <Icon ariaHidden={true} slot="start" icon={field.icon || icon.star} /> : null)
      }
      <IonLabel ariaLabel={field.name+'-label'}>{field.label}</IonLabel>
    </>
  );

  useEffect(() => {
    setTimeout(() => {
      setloading(false);
    }, 500);
  }, [loading]);

  useEffect(() => {
    setloading(field.loading ?? false);
  }, [field.loading]);

  // Render the IonButton with the provided properties and handle the onClick event
  return (
    <IonButton
      ariaLabel={field.name+'-button'}
      ref={ref}
      style={field.style || { width: '100%', borderRadius: '20px' }}
      expand="block"
      color={field.color || 'primary'}
      fill={field.fill ?? 'solid'}
      size={field.size ?? 'default'}
      type={field.fieldType}
      routerDirection={field.onClick ? undefined : "root"}
      onClick={(e: any) => { setloading(true); field.onClick && field.onClick(e); }}
      disabled={loading}
    >
      {buttonContent(field)}
    </IonButton>
  );
});

export default React.memo(Button);
