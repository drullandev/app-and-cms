import React, { useState } from 'react';
import { IonIcon, IonSpinner } from '@ionic/react';
import * as icon from 'ionicons/icons';
import * as yup from 'yup';

const FieldStatusIcon = ({ controller, fieldName, errors, loadingField, validationSchema, field }) => {
    
  const [showSecret, setShowSecret] = useState(false);

  let displayColor = 'medium';

  if (loadingField[fieldName]) {
    displayColor = 'medium';
  } else if (errors && errors[fieldName]) {
    displayColor = 'danger';
  } else if (!controller.value) {
    displayColor = 'medium';
  }

  const setIcon = (color?:string) => {
    return field.secret ? (
      <IonIcon color={color ?? displayColor}
        onClick={() => setShowSecret(!showSecret)}
        icon={showSecret ? icon.eyeOff : icon.eye}
      />
    ) : fieldName.includes('email') ? (
      <IonIcon icon={icon.at} color={color ?? displayColor} />
    ) : (
      <IonIcon icon={icon.checkmarkCircle} color={color ?? displayColor} />
    );
  };

  const cases = [
    {
      condition: loadingField[fieldName],
      icon: <IonSpinner name="lines" color="medium" />
    },
    {
      condition: errors && errors[fieldName],
      icon: setIcon()
    },
    {
      condition: !controller.value,
      icon: setIcon()
    },
    {
      condition: true,
      icon: (() => {
        try {
          validationSchema.validateSyncAt(fieldName, { [fieldName]: controller.value });
          return setIcon('success');
        } catch (error) {
          return setIcon('danger');
        }
      })()
    }
  ];

  const matchingCase = cases.find(c => c.condition);
  return matchingCase ? matchingCase.icon : null;
};

export default FieldStatusIcon;
