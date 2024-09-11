import React, { useState } from 'react';
import { IonSpinner } from '@ionic/react';
import * as icon from 'ionicons/icons';
import * as yup from 'yup';

import Icon from '../../Ionic/v8/Icon';
import Spinner from '../../Ionic/v8/Spinner';

interface FieldStatusIconProps {
  controller: {
    value: any;
  };
  fieldName: string;
  errors: { [key: string]: string };
  loadingField: { [key: string]: boolean };
  validationSchema: yup.ObjectSchema<any>;
  field: {
    secret?: boolean;
  };
}

/**
 * FieldStatusIcon component displays an icon indicating the validation status of a form field.
 * @param {object} controller - The controller object containing the field's value.
 * @param {string} fieldName - The name of the field to be validated.
 * @param {object} errors - An object containing validation errors.
 * @param {object} loadingField - An object indicating if a field is currently loading.
 * @param {object} validationSchema - The Yup validation schema used for the field.
 * @param {object} field - An object containing additional field properties (e.g., secret).
 * @returns {JSX.Element | null} - An icon indicating the field's validation status or null.
 */
const FieldStatusIcon: React.FC<FieldStatusIconProps> = ({ 
  controller, 
  fieldName, 
  errors, 
  loadingField, 
  validationSchema, 
  field 
}) => {
  
  const [showSecret, setShowSecret] = useState(false);

  let displayColor: 'medium' | 'danger' | 'success' = 'medium';

  if (loadingField[fieldName]) {
    displayColor = 'medium';
  } else if (errors && errors[fieldName]) {
    displayColor = 'danger';
  } else if (!controller.value) {
    displayColor = 'medium';
  }

  /**
   * Sets the appropriate icon based on the field type and validation status.
   * @param {string} [color] - Optional color for the icon.
   * @returns {JSX.Element} - The icon element.
   */
  const setIcon = (color?: 'medium' | 'danger' | 'success') => {
    return field.secret ? (
      <Icon 
        ariaLabel={'Status icon: '+color}
        color={color ?? displayColor}
        onClick={() => setShowSecret(!showSecret)}
        icon={showSecret ? icon.eyeOff : icon.eye}
      />
    ) : fieldName.includes('email') ? (
      <Icon ariaLabel={'Status icon: '+color} icon={icon.at} color={color ?? displayColor} />
    ) : (
      <Icon ariaLabel={'Status icon: '+color} icon={icon.checkmarkCircle} color={color ?? displayColor} />
    );
  };

  const cases = [
    {
      condition: loadingField[fieldName],
      icon: <Spinner name="lines" color="medium" />
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
